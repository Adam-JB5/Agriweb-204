
"use strict";

export let map;

export async function recogerMapa() {
    //api key y situamos el mapa en castro
    const apiKey = '634c44f6b412402884728a784d0b1191';
    map = L.map('map').setView([43.3837, -3.2188], 13);
    //creamos el mapa con openstreetmap 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Verificar si el navegador soporta geolocalización
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Centrar el mapa en la ubicación del usuario
                map.setView([lat, lon], 13);

                // Agregar un marcador en la ubicación del usuario
                L.marker([lat, lon]).addTo(map)
                    .bindPopup("Estás aquí")
                    .openPopup();
            },
            (error) => {
                console.error("Error obteniendo la ubicación:", error);
                alert("No se pudo obtener la ubicación." + error.message);
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }

}