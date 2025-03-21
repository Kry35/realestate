// Dairelerin verileri (örnek)
const apartments = [
    {
        name: "Kocagöz Evleri Kiralık",
        area: "50m²",
        rooms: "1+1 Daire Bahçe Katı",
        lat: 37.10566,
        lon: 27.66128,
        photo: "resim/kocagoz.png",
        status: "Kiralık" // Satılık veya Kiralık
    },
    {
        name: "Daire 2",
        area: "70m²",
        rooms: "2 Oda",
        lat: 37.4250,
        lon: 27.1450,
        photo: "daire2.jpg",
        status: "Kiralık"
    },
    {
        name: "Daire 3",
        area: "100m²",
        rooms: "4 Oda",
        lat: 37.4260,
        lon: 27.1470,
        photo: "daire3.jpg",
        status: "Satılık"
    }
];

// Daireleri listeleme fonksiyonu (Filtreleme destekli)
function displayApartments(filter = "Tümü") {
    const apartmentsDiv = document.getElementById('apartments');
    apartmentsDiv.innerHTML = ""; // Önceki içeriği temizle

    apartments
        .filter(apartment => filter === "Tümü" || apartment.status === filter) // Filtreleme işlemi
        .forEach((apartment) => {
            const apartmentDiv = document.createElement('div');
            apartmentDiv.classList.add('apartment');
            apartmentDiv.innerHTML = `
                <h2>${apartment.name}</h2>
                <img src="${apartment.photo}" alt="${apartment.name}" class="apartment-photo" onclick="openLightbox('${apartment.photo}')" />
                <p>Alan: ${apartment.area}</p>
                <p>Oda Sayısı: ${apartment.rooms}</p>
                <p><strong>Durum:</strong> ${apartment.status}</p>
                <button onclick="openMap(${apartment.lat}, ${apartment.lon}, '${apartment.name}')">Konumu Göster</button>
            `;
            apartmentsDiv.appendChild(apartmentDiv);
        });
}

// Filtreleme değiştiğinde çalışacak fonksiyon
function filterApartments() {
    const filterValue = document.getElementById('statusFilter').value;
    displayApartments(filterValue);
}

// Fotoğrafı büyük göstermek için Lightbox
function openLightbox(photoSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightbox.style.display = 'flex';
    lightboxImage.src = photoSrc;
}

// Lightbox'ı kapatma
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Harita başlatma
const map = L.map('map').setView([37.4237, 27.1428], 13);

// OpenStreetMap katmanını ekle
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Konumu haritada gösterme
function openMap(lat, lon, apartmentName) {
    map.setView(new L.LatLng(lat, lon), 16);
    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

    L.marker([lat, lon]).addTo(map)
        .bindPopup(`
            <b>${apartmentName}</b><br>
            Konum: ${lat}, ${lon}<br>
            <a href="${googleMapsLink}" target="_blank">Google Maps'te Konumu Göster</a>
        `)
        .openPopup();
}

// Sayfa yüklendiğinde tüm daireleri göster
window.onload = () => {
    displayApartments();
};
