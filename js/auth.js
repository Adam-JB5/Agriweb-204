"use strict";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut 
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

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

//Codigos de error
const errorMessages = {
    'auth/claims-too-large': 'La carga útil de claims proporcionada a setCustomUserClaims() excede el tamaño máximo permitido de 1000 bytes.',
    'auth/email-already-exists': 'El correo electrónico proporcionado ya está en uso por otro usuario. Cada usuario debe tener un correo único.',
    'auth/id-token-expired': 'El token de ID de Firebase proporcionado ha expirado.',
    'auth/id-token-revoked': 'El token de ID de Firebase ha sido revocado.',
    'auth/insufficient-permission': 'El credential utilizado para inicializar el Admin SDK no tiene permisos suficientes para acceder al recurso de autenticación solicitado.',
    'auth/internal-error': 'El servidor de autenticación encontró un error inesperado al procesar la solicitud.',
    'auth/invalid-argument': 'Se proporcionó un argumento inválido a un método de autenticación.',
    'auth/invalid-claims': 'Los atributos de claims personalizados proporcionados a setCustomUserClaims() no son válidos.',
    'auth/invalid-continue-uri': 'La URL de continuación debe ser una cadena de URL válida.',
    'auth/invalid-creation-time': 'El tiempo de creación debe ser una cadena de fecha UTC válida.',
    'auth/weak-password': 'La contraseña es demasiado débil',
    'auth/invalid-credential': 'Credenciales de inicio de sesión inválidas.',
    'auth/invalid-disabled-field': 'El valor proporcionado para la propiedad de usuario deshabilitado no es válido. Debe ser un booleano.',
    'auth/invalid-display-name': 'El valor proporcionado para displayName no es válido. Debe ser una cadena no vacía.',
    'auth/invalid-dynamic-link-domain': 'El dominio del enlace dinámico proporcionado no está configurado o autorizado para el proyecto actual.',
    'auth/invalid-email': 'El correo electrónico proporcionado no es válido. Debe ser una dirección de correo electrónico en formato válido.',
    'auth/invalid-email-verified': 'El valor de emailVerified debe ser un booleano.',
    'auth/invalid-hash-algorithm': 'El algoritmo de hash debe coincidir con uno de los algoritmos admitidos.',
    'auth/invalid-hash-block-size': 'El tamaño del bloque de hash debe ser un número válido.',
    'auth/invalid-hash-derived-key-length': 'La longitud de la clave derivada del hash debe ser un número válido.',
    'auth/invalid-hash-key': 'La clave de hash debe ser un buffer de bytes válido.',
    'auth/invalid-hash-memory-cost': 'El costo de memoria del hash debe ser un número válido.',
    'auth/invalid-hash-parallelization': 'La paralelización del hash debe ser un número válido.',
    'auth/invalid-hash-rounds': 'Las rondas de hash deben ser un número válido.',
    'auth/invalid-hash-salt-separator': 'El separador de sal del hash debe ser un buffer de bytes válido.',
    'auth/invalid-id-token': 'El token de ID proporcionado no es un token de ID de Firebase válido.',
    'auth/invalid-last-sign-in-time': 'El tiempo de último inicio de sesión debe ser una cadena de fecha UTC válida.',
    'auth/invalid-page-token': 'El token de página proporcionado en listUsers() no es válido. Debe ser una cadena no vacía.',
    'auth/invalid-password': 'La contraseña proporcionada no es válida. Debe contener al menos seis caracteres.',
    'auth/invalid-password-hash': 'El hash de la contraseña debe ser un buffer de bytes válido.',
    'auth/invalid-password-salt': 'La sal de la contraseña debe ser un buffer de bytes válido.',
    'auth/invalid-phone-number': 'El número de teléfono proporcionado no es válido. Debe ser una cadena en formato E.164.',
    'auth/invalid-photo-url': 'La URL de la foto proporcionada no es válida. Debe ser una cadena de URL.',
    'auth/invalid-provider-data': 'El providerData debe ser un array válido de objetos UserInfo.',
    'auth/invalid-provider-id': 'El providerId debe ser un identificador de proveedor válido.',
    'auth/invalid-oauth-responsetype': 'Solo exactamente un responseType de OAuth debe establecerse en true.',
    'auth/invalid-session-cookie-duration': 'La duración de la cookie de sesión debe ser un número válido en milisegundos entre 5 minutos y 2 semanas.',
    'auth/invalid-uid': 'El UID proporcionado debe ser una cadena no vacía de hasta 128 caracteres.',
    'auth/invalid-user-import': 'El registro de usuario a importar no es válido.',
    'auth/maximum-user-count-exceeded': 'Se ha excedido el número máximo permitido de usuarios a importar.',
    'auth/missing-android-pkg-name': 'Debe proporcionarse un nombre de paquete de Android si la aplicación Android es requerida.',
    'auth/missing-continue-uri': 'Debe proporcionarse una URL de continuación válida en la solicitud.',
    'auth/missing-hash-algorithm': 'Importar usuarios con hashes de contraseña requiere proporcionar el algoritmo de hash y sus parámetros.',
    'auth/missing-ios-bundle-id': 'Falta un Bundle ID en la solicitud.',
    'auth/missing-uid': 'Se requiere un identificador UID para la operación actual.',
    'auth/missing-oauth-client-secret': 'Se requiere el secreto del cliente de configuración OAuth para habilitar el flujo de código OIDC.',
    'auth/operation-not-allowed': 'El proveedor de inicio de sesión proporcionado está deshabilitado para tu proyecto de Firebase.',
    'auth/phone-number-already-exists': 'El número de teléfono proporcionado ya está en uso por otro usuario.',
    'auth/project-not-found': 'No se encontró un proyecto de Firebase para la credencial utilizada para inicializar el Admin SDK.',
    'auth/reserved-claims': 'Uno o más claims personalizados proporcionados a setCustomUserClaims() están reservados.',
    'auth/session-cookie-expired': 'La cookie de sesión de Firebase proporcionada ha expirado.',
    'auth/session-cookie-revoked': 'La cookie de sesión de Firebase ha sido revocada.',
    'auth/too-many-requests': 'El número de solicitudes excede el máximo permitido.',
    'auth/uid-already-exists': 'El UID proporcionado ya está en uso por otro usuario.',
    'auth/unauthorized-continue-uri': 'El dominio de la URL de continuación no está en la lista blanca.',
    'auth/user-not-found': 'No existe un usuario con el identificador proporcionado.'
};


// Inicializar Firebase
export function inicializarFirebase() {
    const app = initializeApp(firebaseConfig);
    window.auth = getAuth(app);
}

// Se recogen los elementos del DOM y se les annade un eventListener
export function recogerDOM() {
    let formularioLogin = document.getElementById("formularioLogin");
    let botonLogin = document.getElementById("botonLogin");
    let botonRecuperacion = document.getElementById("botonRecuperacion");
    let botonRegistro = document.getElementById("botonRegistro");


    /* Se devuelve una promesa para que al invocar la funcion se pueda hacer alguna accion de forma asincrona usando await */
    return new Promise((resolve) => {
        formularioLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            const inputEmail = document.getElementById("email");
            const inputContrasenna = document.getElementById("contrasenna");

            if (!inputEmail.value || !inputContrasenna.value) {
                console.error("No se han rellenado los dos campos de login");
                alert("Por favor rellene los dos campos de texto");
            } else {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, inputEmail.value, inputContrasenna.value);
                    alert("Datos correctos");
                    resolve(true);
                } catch (error) {
                    alert(`Datos incorrectos, vuelva a intentarlo.\n 
                        ERROR: ` + (errorMessages[error.code] === undefined ? `${error}` : `${errorMessages[error.code]}`));

                    inputContrasenna.value = "";
                    
                }   
                
            }
        });
    

        botonRecuperacion.addEventListener("click", async (e) => {
            e.preventDefault();
            const inputEmail = document.getElementById("email").value;
            
            if (!inputEmail) {
                console.error("No se han rellenado el campo email");
                alert("Por favor rellene el campo email");
            } else {
                try {
                    const userCredential = await sendPasswordResetEmail(auth, inputEmail);
                    alert("Se ha enviado un correo de recuperación al email proporcionado. Por favor siga las indicaciones del correo enviado");
                } catch (error) {
                    alert(`Datos incorrectos, vuelva a intentarlo.\n 
                        ERROR: ` + (errorMessages[error.code] === undefined ? `${error}` : `${errorMessages[error.code]}`));
                }   
            }
        });

        botonRegistro.addEventListener("click", async (e) => {
            e.preventDefault();
            const inputEmail = document.getElementById("email").value;
            const inputContrasenna = document.getElementById("contrasenna").value;

            if (!inputEmail || !inputContrasenna) {
                console.error("No se han rellenado los dos campos de login");
                alert("Por favor rellene los dos campos de texto");
            } else {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, inputEmail, inputContrasenna);
                    alert("Se ha registrado correctamente su usuario");

                    
                } catch (error) {
                    alert(`Datos incorrectos, vuelva a intentarlo.\n 
                        ERROR: ` + (errorMessages[error.code] === undefined ? `${error}` : `${errorMessages[error.code]}`));
                    }
                
            }
        });
    });
}