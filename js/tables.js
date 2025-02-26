"use strict";

/* Esta funcion crea una tabla de DataTables recogiendo un json como argumento */
export async function renderTable(datos) {
    
    const centros = [datos]; // El JSON que se pretende recoger es un objeto y DataTables requiere un array de objetos por eso se envuelve el objeto en un array[]
    
    // Inicializar DataTables
    const table = $("#tablaMeteo").DataTable({
        destroy: true, //Si ya existe la tabla se destruye
        data: centros,
        columns: [
            { data: "temperaturaActual" }, // Temp. Actual
            { data: "humedad" }, // Humedad
            { data: "viento" }, // Viento
            { data: "temperaturaMinima" }, // Temp. Minima
            { data: "temperaturaMaxima" } // Temp. Maxima

        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/2.2.2/i18n/es-ES.json", // Traducir al espannol
        },
    }); 
}