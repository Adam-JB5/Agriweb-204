"use strict";

/* Se exporta la variable map para poder usarla en el JS principal. Funcion eventoCambioDeSeccion() */
export let map;

/* Esta funcion dibuja un mapa con OpenStreetMap sobre el div con ID map */
export async function recogerMapa() {

    const apiKey = '634c44f6b412402884728a784d0b1191'; //API Key
    map = L.map('map').setView([43.3837, -3.2188], 13); //Se situa el mapa por defecto en Castro Urdiales sobre el div con ID map
    //Se crea el mapa con OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Verificar si el navegador soporta geolocalización
    if ("geolocation" in navigator) {

        /* Se recoge la posicion */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Centrar el mapa en la ubicación del usuario
                map.setView([lat, lon], 13);

                // Agregar un marcador en la ubicación del usuario
                L.marker([lat, lon]).addTo(map)
                    .bindPopup("Estás aquí")
                    .openPopup(); // Se abre el marcador
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