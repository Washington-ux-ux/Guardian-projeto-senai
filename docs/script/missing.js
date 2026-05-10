document.addEventListener('DOMContentLoaded', function() {
    loadMissingData();
    initEventListeners();
});

async function loadMissingData() {
    try {
        var response = await fetch('./src/data/missing.json');
        missingData = await response.json();
        renderMissingCards();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        loadFallbackData();
    }
}

function loadFallbackData() {
    missingData = [
        {
            id: 1,
            name: "Nezuko Kamado",
            age: 14,
            gender: "female",
            photoUrl: "./assets/images/nezuko.webp",
            date: "2026-05-01T18:30:00.000Z",
            location: { city: "Asakusa", state: "Tokyo", lastSeen: "Floresta próxima à vila" },
            contactInfo: { phone: "000000000", name: "Tanjiro Kamado" },
            status: "missing",
            createdAt: "2026-05-01T19:00:00.000Z",
            updatedAt: "2026-05-05T22:58:07.737Z"
        },
        {
            id: 2,
            name: "Naruto Uzumaki",
            age: 12,
            gender: "male",
            photoUrl: "./assets/images/naruto.webp",
            date: "2026-05-03T14:20:00.000Z",
            location: { city: "Konohagakure", state: "País do Fogo", lastSeen: "Campo de treinamento" },
            contactInfo: { phone: "000000001", name: "Iruka Umino" },
            status: "missing",
            createdAt: "2026-05-03T14:30:00.000Z",
            updatedAt: "2026-05-03T14:30:00.000Z"
        }
    ];
    renderMissingCards();
}

function initEventListeners() {
    var addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            editingId = null;
            currentPhoto = null;
            clearForm();
            openModal();
        });
    }
    
    var closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    var modal = document.getElementById('addModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }
    
    var btnSave = document.querySelector('.btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', function(e) {
            e.preventDefault();
            saveMissing();
        });
    }
    
    var btnCancel = document.querySelector('.btn-cancel');
    if (btnCancel) {
        btnCancel.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    var photoInput = document.getElementById('photoInput');
    if (photoInput) {
        photoInput.addEventListener('change', previewPhoto);
    }
    
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchMissing);
    }
}

function searchMissing() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) {
        renderMissingCards();
        return;
    }
    
    var filtered = missingData.filter(function(person) {
        return person.name.toLowerCase().includes(searchTerm) ||
               person.location.city.toLowerCase().includes(searchTerm);
    });
    
    renderMissingCards(filtered);
}
