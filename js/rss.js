"use strict";

/* Recogo un feed RSS y lo convierto a formato JSON, el feed usado es de avisos meteorologicos de AEMET: https://www.aemet.es/es/rss_info/avisos/esp */
export async function avisosRSS() {
    /* Uso RSS2JSON para convertir un RSS en formato XML a JSON 
    Mas informacion sobre RSS2JSON: https://rss2json.com/#rss_url=https%3A%2F%2Fwww.theguardian.com%2Finternational%2Frss */

    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.aemet.es/documentos_d/eltiempo/prediccion/avisos/rss/CAP_AFAE_RSS.xml');
    const data = await response.json();
    console.log(data.items);
    return data.items;
}

/* Recogo un feed RSS y lo convierto a formato JSON, el feed usado es de noticias de agricultura por toda Espanna: https://www.agroes.es/noticias/rss-y-feeds-de-agroes-es */
export async function agriculturaRSS() {
    /* Uso RSS2JSON para convertir un RSS en formato XML a JSON 
    Mas informacion sobre RSS2JSON: https://rss2json.com/#rss_url=https%3A%2F%2Fwww.theguardian.com%2Finternational%2Frss */
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

/* Esta funcion crea un aviso creando elementos de forma dinamica */
export function crearAviso(aviso) {
    // Expresión regular para extraer la descripción, la fecha de inicio y la fecha de fin
    const regex = /^(.*?)\s+(\d{2}:\d{2} \d{2}-\d{2}-\d{4}).*?(\d{2}:\d{2} \d{2}-\d{2}-\d{4})/;
    
    // Se intenta hacer coincidir el contenido del aviso con la regex
    const match = aviso.content.match(regex);

    let descripcion;
    let inicio;
    let fin;

    if (match) {
        descripcion = match[1].trim(); // Captura todo antes de la primera hora como descripción
        inicio = match[2]; // Captura la fecha y hora de inicio "00:00 01-01-1970"
        fin = match[3];    // Captura la fecha y hora de fin "09:59 01-01-1970"
    }

    // Se obtiene el contenedor donde se mostrarán los avisos
    const divAvisos = document.getElementById("avisos");

    // Se crea un nuevo div para el aviso y se le asigna la clase "aviso"
    let div = document.createElement("div");
    div.classList.add("aviso");

    // Se crea un elemento <h3> para el título del aviso
    let titulo = document.createElement("h3");
    titulo.textContent = aviso.title.split(".")[3].trim(); // Quito los espacios alrededor del titulo
    
    // Se añade el título al div del aviso
    div.appendChild(titulo);

    // Se crea una línea horizontal para separar el contenido
    let hr = document.createElement("hr");
    div.appendChild(hr);

    // Se crea un párrafo para mostrar el nivel del aviso
    let parrafoNivel = document.createElement("p");
    parrafoNivel.textContent = aviso.title.split(".")[1].trim();
    parrafoNivel.style.color = "#4a4a4a"; // Color del texto
    div.appendChild(parrafoNivel);

    // Se crea un párrafo con la descripción del aviso
    let parrafoInfo = document.createElement("p");
    parrafoInfo.textContent = descripcion + ":";
    div.appendChild(parrafoInfo);

    // Se crea un párrafo con las fechas de inicio y fin del aviso
    let parrafoFechas = document.createElement("p");
    parrafoFechas.innerHTML = `${inicio} &nbsp;&nbsp;&nbsp; HASTA &nbsp;&nbsp;&nbsp; ${fin}`;
    div.appendChild(parrafoFechas);

    // Se crea un enlace para leer más detalles del aviso
    let enlaceMasInfo = document.createElement("a");
    enlaceMasInfo.href = aviso.link;
    enlaceMasInfo.textContent = "LEER MÁS";
    div.appendChild(enlaceMasInfo);

    // Se añade el div del aviso al contenedor principal
    divAvisos.appendChild(div);
}

/* Esta funcion crea una noticia creando elementos de forma dinamica */
export function crearNoticia(noticia) {
    // Se obtiene el contenedor donde se mostrarán las noticias
    const divNoticias = document.getElementById("noticias");

    // Se crea un nuevo div para la noticia y se le asigna la clase "noticia"
    let div = document.createElement("div");
    div.classList.add("noticia");

    // Se crea un elemento <h3> para el título de la noticia
    let titulo = document.createElement("h3");
    titulo.textContent = noticia.title;
    
    // Se añade el título al div de la noticia
    div.appendChild(titulo);

    // Se crea un botón para leer más sobre la noticia
    let boton = document.createElement("button");
    boton.textContent = "LEER MÁS";
    boton.onclick = function() {
        window.location.href = noticia.link; // Redirige al enlace de la noticia
    };
    div.appendChild(boton);

    // Se establece una imagen de fondo con un degradado oscuro superpuesto. Es posible que el fondo no se muestre correctamente debido a que a veces el servidor no devuelve correctamente la propiedad thumbnail
    div.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${noticia.thumbnail})`;

    // Se añade el div de la noticia al contenedor principal
    divNoticias.appendChild(div);
}