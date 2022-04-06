// La codificación geográfica inversa es el proceso de convertir una ubicación en una dirección o lugar.
// Esta operación requiere una ubicación inicial y devuelve una dirección con atributos como el nombre
// del lugar y la ubicación.
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/rest/locator",
], function (esriConfig, Map, MapView, locator) {
  esriConfig.apiKey =
    "AAPK44a5a08a323f4bf49214b599adbad3274_2i5TlzGG0wku_-TaYc6yb-LwLzZkT_4VIzOVN2NNAQ1Edh3O4MWpGarJt-4juv";

  // crear mapa
  const map = new Map({
    basemap: "arcgis-navigation",
  });

  // configurar ubicación inicial
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-78.50169, -0.21489],
    zoom: 12,
  });

  // URL del Geocoding Service
  const serviceUrl =
    "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  // event handler (click) para capturar la ubicación clickeada
  view.on("click", function (evt) {
    const params = {
      location: evt.mapPoint,
    };

    // Actualizar el event handler para llamar a "locationToAddress" y revertir el GeoCode del mapPoint
    //
    // la función "showAddress" muestra una ventana emergente con los resultados:
    // 1. el servicio devuelve una dirección si ésta es encontrada
    // 2. o un error si no puede encontrar un resultado.
    locator.locationToAddress(serviceUrl, params).then(
      function (response) {
        // 1
        const address = response.address;
        showAddress(address, evt.mapPoint);
      },
      function (err) {
        // 2
        showAddress("No address found.", evt.mapPoint);
      }
    );
  });

  // crear función "showAddress" para mostrar las coordenadas y la dirección correspondiente
  function showAddress(address, pt) {
    view.popup.open({
      title:
        +Math.round(pt.longitude * 100000) / 100000 +
        ", " +
        Math.round(pt.latitude * 100000) / 100000,
      content: address,
      location: pt,
    });
  }
});
