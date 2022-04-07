// A library to convert GPX data to JSON
import { gpx } from "https://unpkg.com/@tmcw/togeojson?module";

// Importing ArcGIS API bits and bobs
require(["esri/views/SceneView", "esri/Map"], function (SceneView, Map) {

  var map_pls = new Map({
  basemap: "satellite",
  ground: "world-elevation",
});
 
  var view = new SceneView({
    map: map_pls,
    container: "map", 
    camera: {
   position: [
      168.98609855,
      -45.01302070,
      14872.53988
    ],
    heading: 304.74,
    tilt: 52.43
  },
  });
  
          function catchAbortError(error) {
          if (error.name != "AbortError") {
            console.error(error);
          }
        }
  
  document.getElementById("macetown").addEventListener("click", () => {
          view
            .goTo(
              {
                position: {
                  x: 168.87633904,
                  y: -44.83948228,
                  z: 5177.04182,
                  spatialReference: {
                    wkid: 4326
                  }
                },
                heading: 200.35,
                tilt: 55.19
              },
            )
            .catch(catchAbortError);
        });
  
  document.getElementById("back").addEventListener("click", () => {
          view
            .goTo(
              {
                position: {
                  x: 168.76724954,
                  y: -44.85663036,
                  z: 6393.75519,
                  spatialReference: {
                    wkid: 4326
                  }
                },
                heading: 146.36,
                tilt: 43.25
              },
            )
            .catch(catchAbortError);
        });
  
  document.getElementById("skippers").addEventListener("click", () => {
          view
            .goTo(
              {
                position: {
                  x: 168.55147406,
                  y: -44.88119739,
                  z: 8133.16600,
                  spatialReference: {
                    wkid: 4326
                  }
                },
                heading: 114.64,
                tilt: 56.49
              },
            )
            .catch(catchAbortError);
        });
    
  document.getElementById("coronet").addEventListener("click", () => {
          view
            .goTo(
              {
                position: {
                  x: 168.73441229,
                  y: -44.99226340,
                  z: 5620.77873,
                  spatialReference: {
                    wkid: 4326
                  }
                },
                heading: 2.07,
                tilt: 58.51
              },
            )
            .catch(catchAbortError);
        });
  
  
   document.getElementById("bush_gully").addEventListener("click", () => {
          view
            .goTo(
              {
                position: {
                  x: 168.72293973,
                  y: -44.93566277,
                  z: 2880.32082,
                  spatialReference: {
                    wkid: 4326
                  }
                },
                heading: 84.36,
                tilt: 65.51
              },
            )
            .catch(catchAbortError);
        });
  
   document.getElementById("arrowtown").addEventListener("click", () => {
          view
            .goTo(
              {
                position: {
                  x: 168.84206698,
                  y: -44.96918298,
                  z: 1961.40883,
                  spatialReference: {
                    wkid: 4326
                  }
                },
                heading: 341.10,
                tilt: 67.85
              },
            )
            .catch(catchAbortError);
        });
  
});