export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let drawTool: terra.DrawTool | null = null;

// Separate layers for different geometries
let polygonLayer: terra.PolygonLayer | null = null;
let lineLayer: terra.LineLayer | null = null;
let pointLayer: terra.PointLayer | null = null;

const currentMode = ref('polygon');

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
    center: [116.397428, 39.90923, 5000],
    zoom: 14,
    viewer: {
      antialias: true,
      polarDeg: 70,
      azimuthDeg: 0,
    },
    basemap: {
      Baselayers: [baseLayer],
      minLevel: 2,
      maxLevel: 19
    }
  });

  // Initialize Result Layers
  polygonLayer = new terra.PolygonLayer('result-polygons', { altitude: 1 });
  lineLayer = new terra.LineLayer('result-lines', { altitude: 2 });
  pointLayer = new terra.PointLayer('result-points', { altitude: 3 });

  map.addLayer(polygonLayer);
  map.addLayer(lineLayer);
  map.addLayer(pointLayer);

  // Initialize DrawTool
  drawTool = new terra.DrawTool({
    mode: 'polygon',
    geometryStyle: {
      type: 'basic-polygon',
      color: '#00ff00',
      opacity: 0.5,
      borderColor: '#FF0000',
      borderWidth: 3,
    }
  });
  
  drawTool.addTo(map);

  drawTool.on("drawend", (e: any) => {
    const feature = e.geometry;
    if (feature) {
      if (feature instanceof terra.Polygon && polygonLayer) {
        feature.addTo(polygonLayer);
      } else if ((feature instanceof terra.LineString || feature instanceof terra.Line) && lineLayer) {
        feature.addTo(lineLayer);
      } else if ((feature instanceof terra.Point || feature instanceof terra.Maker) && pointLayer) {
        feature.addTo(pointLayer);
      } else {
        if (currentMode.value === 'polygon' && polygonLayer) feature.addTo(polygonLayer);
        else if (currentMode.value === 'line' && lineLayer) feature.addTo(lineLayer);
        else if (currentMode.value === 'point' && pointLayer) feature.addTo(pointLayer);
      }
    }
  });
});

const setMode = (mode: string) => {
  currentMode.value = mode;
  if (drawTool) {
    drawTool.setMode(mode);
    
    if (mode === 'polygon') {
      drawTool.geometryStyle = {
        type: 'basic-polygon',
        color: '#00ff00',
        opacity: 0.5,
        borderColor: '#FF0000',
        borderWidth: 3,
      };
    } else if (mode === 'line') {
      drawTool.geometryStyle = {
        type: 'basic-line',
        color: '#00FFFF',
        width: 4
      };
    } else if (mode === 'point') {
      drawTool.geometryStyle = {
        type: 'basic-point',
        color: '#FFFF00',
        size: 10
      };
    }
  }
};

const clearAll = () => {
  polygonLayer?.clearLayers();
  lineLayer?.clearLayers();
  pointLayer?.clearLayers();
};

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
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-2 z-10">
      <h3 class="text-white font-bold mb-2">Draw Tool</h3>
      <div class="flex gap-2">
        <button @click="setMode('polygon')" ...>Polygon</button>
        <button @click="setMode('line')" ...>Line</button>
        <button @click="setMode('point')" ...>Point</button>
      </div>
      <button @click="clearAll" ...>Clear All</button>
    </div>
  </div>
</template>`;
