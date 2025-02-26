"use strict";

const listaPredicciones = {
    0: 'Frijol', 1: 'Melón amargo', 2: 'Calabaza de botella', 3: 'Berenjena',
    4: 'Brócoli', 5: 'Repollo', 6: 'Pimiento', 7: 'Zanahoria',
    8: 'Coliflor', 9: 'Pepino', 10: 'Papaya', 11: 'Patata',
    12: 'Calabaza', 13: 'Rábano', 14: 'Tomate'
};
// Elementos del DOM
/* const video = document.getElementById('video');
const imagenSubida = document.getElementById('imagen-subida');
const capturarBtn = document.getElementById('capturar');
const cambiarCamaraBtn = document.getElementById('cambiar-camara');
const inputImagen = document.getElementById('input-imagen');
const canvas = document.createElement('canvas'); */
let usandoFrontal = true; // Alternar entre cámaras
let streamActivo = null;  // Almacenar el stream activo

// Cargar el modelo
export async function cargarModelo() {
    return await tf.loadLayersModel('./modelo/model.json');
}

// Acceder a la cámara
export async function accederCamara(video, imagenSubida) {
    console.log("accedoCa");
    if (streamActivo) {
        streamActivo.getTracks().forEach(track => track.stop()); // Detener cámara anterior
    }

    try {
        const dispositivos = await navigator.mediaDevices.enumerateDevices();
        const camaras = dispositivos.filter(device => device.kind === 'videoinput');
        if (camaras.length > 1) {
            usandoFrontal = !usandoFrontal; // Alternar entre cámaras si hay más de una
        }

        streamActivo = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: usandoFrontal ? "user" : "environment" }
        });

        video.srcObject = streamActivo;
        video.style.display = "block";  // Mostrar video
        imagenSubida.style.display = "none"; // Ocultar imagen subida
    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
    }
}

// Capturar un fotograma del video y procesarlo
export function capturarFotograma(canvas, video, resultado) {
    const contexto = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    console.log(img);
    img.onload = async () => await predecir(img, resultado); // Pasar la imagen capturada a la función de predicción
}

// Cargar imagen desde archivo


// Preprocesar la imagen antes de la predicción
export async function preprocesarImagen(imagen) {
    const imgTensor = tf.browser.fromPixels(imagen);
    const imgRedimensionada = tf.image.resizeBilinear(imgTensor, [256, 256]);
    const imagenNormalizada = imgRedimensionada.div(tf.scalar(255));
    return imagenNormalizada.expandDims(0);
}

// Hacer la predicción con el modelo cargado
export async function predecir(imagen, resultado) {
    const modelo = await cargarModelo();
    const imagenProcesada = await preprocesarImagen(imagen);
    const prediccion = modelo.predict(imagenProcesada);
    
    const clasePredicha = prediccion.argMax(1).dataSync()[0];
    console.log(listaPredicciones[clasePredicha]);
    resultado.textContent = `${listaPredicciones[clasePredicha]}`;
    /* document.getElementById('resultado').textContent = `Verdura detectada: ${listaPredicciones[clasePredicha]}`; */
}

// Eventos de los botones
/* capturarBtn.addEventListener('click', capturarFotograma);
cambiarCamaraBtn.addEventListener('click', accederCamara); */

/* // Iniciar cámara al cargar la página
accederCamara(); */
