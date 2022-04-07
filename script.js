// A library to convert GPX data to JSON
import { gpx } from "https://unpkg.com/@tmcw/togeojson?module";

// Importing ArcGIS API bits and bobs
import Map from "esri/Map.js";
import SceneView from "esri/views/SceneView.js";
import ElevationProfile from "esri/widgets/ElevationProfile.js";
import { LineSymbol3D, LineSymbol3DLayer } from "esri/symbols.js";
import { Polyline } from "esri/geometry.js";
import ElevationProfileLineInput from "esri/widgets/ElevationProfile/ElevationProfileLineInput.js";
import Graphic from "esri/Graphic.js";
import GraphicsLayer from "esri/layers/GraphicsLayer.js";

const map = new Map({
  basemap: "satellite",
  ground: "world-elevation",
});
 
const view = new SceneView({
  map: map,
  container: "map",
  qualityProfile: "high",
  camera: {
   position: [
      168.98609855,
      -45.01302070,
      14872.53988
    ],
    heading: 304.74,
    tilt: 52.43
  },
  environment: {
    atmosphere: { quality: "high" },
  },
  ui: {
    components: ["navigation-toggle"],
  },
  popup: {
    defaultPopupTemplateEnabled: true
  }
});

const elevationProfile = new ElevationProfile({
  view,
  profiles: [
    new ElevationProfileLineInput({ color: [212, 42, 56], title: "Coronet Loop" }),
  ],
  visibleElements: {
    selectButton: false,
    sketchButton: false,
    settingsButton: false,
  },
});

view.ui.add(elevationProfile, "top-right");

(async () => {
  // read the gpx file and convert it to geojson
  const response = await fetch("./coronet.gpx");
  const gpxcontent = await response.text();
  const geojson = gpx(new DOMParser().parseFromString(gpxcontent, "text/xml"));
  const coordinates = geojson.features[0].geometry.coordinates;

  // add the track as an input for the ElevationProfile widget
  const geometry = new Polyline({
    paths: [coordinates],
    hasZ: true
  });
  elevationProfile.input = new Graphic({ geometry: geometry });

  // add the bike track layer as a graphics layer - like a template
  const bikeTrackLayer = new GraphicsLayer({
    elevationInfo: {
      mode: "on-the-ground"
    },
    listMode: "hide"
  });

const bikeTrack = new Graphic({
  geometry: geometry,
  symbol: new LineSymbol3D({
    symbolLayers: [new LineSymbol3DLayer({
      material: { color: [212, 42, 56] },
      size: 3
    })]
  })
});

bikeTrackLayer.add(bikeTrack);
map.add(bikeTrackLayer);
})();

function catchAbortError(error) {
  if (error.name != "AbortError") {
    console.error(error);
  }
}
  
document.getElementById("macetown").addEventListener("click", () => {
  view.goTo({
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
  view.goTo({
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
  view.goTo({
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