// Dairelerin verileri (örnek)
const apartments = [
    {
        name: "Has Yapı Gayrimenkul",
        area: "85m²",
        rooms: "Ofis",
        lat: 37.11231,
        lon: 27.65592
    },
    {
        name: "Daire 2",
        area: "70m²",
        rooms: "2 Oda",
        lat: 37.4250,
        lon: 27.1450
    },
    {
        name: "Daire 3",
        area: "100m²",
        rooms: "4 Oda",
        lat: 37.4260,
        lon: 27.1470
    }
];

// Daire bilgilerini sayfaya ekleme
function displayApartments() {
    const apartmentsDiv = document.getElementById('apartments');
    apartments.forEach((apartment) => {
        const apartmentDiv = document.createElement('div');
        apartmentDiv.classList.add('apartment');
        apartmentDiv.innerHTML = `
            <h2>${apartment.name}</h2>
            <p>Alan: ${apartment.area}</p>
            <p>Oda Sayısı: ${apartment.rooms}</p>
            <button onclick="openMap(${apartment.lat}, ${apartment.lon})">Konumu Göster</button>
        `;
        apartmentsDiv.appendChild(apartmentDiv);
    });
}

// Harita başlatma
const map = L.map('map').setView([37.4237, 27.1428], 13);

// OpenStreetMap katmanını ekle
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Konumu haritada gösterme
function openMap(lat, lon) {
    map.setView(new L.LatLng(lat, lon), 16);
    L.marker([lat, lon]).addTo(map)
        .bindPopup("Hedef Konum")
        .openPopup();
}

// Sayfa yüklendiğinde daireleri göster
window.onload = displayApartments;