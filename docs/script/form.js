function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('genderInput').value = '';
    document.getElementById('cityInput').value = '';
    document.getElementById('stateInput').value = '';
    document.getElementById('lastSeenInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('contactNameInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('photoPreview').innerHTML = '<i class="fa-solid fa-camera"></i>';
    currentPhoto = null;
}

function fillFormWithPersonData(person) {
    console.log('Preenchendo formulário com dados:', person);
    
    
    clearForm();
    
    
    var nameInput = document.getElementById('nameInput');
    var ageInput = document.getElementById('ageInput');
    var genderInput = document.getElementById('genderInput');
    var cityInput = document.getElementById('cityInput');
    var dateInput = document.getElementById('dateInput');
    
    if (nameInput) nameInput.value = person.name || '';
    if (ageInput) ageInput.value = person.age || '';
    if (genderInput) genderInput.value = person.gender || '';
    if (cityInput) cityInput.value = person.location ? person.location.city || '' : '';
    if (dateInput) {
        var dateStr = person.date ? new Date(person.date).toISOString().split('T')[0] : '';
        dateInput.value = dateStr;
    }
    
    
    var stateInput = document.getElementById('stateInput');
    var lastSeenInput = document.getElementById('lastSeenInput');
    var phoneInput = document.getElementById('phoneInput');
    var contactNameInput = document.getElementById('contactNameInput');
    var descriptionInput = document.getElementById('descriptionInput');
    
    if (stateInput) stateInput.value = person.location ? person.location.state || '' : '';
    if (lastSeenInput) lastSeenInput.value = person.location ? person.location.lastSeen || '' : '';
    if (phoneInput) phoneInput.value = person.contactInfo ? person.contactInfo.phone || '' : '';
    if (contactNameInput) contactNameInput.value = person.contactInfo ? person.contactInfo.name || '' : '';
    if (descriptionInput) {
        var desc = person.description ? person.description.details || '' : '';
        descriptionInput.value = desc;
    }
    
    
    if (person.photoUrl) {
        currentPhoto = fixPhotoUrl(person.photoUrl);
        var photoPreview = document.getElementById('photoPreview');
        if (photoPreview) {
            photoPreview.innerHTML = '<img src="' + currentPhoto + '" alt="Preview">';
        }
    }
    
    console.log('Formulário preenchido. editingId:', editingId);
}

function previewPhoto(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) { 
            document.getElementById('photoPreview').innerHTML = '<img src="' + e.target.result + '" alt="Preview">';
            
            uploadImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function uploadImage(base64Data) {
    var fileName = 'person_' + Date.now() + '.jpg';
    
    fetch('/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image: base64Data,
            fileName: fileName
        })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data.success) {
            currentPhoto = data.imagePath;
            console.log('Imagem salva:', currentPhoto);
        } else {
            console.error('Erro ao salvar imagem:', data.message);
            currentPhoto = '';
        }
    })
    .catch(function(err) {
        console.error('Erro no upload:', err);
        currentPhoto = '';
    });
}

function saveMissing() {
    var name = document.getElementById('nameInput').value.trim();
    var age = parseInt(document.getElementById('ageInput').value);
    var gender = document.getElementById('genderInput').value;
    var city = document.getElementById('cityInput').value.trim();
    var state = document.getElementById('stateInput').value.trim();
    var lastSeen = document.getElementById('lastSeenInput').value.trim();
    var date = document.getElementById('dateInput').value;
    var phone = document.getElementById('phoneInput').value.trim();
    var contactName = document.getElementById('contactNameInput').value.trim();
    var description = document.getElementById('descriptionInput').value.trim();

    if (!name || !age || !gender || !city || !date) {
        alert('Por favor, preencha os campos obrigatórios: Nome, Idade, Gênero, Cidade e Data!');
        return;
    }

    if (currentPhoto === '') {
        setTimeout(saveMissing, 500);
        return;
    }

    var personData = {
        name: name,
        age: age,
        gender: gender,
        photoUrl: currentPhoto || '',
        date: new Date(date).toISOString(),
        location: {
            city: city,
            state: state,
            lastSeen: lastSeen
        },
        contactInfo: {
            phone: phone,
            name: contactName
        },
        description: {
            details: description
        },
        status: 'missing',
        updatedAt: new Date().toISOString()
    };

    if (editingId) {
        var index = missingData.findIndex(function(p) { return p.id === editingId; });
        if (index !== -1) {
            missingData[index] = Object.assign({}, missingData[index], personData);
        }
    } else {
        var newId = getNextId();
        var newPerson = Object.assign({
            id: newId,
            createdAt: new Date().toISOString()
        }, personData);
        missingData.push(newPerson);
    }

    renderMissingCards();
    closeModal();
    saveToServer();
    alert('Desaparecido salvo com sucesso!');
}
