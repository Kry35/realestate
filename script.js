// Dairelerin verileri (örnek)
const apartments = [
    {
        name: "Villa Lüx Çelik Apartmanı Kiralık",
        area: "80m²",
        rooms: "2+1 Daire Bahçe Katı (Mert Portföy)",
        lat: 37.10486,
        lon: 27.66974,
        photo: "villalux.png",
        status: "Kiralık",
        price: "18.000/ay TL"
	
	
    },
    {
        name: "Pazar Yeri Alt Taraf",
        area: "65m²",
        rooms: "2+1 Daire Kat 3 Çift Balkonlu (Mert Portföy)",
        lat: 37.10569,
        lon: 27.65939,
        photo: "pazaryeri.png",
        status: "Kiralık",
        price: "20.000/ay TL"
    },
	 
	
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
                <img src="${apartment.photo}" alt="${apartment.name}" class="apartment-photo" onclick="openLightbox('${apartment.photo}')" />
                <div class="apartment-info">
                    <h2>${apartment.name}</h2>
                    <p><strong>Alan:</strong> ${apartment.area}</p>
                    <p><strong>Oda Sayısı:</strong> ${apartment.rooms}</p>
                    <p><strong>Durum:</strong> ${apartment.status}</p>
                    <p><strong>Fiyat:</strong> <span class="price">${apartment.price}</span></p>
                    <button onclick="openMap(${apartment.lat}, ${apartment.lon}, '${apartment.name}')">Konumu Göster</button>
                </div>
            `;
            apartmentsDiv.appendChild(apartmentDiv);
        });
}

// Filtreleme değiştiğinde çalışacak fonksiyon
function filterApartments() {
    const filterValue = document.getElementById('statusFilter').value;
    displayApartments(filterValue);
}

// Fotoğraf büyütme (mobil uyumlu, ışıklı efektli)
function openLightbox(photo) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = "flex";
    lightboxImg.src = photo;
}

// Fotoğraf kapatma
function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}

// Harita başlatma
const map = L.map('map').setView([37.4237, 27.1428], 13);

// OpenStreetMap katmanını ekle
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Konumu haritada gösterme ve Google Maps linki ekleme
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

// Sayfa yüklendiğinde daireleri göster
window.onload = () => {
    displayApartments();
};
