"use strict";

import * as auth from "./auth.js";
import * as rss from "./rss.js";

document.addEventListener('DOMContentLoaded', inicio);

async function inicio() {
    autenticacion();
    avisosYNoticias();

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
            });
        
            pantallaMenu.classList.add("animate__animated", "animate__fadeInRightBig");
        }
    }

    async function avisosYNoticias() {
        let avisos = await rss.avisosRSS();
        let agricultura = await rss.agriculturaRSS();
        console.log(avisos);
        for (let i = 1; i < avisos.length; i++) {
            crearAviso(avisos[i]);
            
        }
        


    }

    function crearAviso(aviso) {
        const divAvisos = document.getElementById("avisos");
        let div = document.createElement("div");
        div.classList.add("aviso");

        let titulo = document.createElement("h3");
        titulo.textContent = aviso.title.split(".")[3].trim();
        

        div.appendChild(titulo);

        divAvisos.appendChild(div);
        
    }
}