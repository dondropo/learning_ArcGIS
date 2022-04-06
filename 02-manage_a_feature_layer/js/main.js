require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/Graphic",
  "esri/layers/GraphicsLayer",

  "esri/layers/FeatureLayer",
], function (
  esriConfig,
  Map,
  MapView,

  Graphic,
  GraphicsLayer,

  FeatureLayer
) {
  //Add the API key from the ArcGIS dashboard !!
  esriConfig.apiKey =
    "AAPK44a5a08a323f4bf49214b599adbad3274_2i5TlzGG0wku_-TaYc6yb-LwLzZkT_4VIzOVN2NNAQ1Edh3O4MWpGarJt-4juv";

  //Display the map
  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [-118.805, 34.027], // Longitude, latitude
    zoom: 13, // Zoom level
    container: "viewDiv", // Div element
  });

  //Add the Graphics Layer
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  //Trails-copy layer
  const trails = new FeatureLayer({
    id: "ee9b6647095646f993572249454350ad",
    url:

  });

  map.add(trails);
});
