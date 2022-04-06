// Mostrar ubicación actual
//
//La API de ArcGIS para JavaScript utiliza módulos AMD.
//La función require se usa para cargar módulos para que puedan usarse en la función principal.
//Es importante mantener las referencias del módulo y los parámetros de función en el mismo orden.
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Locate",

  "esri/widgets/Track",
  "esri/Graphic",
], function (
  esriConfig,
  Map,
  MapView,
  Locate,

  Track,
  Graphic
) {
  // referenciar mi API key
  esriConfig.apiKey =
    "AAPK44a5a08a323f4bf49214b599adbad3274_2i5TlzGG0wku_-TaYc6yb-LwLzZkT_4VIzOVN2NNAQ1Edh3O4MWpGarJt-4juv";

  // crear el mapa
  const map = new Map({
    basemap: "arcgis-navigation", // utilizar mapa base existente de arcgis, optimizado para navegación
  });

  // configurar vista para que el mapa se muestre alejado del mundo al cargar
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-40, 28],
    zoom: 2,
  });

  // Crear el Locate widget
  //
  // Este busca y hace zoom a la ubicación actual
  // El seguimiento se activa y desactiva haciendo click en el widget
  // const locate = new Locate({
  //   view: view,
  //   useHeadingEnabled: false,
  //   goToOverride: function (view, options) {
  //     // Implementar funcionalidad de zoom personalizada a escala 1500
  //     options.target.scale = 1500;
  //     return view.goTo(options.target);
  //   },
  // });
  // view.ui.add(locate, "top-left"); // Añadir widget al mapa

  // Crear el Track widget
  //
  // Este anima la vista a la ubicación actual en un intérvalo
  // luego de hacer click en él
  const track = new Track({
    view: view,
    graphic: new Graphic({
      // Crear simple marker symbol (punto) de color verde
      symbol: {
        type: "simple-marker",
        size: "12px",
        color: "green",
        outline: {
          color: "#efefef",
          width: "1.5px",
        },
      },
    }),
    useHeadingEnabled: false, // Evitar que la rotación del mapa cambie
  });

  view.ui.add(track, "top-left"); // Añadir widget al mapa
});
