// A library to convert GPX data to JSON
import { gpx } from "https://unpkg.com/@tmcw/togeojson?module";

// Importing ArcGIS API bits and bobs
import EsriMap from "esri/Map.js";
import SceneView from "esri/views/SceneView.js";
import ElevationProfile from "esri/widgets/ElevationProfile.js";
import { LineSymbol3D, LineSymbol3DLayer, PointSymbol3D, IconSymbol3DLayer } from "esri/symbols.js";
import { Polyline, Point } from "esri/geometry.js";
import ElevationProfileLineInput from "esri/widgets/ElevationProfile/ElevationProfileLineInput.js";
import Graphic from "esri/Graphic.js";
import GraphicsLayer from "esri/layers/GraphicsLayer.js";

const map = new EsriMap({
  basemap: "satellite",
  ground: "world-elevation",
});

const view = new SceneView({
  map: map,
  container: "viewDiv",
  qualityProfile: "high",
  camera: {
    position: [
      171.50188356,
      -42.24462024,
      109734.53680
    ],
    heading: 358.85,
    tilt: 0.49
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
  container: "profile",
  profiles: [
    new ElevationProfileLineInput({ color: [212, 42, 56], title: "Paparoa Track" }),
  ],
  visibleElements: {
    selectButton: false,
    sketchButton: false,
    settingsButton: false,
  },
});

(async () => {
  // read the gpx file and convert it to geojson
  const response = await fetch("./paparoa.gpx");
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

const inset_map = new EsriMap({
  basemap: "streets-relief-vector",
});

new MapView({
  map: inset_map,
  container: "miniMap",
  center: [172.44994752,
    -42.46085216],
  zoom: 5,
  ui: {
    components: []
  }
});

const viewpoints = {
  christchurch: {
    position: [
      7.66371179,
      46.50680737,
      1944.91065
    ],
    heading: 153.80,
    tilt: 66.63
  },
  punakaiki: {
    position: [
      7.66950766,
      46.48476542,
      1570.19567
    ],
    heading: 207.12,
    tilt: 75.00
  },
  porarari: {
    position: [
      7.65150784,
      46.45879114,
      1954.86814
    ],
    heading: 219.39,
    tilt: 77.12
  },
  moonlight: {
    position: [
      7.63867205,
      46.44178047,
      2829.83936
    ],
    heading: 221.31,
    tilt: 66.06
  }
}


const viewpointBtns = document.getElementsByClassName("viewpointBtn");

for (let i = 0; i < viewpointBtns.length; i++) {
  const elem = viewpointBtns.item(i);
  elem.addEventListener("click", function(event) {
    view.goTo(viewpoints[event.target.dataset.value]);
  });
}