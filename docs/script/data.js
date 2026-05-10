let missingData = [];
let currentPhoto = null;
let editingId = null;

function getNextId() {
    return Math.max.apply(null, missingData.map(function(p) { return p.id; }).concat([0])) + 1;
}

function saveToServer() {
    console.log('Tentando salvar no servidor...', missingData);
    fetch('/missing/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(missingData)
    })
    .then(function(res) {
        console.log('Resposta do servidor - Status:', res.status);
        if (!res.ok) {
            throw new Error('Status HTTP: ' + res.status);
        }
        return res.json();
    })
    .then(function(data) {
        console.log('✅ Salvo no servidor:', data);
    })
    .catch(function(err) {
        console.error('❌ Erro ao salvar no servidor:', err);
        console.error('Stack:', err.stack);
        alert('❌ Erro ao salvar! Verifique o console (F12)');
    });
}
