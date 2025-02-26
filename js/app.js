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
        auth.inicializarFirebase();


        if (await auth.recogerDOM()) {
            animarEntradaMenu();
        }

        function animarEntradaMenu() {
            const pantallaLogin = document.getElementById("pantallaLogin");
            const pantallaMenu = document.getElementById("pantallaMenu");
        
            pantallaLogin.classList.add("animate__animated", "animate__fadeOutLeftBig");
        
            pantallaLogin.addEventListener("animationend", () => {
                pantallaLogin.style.display = "none";
                pantallaMenu.style.display = "block";
                main.style.height = "unset";
            });
        
            pantallaMenu.classList.add("animate__animated", "animate__fadeInRightBig");

            const header = document.getElementById("header");

            header.style.backgroundColor = "#31572c";
        }
    }

    async function avisosYNoticias() {
        let avisos = await rss.avisosRSS();
        let agricultura = await rss.agriculturaRSS();

        for (let i = 1; i < avisos.length; i++) {
            rss.crearAviso(avisos[i]);     
        }
        
        for (let i = 1; i < agricultura.length; i++) {
            rss.crearNoticia(agricultura[i]);     
        }


    }

    function eventoCambioDeSeccion() {
        let enlaces = document.querySelectorAll(".enlacesSeccion");
        let secciones = document.querySelectorAll(".seccionDeMenu");

        enlaces.forEach((element, index) => {
            element.addEventListener("click", async (ev) => {
                ev.preventDefault();

                secciones.forEach(seccion => {
                    seccion.style.display = "none";
                });
    
                // Mostrar la sección correspondiente
                let seccionMostrar = document.getElementById(`seccion${index + 1}`);
                if (seccionMostrar) {
                    seccionMostrar.style.display = "block";


                    if (seccionMostrar.id != "seccion1" && seccionMostrar.id != "seccion4") {
                        document.getElementById("main").style.height = "90vh";
                    } else {
                        if (window.innerWidth <= 800) {
                            document.getElementById("main").style.height = "90vh";
                        } else {
                            document.getElementById("main").style.height = "unset";
                        }
                    }  

                    /* Si se hace click en la seccion2  */
                    if (seccionMostrar.id == "seccion2") {
                        maps.recogerMapa()
                        .then(() => {
                            setTimeout(() => {
                                maps.map.invalidateSize();
                            }, 100);
                        });
                    }

                    if (seccionMostrar.id == "seccion4") {
                        await reconocimientoVegetal();
                    }
                     
                }
            })
        });
        
    }

    /* async function recogerMapa() {
        await maps.recogerMapa()
        .then(() => {
            setTimeout(() => {
                maps.map.invalidateSize();
            }, 100);
        });
    } */

    async function infoMeteorologica() {
        let botonMeteo = document.getElementById("botonMeteo");
        
        
        botonMeteo.addEventListener("click", async () => {
            let datosClima = await meteo.getWeather();
            console.log(datosClima);

            tables.renderTable(datosClima);
        });
    }

    async function reconocimientoVegetal() {

        const video = document.getElementById('video');
        const imagenSubida = document.getElementById('imagenSubida');
        const botonCapturar = document.getElementById('capturar');
        const botonCambiarCamara = document.getElementById('cambiarCamara');
        const inputImagen = document.getElementById('inputImagen');
        const resultado = document.getElementById("resultado");
        const canvas = document.createElement('canvas');

        inputImagen.addEventListener('change', (event) => {
            const archivo = event.target.files[0];
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

        botonCapturar.addEventListener('click', async () => {
            tensorflow.capturarFotograma(canvas, video, resultado);
            console.log("click");
        });
        botonCambiarCamara.addEventListener('click', async () => {
            await tensorflow.accederCamara(video, imagenSubida);
            console.log("click3");
        });

        tensorflow.accederCamara;
    }

    

    
}