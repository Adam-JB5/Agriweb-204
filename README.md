# AgriWeb - Plataforma de Gestión Agrícola

## Descripción

AgriWeb es una plataforma interactiva diseñada para ayudar a los agricultores en la gestión y consulta de información relevante como el estado del clima, noticias agrícolas, mapas de ubicación y reconocimiento vegetal mediante modelos preentrenados. La aplicación se basa en tecnologías web modernas e integra Firebase para la autenticación de usuarios.

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

## Autores

Desarrollado por Adam Janah

## Licencia

Este proyecto está bajo la licencia MIT. Puedes utilizarlo y modificarlo libremente.
