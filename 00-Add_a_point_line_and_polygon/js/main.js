require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (
  esriConfig,
  Map,
  MapView,

  Graphic,
  GraphicsLayer
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

  //Add a point graphic
  const point = {
    //Create a point
    type: "point",
    longitude: -118.80657463861,
    latitude: 34.0005930608889,
  };
  const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40], // Orange
    outline: {
      color: [255, 255, 255], // White
      width: 1,
    },
  };

  //Create and display the point (simpleMarkerSymbol)
  //Set the geometry and symbol properties for the point
  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
  });
  graphicsLayer.add(pointGraphic);

  //Create the line geometry
  const polyline = {
    type: "polyline",
    paths: [
      [-118.821527826096, 34.0139576938577], //Longitude, latitude
      [-118.814893761649, 34.0080602407843], //Longitude, latitude
      [-118.808878330345, 34.0016642996246], //Longitude, latitude
    ],
  };
  const simpleLineSymbol = {
    type: "simple-line",
    color: [226, 119, 40], // Orange
    width: 2,
  };

  //Create and display the line
  //Set geometry and symbol properties for the line

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol,
  });
  graphicsLayer.add(polylineGraphic);

  //Add the polygon geometry
  const polygon = {
    type: "polygon",
    rings: [
      [-118.818984489994, 34.0137559967283], //Longitude, latitude
      [-118.806796597377, 34.0215816298725], //Longitude, latitude
      [-118.791432890735, 34.0163883241613], //Longitude, latitude
      [-118.79596686535, 34.008564864635], //Longitude, latitude
      [-118.808558110679, 34.0035027131376], //Longitude, latitude
    ],
  };

  const simpleFillSymbol = {
    type: "simple-fill",
    color: [227, 139, 79, 0.8], // Orange, opacity 80%
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
  };

  //pop-up for the polygon
  const popupTemplate = {
    title: "{Name}",
    content: "{Description}",
  };
  const attributes = {
    Name: "Graphic",
    Description: "I am a polygon",
  };

  //Create and display the polygon
  //Set geometry and symbol properties for the polygon
  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,
    attributes: attributes,
    popupTemplate: popupTemplate
  });

  graphicsLayer.add(polygonGraphic);

  
});
