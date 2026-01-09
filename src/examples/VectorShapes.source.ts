export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;

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
    center: [116.397428, 39.90923, 2000],
    zoom: 14,
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

  

  // 1. Polygon Layer
  const polygonLayer = new terra.PolygonLayer('polygon-layer', { altitude: 10 });
  map.addLayer(polygonLayer);

  // Define a polygon
  const forbiddenCityCoords = [[
    [116.390428, 39.91423],
    [116.404428, 39.91423],
    [116.404428, 39.90423],
    [116.390428, 39.90423],
    [116.390428, 39.91423]
  ]];

  const polygon = new terra.Polygon({
    geometry: {
      type: 'Polygon',
      coordinates: forbiddenCityCoords
    },
    style: {
      type: 'basic-polygon',
      color: '#FF0000',
      opacity: 0.5,
      borderColor: '#FFFF00',
      borderWidth: 2,
    }
  });
  polygon.addTo(polygonLayer);

  // 2. Line Layer
  const lineLayer = new terra.LineLayer('line-layer', { altitude: 20 });
  map.addLayer(lineLayer);

  // Define a line
  const axisLine = [
    [116.397428, 39.88],
    [116.397428, 39.94]
  ];

  const line = new terra.LineString({
    geometry: {
      type: 'LineString',
      coordinates: axisLine
    },
    style: {
      type: 'basic-line',
      color: '#00FFFF',
      width: 4
    }
  });
  line.addTo(lineLayer);
});

onBeforeUnmount(() => {
  if (map) {
    map.dispose?.();
    map = null;
  }
});
</script>

<template>
  <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>
</template>`;
