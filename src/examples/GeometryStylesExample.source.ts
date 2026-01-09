export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, watch } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let lineLayer: terra.LineLayer | null = null;
let polygonLayer: terra.PolygonLayer | null = null;

let solidLine: terra.LineString | null = null;
let poly1: terra.Polygon | null = null;

const controls = reactive({
  lineWidth: 5,
  lineColor: '#00ffff',
  polyOpacity: 0.3,
  polyColor: '#00ff00',
  polyBorderWidth: 2
});

watch(() => controls.lineWidth, (val) => {
  if (solidLine) {
    const currentStyle = (solidLine as any)._style?.config || {};
    solidLine.setStyle({ ...currentStyle, width: val });
  }
});

watch(() => controls.lineColor, (val) => {
  if (solidLine) {
    const currentStyle = (solidLine as any)._style?.config || {};
    solidLine.setStyle({ ...currentStyle, color: val });
  }
});

watch(() => controls.polyOpacity, (val) => {
  if (poly1) {
    const currentStyle = (poly1 as any)._style?.config || {};
    poly1.setStyle({ ...currentStyle, opacity: val });
  }
});

watch(() => controls.polyColor, (val) => {
  if (poly1) {
    const currentStyle = (poly1 as any)._style?.config || {};
    poly1.setStyle({ ...currentStyle, color: val });
  }
});

watch(() => controls.polyBorderWidth, (val) => {
  if (poly1) {
    const currentStyle = (poly1 as any)._style?.config || {};
    poly1.setStyle({ ...currentStyle, borderWidth: val });
  }
});

onMounted(() => {
  if (!mapContainer.value) return;

  const osmSource = new terra.WMTSSource({
    urlTemplate: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    minLevel: 0,
    maxLevel: 19,
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  });

  const baseLayer = new terra.WMTSTileLayer("base-layer", {
    source: osmSource,
    projection: terra.ProjectFactory.createFromID("3857", 0),
    layerName: "dark-layer",
    style: "default",
    matrixSet: "EPSG:3857"
  });

  map = new terra.Map(mapContainer.value, {
    center: [116.375, 39.90, 10000],
    zoom: 13,
    viewer: {
      antialias: true,
      polarDeg: 70,
      azimuthDeg: 0,
      skybox: {
        path: "/image/skyboxall/onemap/",
        files: ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"],
        defaultColor: '#121E3A'
      }
    },
    basemap: {
      Baselayers: [baseLayer],
      minLevel: 2,
      maxLevel: 19
    }
  });

  lineLayer = new terra.LineLayer('line-layer', { altitude: 10 });
  map.addLayer(lineLayer);

  polygonLayer = new terra.PolygonLayer('polygon-layer', { altitude: 5 });
  map.addLayer(polygonLayer);

  // 1. Solid Line (Controlled)
  solidLine = new terra.LineString({
    geometry: {
      type: 'LineString',
      coordinates: [[116.35, 39.92], [116.45, 39.92]]
    },
    style: {
      type: 'basic-line',
      color: controls.lineColor,
      width: controls.lineWidth
    }
  });
  solidLine.addTo(lineLayer);

  // 2. Red Line (Static)
  const redLine = new terra.LineString({
    geometry: {
      type: 'LineString',
      coordinates: [[116.35, 39.91], [116.45, 39.91]]
    },
    style: {
      type: 'basic-line',
      color: '#ff0000',
      width: 3
    }
  });
  redLine.addTo(lineLayer);

  // 3. Transparent Polygon (Controlled)
  poly1 = new terra.Polygon({
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [116.35, 39.90], [116.37, 39.90], [116.37, 39.88], [116.35, 39.88], [116.35, 39.90]
      ]]
    },
    style: {
      type: 'basic-polygon',
      color: controls.polyColor,
      opacity: controls.polyOpacity,
      borderColor: '#ffffff',
      borderWidth: controls.polyBorderWidth
    }
  });
  poly1.addTo(polygonLayer);

  // 4. Solid Polygon (Static)
  const poly2 = new terra.Polygon({
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [116.38, 39.90], [116.40, 39.90], [116.40, 39.88], [116.38, 39.88], [116.38, 39.90]
      ]]
    },
    style: {
      type: 'basic-polygon',
      color: '#ff00ff',
      opacity: 0.8
    }
  });
  poly2.addTo(polygonLayer);
});

onBeforeUnmount(() => {
  if (map) {
    map.dispose?.();
    map = null;
  }
});
</script>

<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10 w-64 border border-gray-700">
       <!-- Controls... -->
    </div>
  </div>
</template>`;
