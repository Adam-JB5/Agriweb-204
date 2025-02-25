"use strict";

const listaPredicciones = {
    0: 'Bean',
    1: 'Bitter_Gourd',
    2: 'Bottle_Gourd',
    3: 'Brinjal',
    4: 'Broccoli',
    5: 'Cabbage',
    6: 'Capsicum',
    7: 'Carrot',
    8: 'Cauliflower',
    9: 'Cucumber',
    10: 'Papaya',
    11: 'Potato',
    12: 'Pumpkin',
    13: 'Radish',
    14: 'Tomato'
  };




// Cargar el modelo desde los archivos JSON y binarios
async function cargarModelo() {
    const modelo = await tf.loadLayersModel('./modelo/model.json');
    return modelo;
}

// Preprocesar la imagen antes de hacer la predicción
async function preprocesarImagen(imagen) {
    const imgTensor = tf.browser.fromPixels(imagen);
    const imgRedimensionada = tf.image.resizeBilinear(imgTensor, [256, 256]); // Ajusta según sea necesario
    const imagenNormalizada = imgRedimensionada.div(tf.scalar(255)); // Normalización
    return imagenNormalizada.expandDims(0); // Añadir dimensión extra para la predicción
}

/* // Mostrar los resultados de la predicción en la página
function mostrarResultado(prediccion) {
    // Suponiendo que el modelo devuelve una probabilidad para cada clase
    const clasePredicha = prediccion.argMax(1).dataSync()[0];
    console.log('Clase predicha:', clasePredicha);
    
    // Mostrar la clase predicha en la página
    document.getElementById('resultado').textContent = `Clase predicha: ${clasePredicha}`;
} */

// Hacer la predicción usando el modelo cargado
async function predecir(imagen) {
    const modelo = await cargarModelo();
    const imagenProcesada = await preprocesarImagen(imagen);
    const prediccion = await modelo.predict(imagenProcesada);
    /* mostrarResultado(prediccion); */
    return prediccion;
}

// Detectar cuando el usuario selecciona una imagen y hacer la predicción
document.getElementById('input-imagen').addEventListener('change', (event) => {
    const archivo = event.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(archivo);
    img.onload = () => {
        predecir(img);  // Llamar a la función de predicción
    };
});
