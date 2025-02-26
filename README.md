# AgriWeb - Plataforma de Gestión Agrícola

## Descripción

AgriWeb es una plataforma interactiva diseñada para ayudar a los agricultores en la gestión y consulta de información relevante como el estado del clima, noticias agrícolas, mapas de ubicación y reconocimiento vegetal mediante modelos preentrenados. La aplicación se basa en tecnologías web modernas e integra Firebase para la autenticación de usuarios.

## Estructura del proyecto

```
├── index.html          # Archivo principal de la web
├── css/                # Hojas de estilo
│   ├── menu.css        # Estilos del menú
│   ├── style.css       # Estilos generales
├── js/                 # Archivos JavaScript
│   ├── app.js          # Lógica principal de la aplicación
│   ├── auth.js         # Manejo de autenticación de usuarios
│   ├── jquery-1.9.0.js # Biblioteca jQuery
│   ├── maps.js         # Funcionalidades de mapas
│   ├── meteo.js        # Información meteorológica
│   ├── rss.js          # Integración con feeds RSS
│   ├── tables.js       # Creacion de tabla con DataTables
│   ├── tensorflow.js   # Procesamiento de imágenes para modelo de reconocimiento
├── modelo/             # Modelo de reconocimiento
│   ├── model.json      # Almacena y guarda información de las clases
│   ├── file1of23.bin   # Almacena la información que se procesa
│   ├── file2of23.bin   # Almacena la información que se procesa
│   ├── ...........
├── assets/             # Archivos adicionales como fuentes, imágenes, etc.
│   ├── fonts/          # Fuentes de texto
│   ├── images/         # Imágenes (Logo, fondo, etc.)
├── docs/               # Documentación del proyecto
│   ├── DiagramaDeFlujo.pdf          # Diagrama de flujo del programa
```

## Funcionalidades

  - Autenticación de usuarios mediante Firebase Authentication.

  - Visualización de avisos y noticias en formato RSS.

  - Navegación entre secciones dentro de la aplicación.

  - Información meteorológica con integración de DataTables para visualización de datos.

  - Mapas interactivos para ubicación y consulta de datos geoespaciales.

  - Reconocimiento de 15 tipos de vegetales utilizando TensorFlow.js para analizar imágenes subidas o capturadas en tiempo real.

## Instalación y Configuración

### Requisitos previos

  - Un servidor web local o servicio de alojamiento web.

  - Un proyecto en Firebase con la configuración adecuada para la autenticación.

### Pasos de instalación

#### Uso local

1. Clonar el repositorio:
  ```
  git clone https://github.com/tu-repo/agriweb.git
  ```
2. Configurar Firebase:

  - Crear un proyecto en Firebase.

  - Copiar las credenciales de configuración en el archivo firebaseConfig dentro del código.

3. Servir la aplicación localmente:

  - Usar un servidor web como XAMPP o servir el proyecto con Live Server en VS Code.


#### Uso desde hosting

1. Acceder al enlace de [hosting de Github](https://adam-jb5.github.io/Agriweb-204/)

## Uso

1. Iniciar sesión/Registrarse con credenciales de usuario.

2. Consultar noticias y avisos agrícolas en la interfaz principal (Sección 1).

3. Explorar mapas interactivos en la sección de geolocalización (Sección 2).

4. Analizar el clima presionando el botón de consulta meteorológica (Sección 3).

5. Realizar reconocimiento de plantas subiendo imágenes o utilizando la cámara tanto de un dispositivo de escritorio como ambas cámaras de un dispositivo móvil (Sección 4).
     - Plantas reconocibles:
        <details>
          <summary>Ver lista de vegetales</summary>
        
          - Frijol
          - Melón amargo
          - Calabaza de botella
          - Berenjena
          - Brócoli
          - Repollo
          - Pimiento
          - Zanahoria
          - Coliflor
          - Pepino
          - Papaya
          - Patata
          - Calabaza
          - Rábano
          - Tomate
        
        </details>

## Tecnologías Utilizadas

  - HTML, CSS, JavaScript (Frontend y lógica de interacción)

  - Feed RSS y [RSS2JSON](https://rss2json.com/#rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F) (Noticias en formato XML, y transformador a formato JSON)

  - [Animate.css](https://animate.style) (Animaciones predefinidas)

  - Firebase (Autenticación y backend en la nube)

  - TensorFlow.js (Reconocimiento de imágenes con [modelo preentrenado](https://www.kaggle.com/code/utkarshsaxenadn/vegetable-classification-resnet50v2-acc-99))

  - Leaflet.js (Mapa interactivo)

  - OpenMeteo (Recogida de datos meteorológicos)

  - DataTables.js (Manejo de tablas dinámicas con información meteorológica)

## Dificultades y problemas encontrados
- Peticiones RSS a noticias y avisos
    - Las noticias cuentan con un propiedad thumbnail que contiene un enlace con una imagen correspondiente a la noticias, esta imagen la uso como fondo para las noticias. Es posible que a veces el fondo de estas noticias no se muestre debido a que el servidor puede rechazar las peticiones a estas imágenes. No sé porque puede pasar pero es posible que haga esto por una sobrecarga de peticiones desde una misma dirección.
        - Noticia con fondo: ![image](https://github.com/user-attachments/assets/a7595432-a5e4-44b3-9580-05489d044048)

        - Noticia sin fondo: ![image](https://github.com/user-attachments/assets/f301a2b0-d6af-44e9-9611-a0f245fa561c)

- Modelo de reconocimiento de imágenes
    - El modelo que he encontrado es un modelo preentrenado que tan solo reconoce 15 clases, es decir, 15 vegetales distintos.
    - El modelo se puede descargar en formato .h5 el cuál es un formato de almacenamiento de datos masivo de Keras, pero este tipo de archivos debe convertirse antes a un modelo compatible con TensorflowJS. Por lo que he tenido que instalar Python en mi equipo y ejecutar un programa .py el cual pudo convertir el archivo .h5 a un archivo .json y archivos binarios. Al hacer esto siempre me daba problemas al encontrar y descargar paquetes y dependiencias por lo que abrí una MV de Linux en la que instale Python y las dependencias necesarias para después ejecutar el script que convertiría el archivo .h5 a archivos compatibles con TensorflowJS. Aquí dejo el script que he usado:
```
import tensorflow as tf
import json

# Cargar el modelo desde el archivo .h5
modelo = tf.keras.models.load_model('ResNet50V2-Vegetable-Classifier.h5')

# Verificar la arquitectura cargada
modelo.summary()

# Guardar la arquitectura del modelo en formato JSON
modelo_json = modelo.to_json()
with open("modelo.json", "w") as json_file:
    json.dump(modelo_json, json_file)

# Guardar los pesos del modelo en formato binario (.h5)
modelo.save_weights("modelo_pesos.weights.h5")

# Opcional: Guardar el modelo completo en formato .h5
modelo.save("modelo_completo.h5")
```

## Autores

Desarrollado por Adam Janah

## Licencia

Este proyecto está bajo la licencia MIT. Puedes utilizarlo y modificarlo libremente.
