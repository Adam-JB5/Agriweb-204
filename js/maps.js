
"use strict";

document.addEventListener('DOMContentLoaded', inicio);

function inicio() {
    
    //api key y situamos el mapa en castro
    const apiKey = '634c44f6b412402884728a784d0b1191';
    const map = L.map('map').setView([43.3837, -3.2188], 13);
    //creamos el mapa con openstreetmap 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    //array con cordenadas y nombre
    const localizaciones = [
        { coordenadas: [43.3837, -3.2188], nombre: "Castro Urdiales" },
        { coordenadas: [43.380252, -3.213848], nombre: "Bahía de Castro Urdiales" },
        { coordenadas: [43.384519, -3.215794], nombre: "Iglesia de Santa María" },
        { coordenadas: [43.375150, -3.207115], nombre: "Parque Cotolino" },
        { coordenadas: [43.386373, -3.225100], nombre: "Playa de Ostende" },
        { coordenadas: [43.381540, -3.217202], nombre: "Parque Amestoy" }
    ];
    //obtenemos lso datos del clima de openweathermap
    async function obtenerDatosClima(lat, lon) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`)
            .then(response => response.json());
    }
    //recorrer cada localizacion y sacar los datos para añadir los datos del clima en cada marker
    async function crearMarcadores() {
        for (const loc of localizaciones) {
            try {
                const data = await obtenerDatosClima(loc.coordenadas[0], loc.coordenadas[1]);
                const contenidoPopup = `
                    Nombre: ${loc.nombre}<br>
                    Temperatura: ${data.main.temp.toFixed(1)}°C<br>
                    Humedad: ${data.main.humidity}<br>
                    Clima: ${data.weather[0].description}
                `;
                L.marker(loc.coordenadas)
                    .addTo(map)
                    .bindPopup(contenidoPopup);
            } catch (error) {
                console.error(`Error al obtener datos del clima para ${loc.nombre}:`, error);
            }
        }
    }

    crearMarcadores();
}