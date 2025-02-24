"use strict";

import * as auth from "./auth.js";
import * as rss from "./rss.js";
import * as maps from "./maps.js";
import * as meteo from "./meteo.js";

document.addEventListener('DOMContentLoaded', inicio);

async function inicio() {
    autenticacion();
    avisosYNoticias();
    eventoCambioDeSeccion();

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
            element.addEventListener("click", (ev) => {
                ev.preventDefault();

                secciones.forEach(seccion => {
                    seccion.style.display = "none";
                });
    
                // Mostrar la sección correspondiente
                let seccionMostrar = document.getElementById(`seccion${index + 1}`);
                if (seccionMostrar) {
                    seccionMostrar.style.display = "block";
                    recogerMapa()
                    .then(() => {
                        setTimeout(() => {
                            maps.map.invalidateSize();
                        }, 100);
                    });
                }
            })
        });
        
    }

    async function recogerMapa() {
        await maps.recogerMapa()
        .then(() => {
            setTimeout(() => {
                maps.map.invalidateSize();
            }, 100);
        });
    }

    

    
}