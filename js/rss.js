fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.aemet.es/documentos_d/eltiempo/prediccion/avisos/rss/CAP_AFAE_RSS.xml')
    .then(response => response.json())
    .then(data => console.log(data.items));