"use strict";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuracion de la aplicacion web
const firebaseConfig = {
    apiKey: "AIzaSyB57_EmWzgzJ6A-hCip1US3IPxR6jJiSYs",
    authDomain: "agriweb-daw204.firebaseapp.com",
    projectId: "agriweb-daw204",
    storageBucket: "agriweb-daw204.firebasestorage.app",
    messagingSenderId: "114630111018",
    appId: "1:114630111018:web:41e3c0344f55d443263853",
    measurementId: "G-QCKJCBC71B"
};


document.addEventListener('DOMContentLoaded', inicio);

function inicio() {
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);

}
