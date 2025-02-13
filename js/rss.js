export async function avisosRSS() {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.aemet.es/documentos_d/eltiempo/prediccion/avisos/rss/CAP_AFAE_RSS.xml');
    const data = await response.json();
    console.log(data.items);
    return data.items;
}

export async function agriculturaRSS() {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.agroes.es/cultivos-agricultura?format=feed&type=rss');
    const data = await response.json();
    
    if (data.items) {
        console.log(data.items);
        return data.items;
    } else {
        console.error("No se encontraron noticias.");
        return [];
    }
}