function openModal() {
    var modal = document.getElementById('addModal');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    var modal = document.getElementById('addModal');
    if (modal) modal.style.display = 'none';
    clearForm();
    editingId = null;
    currentPhoto = null;
}

function editMissing(id) {
    console.log('Editando pessoa com ID:', id);
    console.log('Dados disponíveis:', missingData);
    
    var person = missingData.find(function(p) { return p.id === id; });
    if (!person) {
        console.error('Pessoa não encontrada com ID:', id);
        return;
    }

    console.log('Pessoa encontrada:', person);
    editingId = id;
    console.log('editingId configurado para:', editingId);
    
    fillFormWithPersonData(person);
    openModal();
}
