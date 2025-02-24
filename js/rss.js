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

export function crearAviso(aviso) {

    const regex = /^(.*?)\s+(\d{2}:\d{2} \d{2}-\d{2}-\d{4}).*?(\d{2}:\d{2} \d{2}-\d{2}-\d{4})/;

    const match = aviso.content.match(regex);

    let descripcion;
    let inicio;
    let fin;

    if (match) {
        descripcion = match[1].trim(); // Captura todo antes de la primera hora
        inicio = match[2]; // Captura "00:00 01-01-1970"
        fin = match[3];    // Captura "09:59 01-01-1970"
    }
    /* Recogo el div de avisos */
    const divAvisos = document.getElementById("avisos");

    /* Creo un div y le pongo una clase */
    let div = document.createElement("div");
    div.classList.add("aviso");

    /* Creo un titulo y recogo la información del aviso */
    let titulo = document.createElement("h3");
    titulo.textContent = aviso.title.split(".")[3].trim();
    
    /* Annado el titulo al div del aviso */
    div.appendChild(titulo);

    let hr = document.createElement("hr");
    div.appendChild(hr);

    let parrafoNivel = document.createElement("p");
    parrafoNivel.textContent = aviso.title.split(".")[1].trim();
    parrafoNivel.style.color = "#4a4a4a";

    div.appendChild(parrafoNivel);

    let parrafoInfo = document.createElement("p");
    parrafoInfo.textContent = descripcion + ":";

    div.appendChild(parrafoInfo);

    let parrafoFechas = document.createElement("p");
    parrafoFechas.innerHTML = `${inicio} &nbsp;&nbsp;&nbsp; HASTA &nbsp;&nbsp;&nbsp; ${fin}`;

    div.appendChild(parrafoFechas);

    let enlaceMasInfo = document.createElement("a");
    enlaceMasInfo.href = aviso.link;
    enlaceMasInfo.textContent = "LEER MÁS";

    div.appendChild(enlaceMasInfo);


    /* Annado el div del aviso a su seccion */
    divAvisos.appendChild(div);
    
}

export function crearNoticia(noticia) {
    /* Recogo el div de avisos */
    const divNoticias = document.getElementById("noticias");

    /* Creo un div y le pongo una clase */
    let div = document.createElement("div");
    div.classList.add("noticia");

    /* Creo un titulo y recogo la información del aviso */
    let titulo = document.createElement("h3");
    titulo.textContent = noticia.title;
    
    /* Annado el titulo al div del aviso */
    div.appendChild(titulo);

    let boton = document.createElement("button");
    boton.textContent = "LEER MÁS";
    boton.onclick = function() {
        window.location.href = noticia.link;
    };

    div.appendChild(boton);

    div.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${noticia.thumbnail})`;

    divNoticias.appendChild(div);

}