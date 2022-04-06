// La codificación geográfica (geocoding) es el proceso de convertir la dirección o el texto del lugar en una ubicación.
// El servicio de codificación geográfica puede buscar una dirección o un lugar y realizar una codificación
// geográfica inversa (convertir texto a coordenadas)

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/widgets/Search",
], function (esriConfig, Map, MapView, Search) {
  esriConfig.apiKey = "AAPK44a5a08a323f4bf49214b599adbad3274_2i5TlzGG0wku_-TaYc6yb-LwLzZkT_4VIzOVN2NNAQ1Edh3O4MWpGarJt-4juv";

  // crear mapa
  const map = new Map({
    basemap: "arcgis-navigation",
  });

  // configurar vista (Seattle)
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-122.3321, 47.6062],
    zoom: 12,
  });

  // Crear un widget de búsqueda. Establecer la propiedad "view" en view
  const search = new Search({
    //Add Search widget
    view: view,
  });

  view.ui.add(search, "top-right"); //Add to the map
});
