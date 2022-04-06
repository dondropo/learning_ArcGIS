require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/layers/FeatureLayer",
  "esri/widgets/Editor",
], function (esriConfig, Map, MapView, FeatureLayer, Editor) {
  // Reference a feature layer to edit
  const myPointsFeatureLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/my_points/FeatureServer/0",
  });

  esriConfig.apiKey =
    "AAPK44a5a08a323f4bf49214b599adbad3274_2i5TlzGG0wku_-TaYc6yb-LwLzZkT_4VIzOVN2NNAQ1Edh3O4MWpGarJt-4juv";

  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service

    layers: [myPointsFeatureLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80543, 34.027],
    zoom: 13,
  });

  // Editor widget
  const editor = new Editor({
    view: view,
  });
  // Add widget to the view
  view.ui.add(editor, "top-right");
});
