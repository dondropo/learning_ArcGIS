require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/rest/locator",
  "esri/Graphic",
], function (esriConfig, Map, MapView, locator, Graphic) {
  esriConfig.apiKey =
    "AAPK44a5a08a323f4bf49214b599adbad3274_2i5TlzGG0wku_-TaYc6yb-LwLzZkT_4VIzOVN2NNAQ1Edh3O4MWpGarJt-4juv";

  // crear mapa
  const map = new Map({
    basemap: "arcgis-navigation",
  });

  // configurar ubicación inicial del mapa
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [18.9553, 69.6492], //Longitude, latitude
    zoom: 13,
  });
  // crear un arreglo con categorias para seleccionar
  const places = [
    "Choose a place type...",
    "Parks and Outdoors",
    "Coffee shop",
    "Gas station",
    "Food",
    "Hotel",
  ];
  // elemento HTML de selección principal para asignar las categorias de búsqueda
  const select = document.createElement("select", "");
  select.setAttribute("class", "esri-widget esri-select");
  select.setAttribute(
    "style",
    "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em"
  );
  // elemento de opción para cada categoria
  places.forEach(function (p) {
    const option = document.createElement("option");
    option.value = p;
    option.innerHTML = p;
    select.appendChild(option);
  });

  view.ui.add(select, "top-right"); // añadir elemento de selección al mapa

  // alojar URL del servicio de Geocoding en la variable "locatorUrl"
  const locatorUrl =
    "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  // encontrar lugares y añadirlos al mapa
  function findPlaces(category, pt) {
    locator
      .addressToLocations(locatorUrl, {
        // realizar un llamado a "addressToLocations" para establecer la ubicación, categorias y las propiedades de outfields
        location: pt,
        categories: [category],
        maxLocations: 25,
        outFields: ["Place_addr", "PlaceName"],
      })

      .then(function (results) {
        // limpiar la vista de gráficos y ventanas emergentes existentes
        view.popup.close();
        view.graphics.removeAll();

        results.forEach(function (result) {
          // crear gráfico para cada resultado devuelto, estableciendo atributos, geometría, el simbolo y las propiedades popupTemplate para cada uno

          view.graphics.add(
            // se agrega cada gráfico a la vista
            new Graphic({
              attributes: result.attributes, // Data attributes returned
              geometry: result.location, // Point returned
              symbol: {
                type: "simple-marker",
                color: "#000000",
                size: "12px",
                outline: {
                  color: "#ffffff",
                  width: "2px",
                },
              },

              popupTemplate: {
                title: "{PlaceName}", // Data attribute names
                content: "{Place_addr}",
              },
            })
          );
        });
      });
  }

  // Llamar a la función "findPlaces" cuando la vista se cargue y cada vez que ésta cambie y se vuelva estacionaria
  view.watch("stationary", function (val) {
    if (val) {
      findPlaces(select.value, view.center);
    }
  });

  // event handler (listener) que llama a "findPlaces" cuando se selecciona otra categoria
  select.addEventListener("change", function (event) {
    findPlaces(event.target.value, view.center);
  });
});
