export async function renderTable(datos) {
    /* const data = await fetchData(); */
    const centros = [datos]; // Accedemos a la lista de centros
    
    // Inicializar DataTables
    const table = $("#tablaMeteo").DataTable({
        destroy: true,
        data: centros,
        columns: [
            { data: "temperaturaActual" }, // Nombre del centro
            { data: "humedad" }, // Dirección
            { data: "viento" }, // Horario
            { data: "temperaturaMinima" }, // Nombre del centro
            { data: "temperaturaMaxima" }

        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/2.2.2/i18n/es-ES.json", // Traducir al español
        },
    }); 
}