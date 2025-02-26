"use strict";

/* Esta lista es un mapa con las predicciones posibles del modelo
   La clave corresponde a la clase que puede devolver el modelo y el valor el tipo de vegetal que se ha reconocido
   Este modelo se ha descargado de Kaggle. Mas informacion sobre el modelo: https://www.kaggle.com/code/utkarshsaxenadn/vegetable-classification-resnet50v2-acc-99 
*/
const listaPredicciones = {
    0: 'Frijol', 1: 'Melón amargo', 2: 'Calabaza de botella', 3: 'Berenjena',
    4: 'Brócoli', 5: 'Repollo', 6: 'Pimiento', 7: 'Zanahoria',
    8: 'Coliflor', 9: 'Pepino', 10: 'Papaya', 11: 'Patata',
    12: 'Calabaza', 13: 'Rábano', 14: 'Tomate'
};

let usandoFrontal = true; // Alternar entre cámaras
let streamActivo = null;  // Almacenar el stream activo

// Cargar el modelo
export async function cargarModelo() {
    return await tf.loadLayersModel('./modelo/model.json');
}

// Acceder a la cámara
export async function accederCamara(video, imagenSubida) {
    /* Si ya se ha iniciado el stream de video */
    if (streamActivo) {
        streamActivo.getTracks().forEach(track => track.stop()); // Detener cámara anterior
    }

    try {
        /* Recogo los dispositivos de media del dispositivo */
        const dispositivos = await navigator.mediaDevices.enumerateDevices();
        const camaras = dispositivos.filter(device => device.kind === 'videoinput'); /* Filtro y recogo los dispositivos de recogida de video (camaras) */
        if (camaras.length > 1) {
            usandoFrontal = !usandoFrontal; // Alternar entre cámaras si hay más de una
        }

        /* Recogo el stream de la camara */
        streamActivo = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: usandoFrontal ? "user" : "environment" } // El video que se recogerá dependera de la variable usandoFrontal. Si esta igualado a true se usara la camara "user" (frontal) si esta igualado a false se usara la camara "environment" (trasera)
        });

        video.srcObject = streamActivo; // El contenido de la etiqueta video sera el stream de video que se esta recogiendo
        video.style.display = "block";  // Mostrar video
        imagenSubida.style.display = "none"; // Ocultar imagen subida si hubiese una
    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
    }
}

// Capturar un fotograma del video y procesarlo
export function capturarFotograma(canvas, video, resultado) {
    const contexto = canvas.getContext('2d'); // Se captura el contexto del canvas lo cual permite dibujar sobre el
    canvas.width = video.videoWidth; // Adapta el tamanno del canvas
    canvas.height = video.videoHeight; // Adapta el tamanno del canvas
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height); // Dibuja la imagen captura en el canvas

    /* Creo un objeto Image y le introduzco el contenido del canvas en formato URL a su src */
    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    console.log(img);
    img.onload = async () => await predecir(img, resultado); // Pasar la imagen capturada a la función de predicción cuando termine de cargarse
}


// Preprocesar la imagen antes de la predicción
export async function preprocesarImagen(imagen) {
    const imgTensor = tf.browser.fromPixels(imagen);
    const imgRedimensionada = tf.image.resizeBilinear(imgTensor, [256, 256]); // Se modifica el tamaño a 256x256 pixeles
    const imagenNormalizada = imgRedimensionada.div(tf.scalar(255));
    return imagenNormalizada.expandDims(0);
}

// Hacer la predicción con el modelo cargado. En el primer argumento se introduce la imagen a predecir y en el segundo un elemento al cual se le cambiara el textContent para mostrar el resultado en este caso una etiqueta <p>
export async function predecir(imagen, resultado) {
    const modelo = await cargarModelo(); // Se carga el modelo
    const imagenProcesada = await preprocesarImagen(imagen); // Se preprocesa la imagen
    const prediccion = modelo.predict(imagenProcesada); // Se recoge la prediccion con el modelo y se le mete como parametro la imagen preprocesada
    
    const clasePredicha = prediccion.argMax(1).dataSync()[0]; // Se recoge la clase que se ha predecido 0-14

    /* Se muestra el valor de la clave asociada en el mapa de las clases */
    console.log(listaPredicciones[clasePredicha]);
    resultado.textContent = `${listaPredicciones[clasePredicha]}`;
}
