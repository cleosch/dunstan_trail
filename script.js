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
    169.21082286,
    -44.96505600,
    4425.20468
    ],
    heading: 174.85,
    tilt: 74.39
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
    new ElevationProfileLineInput({ color: [212, 42, 56], title: "Queenstown Hill Track" }),
  ],
  visibleElements: {
    selectButton: false,
    sketchButton: false,
    settingsButton: false,
  },
});

view.ui.add(elevationProfile, "top-right");

// Bringing in the Dunstan trail //

(async () => {
  // read the gpx file and convert it to geojson
  const response = await fetch("./dunstan.gpx");
  const gpxcontent = await response.text();
  const geojson = gpx(new DOMParser().parseFromString(gpxcontent, "text/xml"));
  const coordinates = geojson.features[0].geometry.coordinates;

  // add the track as an input for the ElevationProfile widget
  const geometry = new Polyline({
    paths: [coordinates],
    hasZ: true
  });
  

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

// Bringing in the QT Hill fake track //

(async () => {
  // read the gpx file and convert it to geojson
  const response = await fetch("./QT_Hill.gpx");
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
  const QTHill_TrackLayer = new GraphicsLayer({
    elevationInfo: {
      mode: "on-the-ground"
    },
    listMode: "hide"
  });

const QTHill_Track = new Graphic({
  geometry: geometry,
  symbol: new LineSymbol3D({
    symbolLayers: [new LineSymbol3DLayer({
      material: { color: [212, 42, 56] },
      size: 3
    })]
  })
});

QTHill_TrackLayer.add(QTHill_Track);
map.add(QTHill_TrackLayer);
})();



function catchAbortError(error) {
  if (error.name != "AbortError") {
    console.error(error);
  }
}
  
document.getElementById("cromwell").addEventListener("click", () => {
  view.goTo({
    position: {
      x: 169.19430133,
      y: -45.03236837,
      z: 1286.55564,
      spatialReference: {
          wkid: 4326
        }
      },
    heading: 156.77,
    tilt: 57.58
  },
  )
  .catch(catchAbortError);
});
  
document.getElementById("bannockburn").addEventListener("click", () => {
  view.goTo({
    position: {
      x: 169.15415923,
      y: -45.08907512,
      z: 692.06038,
      spatialReference: {
        wkid: 4326
        }
      },
      heading: 49.1,
      tilt: 78.81
    },
    )
    .catch(catchAbortError);
  });
  
document.getElementById("cafe").addEventListener("click", () => {
  view.goTo({
    position: {
      x: 169.23244220,
      y: -45.07347919,
      z: 432.20890,
      spatialReference: {
        wkid: 4326
      }
    },
    heading: 172.25,
    tilt: 76.83
  },
)
.catch(catchAbortError);
});
    
document.getElementById("towards_clyde").addEventListener("click", () => {
  view
    .goTo(
      {
        position: {
          x: 169.31309519,
          y: -45.0850890,
          z: 1563.11004,
          spatialReference: {
            wkid: 4326
          }
        },
        heading: 190.51,
        tilt: 72.82
      },
    )
    .catch(catchAbortError);
});
  
  
document.getElementById("clyde").addEventListener("click", () => {
  view
    .goTo(
      {
        position: {
          x: 169.33953821,
          y: -45.20766551,
          z: 984.67280,
          spatialReference: {
            wkid: 4326
          }
        },
        heading: 324.25,
        tilt: 76.82
      },
    )
    .catch(catchAbortError);
});

document.getElementById("qt_hill").addEventListener("click", () => {
  view
    .goTo(
      {
        position: {
          x: 168.67864017,
          y: -45.04865652,
          z: 1145.61459,
          spatialReference: {
            wkid: 4326
          }
        },
        heading: 353.60,
        tilt: 79.45
      },
    )
    .catch(catchAbortError);
});