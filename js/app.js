"use strict";

import * as auth from "./auth.js";
import * as rss from "./rss.js";
import * as maps from "./maps.js";
import * as meteo from "./meteo.js";
import * as tables from "./tables.js";
import * as tensorflow from "./tensorflow.js";

document.addEventListener('DOMContentLoaded', inicio);

async function inicio() {
    autenticacion();
    avisosYNoticias();
    eventoCambioDeSeccion();
    infoMeteorologica();

    async function autenticacion() {
        /* Inicalizo firebase */
        auth.inicializarFirebase();


        /* Espero a que se resuelva correctamente recogerDOM() (Se inicia sesion con exito) */
        if (await auth.recogerDOM()) {
            animarEntradaMenu();
        }

        /* Esta funcion les annade una animacion usando la libreria animate.css, a los div principales: Pantalla del login y la pantalla principal del programa */
        function animarEntradaMenu() {
            /* Recogo los divs */
            const pantallaLogin = document.getElementById("pantallaLogin");
            const pantallaMenu = document.getElementById("pantallaMenu");
        
            /* Le annado a la pantalla del login una animacion de desparicion */
            pantallaLogin.classList.add("animate__animated", "animate__fadeOutLeftBig");
        
            /* Cuando la animacion acabe */
            pantallaLogin.addEventListener("animationend", () => {
                pantallaLogin.style.display = "none"; // Oculto el login
                pantallaMenu.style.display = "block"; // Muestro el menu principal
                main.style.height = "unset";
            });
        
            /* Le annado al menu principal una animacion de aparicion */
            pantallaMenu.classList.add("animate__animated", "animate__fadeInRightBig");

            /* Le cambio el color al header */
            const header = document.getElementById("header");
            header.style.backgroundColor = "#31572c";
        }
    }

    /* Esta funcion recoge avisos y noticias RSS para luego crear "cartas" con la informacion de la noticia/aviso */
    async function avisosYNoticias() {
        /* Recogo los arrays que devuelven los metodos */
        let avisos = await rss.avisosRSS();
        let agricultura = await rss.agriculturaRSS();

        /* Recorro el array de avisos y por cada aviso ejecuto crearAviso() que creara una carta con la informacion */
        for (let i = 1; i < avisos.length; i++) {
            rss.crearAviso(avisos[i]);     
        }
        
        /* Recorro el array de noticias y por cada noticia ejecuto crearNoticia() que creara una carta con la informacion */
        for (let i = 1; i < agricultura.length; i++) {
            rss.crearNoticia(agricultura[i]);     
        }

    }

    /* Esta funcion se ocupa de toda la logica de cambio de seccion, ademas de inicializar el mapa y el reconocimiento de imagenes */
    function eventoCambioDeSeccion() {
        /* Recogo los enlaces del menu lateral y los divs de la secciones en si */
        let enlaces = document.querySelectorAll(".enlacesSeccion");
        let secciones = document.querySelectorAll(".seccionDeMenu");

        /* Recorro los enlaces y les annado un evento click */
        enlaces.forEach((element, index) => {
            element.addEventListener("click", async (ev) => {
                /* Evito que redirigan a ningun sitio */
                ev.preventDefault();

                /* Oculto todas las secciones */
                secciones.forEach(seccion => {
                    seccion.style.display = "none";
                });
    
                // Mostrar la sección correspondiente, se suma 1 debido a que las secciones empiezan por 1 y no por 0
                let seccionMostrar = document.getElementById(`seccion${index + 1}`);
                /* Si existe la seccion se le cambia el display a block para que se muestre */
                if (seccionMostrar) {
                    seccionMostrar.style.display = "block";


                    /* Si se entra en la seccion 1 cambio la altura de la seccion main para que el fondo se adapte al contenido */
                    if (seccionMostrar.id == "seccion1") {
                        document.getElementById("main").style.height = "unset";
                    /* Si se entra en la seccion 4 */
                    } else if (seccionMostrar.id == "seccion4") {
                        /* Si se entra desde un dispositivo movil se pone una altura fija al main. Sino se deja que se adapte al contenido */
                        if (window.innerWidth <= 800) {
                            document.getElementById("main").style.height = "90vh";
                        } else {
                            document.getElementById("main").style.height = "unset";
                        }
                    /* Si se entra en cualquier seccion que no sea la 1 o la 4 se pone una altura fija */
                    } else {
                        document.getElementById("main").style.height = "90vh";
                    }

                    /* Si se hace click en la seccion2  */
                    if (seccionMostrar.id == "seccion2") {
                        /* Ejecuto la funcion que inicializa el mapa */
                        await maps.recogerMapa()
                        .then(() => { // Espero a que acabe de dibujarse el mapa y ejecuto invalidateSize() despues de 100 milisegundos
                            setTimeout(() => {
                                maps.map.invalidateSize(); // La funcion invalidateSize() recoge el tamaño del div y ajusta el tamaño del mapa
                            }, 100);
                        });
                    }

                    /* Si se hace click en la seccion4 */
                    if (seccionMostrar.id == "seccion4") {
                        await reconocimientoVegetal(); // Se ejecuta reconocimientoVegetal()
                    }
                     
                }
            })
        });
        
    }

    /* Esta funcion annade un event listener al botonMeteo que recoge la informacion del tiempo y ejecuta renderTable() para mostrar los datos meteorologicos con DataTables */
    async function infoMeteorologica() {
        /* Recogo el boton */
        let botonMeteo = document.getElementById("botonMeteo");
        
        /* Le annado un event listener */
        botonMeteo.addEventListener("click", async () => {
            /* Recogo los datos del tiempo y los guardo en datosClima, getWeather() devuelve un JSON */
            let datosClima = await meteo.getWeather();
            console.log(datosClima);

            /* Debido a que getWeather() devuelve un JSON puedo llamar directamente a renderTable() para que dibuje la tabla segun los datos introducidos */
            tables.renderTable(datosClima);
        });
    }

    async function reconocimientoVegetal() {

        /* Recogo todos los elementos del DOM necesarios */
        const video = document.getElementById('video'); // Etiqueta video
        const imagenSubida = document.getElementById('imagenSubida');
        const botonCapturar = document.getElementById('capturar'); // Boton captura
        const botonCambiarCamara = document.getElementById('cambiarCamara'); // Boton activacion o cambio de camara
        const inputImagen = document.getElementById('inputImagen'); // Input de tipo file que recoge una imagen
        const resultado = document.getElementById("resultado"); // Parrafo en el que se mostrara el resultado

        const canvas = document.createElement('canvas'); // Se crea un canvas, en el que se capturara el stream de video y la captura a procesar. Funcion capturarFotograma()

        /* Annado un evento al input que se ejecutara cada vez que se suba una imagen distinta */
        inputImagen.addEventListener('change', (event) => {
            const archivo = event.target.files[0]; // Recogo el archivo subido
            if (archivo) {
                const img = new Image();
                img.src = URL.createObjectURL(archivo);
                img.onload = async () => {
                    video.style.display = "none";  // Ocultar video
                    imagenSubida.src = img.src;
                    imagenSubida.style.display = "block";  // Mostrar imagen subida
                    await tensorflow.predecir(img, resultado);
                };
            }
        });

        /* Al hacer click sobre el boton capturar se ejecuta capturarFotograma() que recoge un frame de video y lo procesa para predecirlo */
        botonCapturar.addEventListener('click', async () => {
            tensorflow.capturarFotograma(canvas, video, resultado);
        });

        /* Al hacer click sobre el boton cambio/activacion de camara se ejecuta accederCamara() que alterna la variable usandoFrontal para cambiar de camara */
        botonCambiarCamara.addEventListener('click', async () => {
            await tensorflow.accederCamara(video, imagenSubida);
        });

        tensorflow.accederCamara;
    }
 
}