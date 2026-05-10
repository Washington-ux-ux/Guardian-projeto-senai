function fixPhotoUrl(photoUrl) {
    if (!photoUrl) return '';
    let url = photoUrl;
    if (url.startsWith('/docs/')) url = url.substring('/docs'.length);
    if (url.startsWith('/')) url = '.' + url;
    if (url.includes('nezuko.jpg')) url = url.replace('nezuko.jpg', 'nezuko.webp');
    if (url.includes('naruto.jpg')) url = url.replace('naruto.jpg', 'naruto.webp');
    return url;
}

function createCard(person) {
    var card = document.createElement('div');
    card.className = 'missing-card';
    var photoUrl = fixPhotoUrl(person.photoUrl);
    var photoHtml = photoUrl 
        ? '<img src="' + photoUrl + '" alt="' + person.name + '">'
        : '<i class="fa-solid fa-user"></i>';
    
    card.innerHTML = 
        '<div class="card-header">' +
            '<div class="status-badge missing">DESAPARECIDO</div>' +
            '<div class="case-id">CASO #' + String(person.id).padStart(3, '0') + '</div>' +
        '</div>' +
        '<div class="card-content">' +
            '<div class="person-info">' +
                '<div class="avatar-placeholder">' + photoHtml + '</div>' +
                '<div class="details">' +
                    '<h3>' + person.name + '</h3>' +
                    '<p><i class="fa-solid fa-calendar"></i> ' + person.age + ' anos</p>' +
                    '<p><i class="fa-solid fa-map-marker-alt"></i> ' + person.location.city + '</p>' +
                    '<p><i class="fa-solid fa-clock"></i> Desaparecido em: ' + new Date(person.date).toLocaleDateString('pt-BR') + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="actions">' +
                '<button class="action-btn edit" data-id="' + person.id + '">' +
                    '<i class="fa-solid fa-edit"></i> Editar' +
                '</button>' +
                '<button class="action-btn found" data-id="' + person.id + '">' +
                    '<i class="fa-solid fa-check"></i> Encontrado' +
                '</button>' +
            '</div>' +
        '</div>';
    
    card.querySelector('.action-btn.edit').addEventListener('click', function() {
        editMissing(person.id);
    });
    card.querySelector('.action-btn.found').addEventListener('click', function() {
        markAsFound(person.id);
    });
    
    return card;
}

function renderMissingCards(data) {
    var list = document.getElementById('missingList');
    if (!list) return;
    var renderData = data || missingData;
    list.innerHTML = '';
    renderData.forEach(function(person) {
        list.appendChild(createCard(person));
    });
}

function markAsFound(id) {
    if (!confirm('Tem certeza que deseja marcar esta pessoa como encontrada?')) return;
    var index = missingData.findIndex(function(p) { return p.id === id; });
    if (index === -1) return;
    var person = missingData[index];
    
    transferToLocated(person);
    
    missingData.splice(index, 1);
    renderMissingCards();
    saveToServer();
    
    alert('Pessoa marcada como encontrada com sucesso!');
}

function transferToLocated(person) {
    fetch('./src/data/located.json')
        .then(function(res) { return res.json(); })
        .then(function(locatedData) {
            var locatedPerson = Object.assign({}, person, {
                status: 'found',
                foundAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
            locatedData.push(locatedPerson);
            
            return fetch('/located/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(locatedData)
            });
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            console.log('Pessoa transferida para located.json:', data);
        })
        .catch(function(err) {
            console.error('Erro ao transferir para located.json:', err);
        });
}
