// Dairelerin verileri (örnek)
const apartments = [
    {
        name: "Kocagöz Evleri Kiralık",
        area: "50m²",
        rooms: "1+1 Daire Bahçe Katı",
        lat: 37.10566,
        lon: 27.66128,
        photo: "kocagoz.png",
        status: "Kiralık",
        price: "20.000/ay TL"
    },
    {
        name: "Yeşil Vadi Evleri Satılık",
        area: "65m²",
        rooms: "2+1 Daire Ara Kat",
        lat: 37.12167,
        lon: 27.65289,
        photo: "yesilvadi.png",
        status: "Satılık",
        price: "3.500.000 TL"
    },
	 {
        name: "Can Apartmanı Satılık",
        area: "Bilinmiyor²",
        rooms: "2+1 En Üst Kat",
        lat: 37.10869,
        lon: 27.65497,
        photo: "canapt.png",
        status: "Satılık",
        price: "3.250.000 TL"
    },
	 {
        name: "Fatma Kaya Evleri Satılık",
        area: "Bilinmiyor²",
        rooms: "2+1 En Üst Kat",
        lat: 37.10881,
        lon: 27.66366,
        photo: "fatmakaya.png",
        status: "Satılık",
        price: "3.250.000 TL"
    },
		 {
        name: "Yağız Evlerinin Karşısı Satılık",
        area: "60²",
        rooms: "2+1 Bahçe Katı",
        lat: 37.10438,
        lon: 27.66779,
        photo: "bahcekat.png",
        status: "Satılık",
        price: "3.000.000 TL"
    },
	{
        name: "Ender Evleri Satılık",
        area: "65²",
        rooms: "2+1 Ara Kat",
        lat: 37.10424,
        lon: 27.67049,
        photo: "enderevleri.png",
        status: "Satılık",
        price: "3.500.000 TL"
    },
		{
        name: "Bahçıvan Evleri Satılık",
        area: "60²",
        rooms: "2+1 Ara Kat",
        lat: 37.10471,
        lon: 27.67243,
        photo: "bahcivanevleri.png",
        status: "Satılık",
        price: "3.500.000 TL"
    },
    {
        name: "Yıldırım İnşaat Satılık",
        area: "Bilinmiyor",
        rooms: "2+1 Ara Kat Ebevyn Banyolu",
        lat: 37.10869,
        lon: 27.65497,
        photo: "yildiriminsaat.png",
        status: "Satılık",
        price: "3.650.000 TL"
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
