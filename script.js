// A library to convert GPX data to JSON
import { gpx } from "https://unpkg.com/@tmcw/togeojson?module";

// Importing ArcGIS API bits and bobs
import ArcGISWebScene from '@arcgis/core/WebScene';
import SceneView from '@arcgis/core/views/SceneView';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import request from '@arcgis/core/request';
import ElevationProfile from "@arcgis/core/widgets/ElevationProfile";
import Basemap from "@arcgis/core/Basemap";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import { tcx } from "@tmcw/togeojson";
import "./index.css";

const lightBlue = [129, 175, 214]
const lightBrown = [161, 136, 119];
const orange = [245, 173, 66];

const miniMap = new ArcGISMap({
  basemap: new Basemap({
    baseLayers: [
      new TileLayer({
        portalItem: {
          id: "1b243539f4514b6ba35e7d995890db1d" // world hillshade
        },
        opacity: 0.4
      }),
      new VectorTileLayer({
        portalItem:{
          id: "378fd91096fe478cb78a4e06b639b715"
        },
        blendMode: "multiply"
     })
    ]
  })
});

new MapView({
  container: "miniMap",
  map: miniMap,
  center: [172.68010648, -42.47741997],
  zoom: 6,
  ui: {
    components: []
  }
});

const citiesLayer = new FeatureLayer({
  url: "https://services8.arcgis.com/AYGZtmUtpARUKBlB/arcgis/rest/services/Te_Reo_M%C4%81ori_Place_Names/FeatureServer",
  definitionExpression: "name IN ('Christchurch', 'Kaikoura', 'Greymouth', 'Hokitika', 'Punakaiki')",
  renderer: {
    type: "unique-value",
    field: "name_mi",
    defaultSymbol: {
      type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
      style: "circle",
      color: [150, 150, 150],
      size: "8px",  // pixels
      outline: {
        width: 0  // points
      }
    },
  },
  labelingInfo: [
    new LabelClass({
      labelExpressionInfo: { expression: "$feature.name_mi"},
      labelPlacement: "above-center",
      symbol: {
        type: "text",
        color: [100, 100, 100],
        haloSize: 1,
        haloColor: [255, 255, 255, 0.9]
      }
    })
  ]
});

miniMap.add(citiesLayer);