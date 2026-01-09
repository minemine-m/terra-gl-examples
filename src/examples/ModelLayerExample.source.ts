export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, watch } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let duckModel: terra.Model | null = null;
let cesiumMan: terra.Model | null = null;

const controls = reactive({
  duckScale: 100,
  duckRotation: 0,
  manScale: 10,
  manRotation: 0
});

watch(() => controls.duckScale, (val) => {
  if (duckModel) {
    const currentStyle = (duckModel as any)._style?.config || {};
    duckModel.setStyle({ ...currentStyle, scale: val });
  }
});

watch(() => controls.duckRotation, (val) => {
  if (duckModel) {
    const currentStyle = (duckModel as any)._style?.config || {};
    duckModel.setStyle({ ...currentStyle, rotate: [90, val, 0] });
  }
});

watch(() => controls.manScale, (val) => {
  if (cesiumMan) {
    const currentStyle = (cesiumMan as any)._style?.config || {};
    cesiumMan.setStyle({ ...currentStyle, scale: val });
  }
});

watch(() => controls.manRotation, (val) => {
  if (cesiumMan) {
    const currentStyle = (cesiumMan as any)._style?.config || {};
    cesiumMan.setStyle({ ...currentStyle, rotate: [90, val, 0] });
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
    center: [116.397428, 39.90923, 2000],
    zoom: 16,
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

  // Model Layer
  const modelLayer = new terra.PointLayer('model-layer');
  map.addLayer(modelLayer);

  // 1. Duck
  duckModel = new terra.Model({
    geometry: { 
      type: 'Point', 
      coordinates: [116.397428, 39.90923, 0] 
    },
    style: {
      url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
      scale: controls.duckScale,
      rotate: [90, 0, 0]
    },
    userData: { name: 'Duck Model' }
  });
  duckModel.addTo(modelLayer);
  
  // 2. Cesium Man
  cesiumMan = new terra.Model({
    geometry: { 
      type: 'Point', 
      coordinates: [116.398428, 39.90923, 0]
    },
    style: {
      url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb',
      scale: controls.manScale,
      rotate: [90, 0, 0]
    }
  });
  cesiumMan.addTo(modelLayer);
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
      <h3 class="text-white font-bold mb-4 border-b border-gray-600 pb-2">Model Controls</h3>
      
      <!-- Duck Controls -->
      <div class="mb-6">
        <h4 class="text-yellow-400 font-bold text-sm mb-2">Duck Model</h4>
        <div class="mb-2">
          <label class="block text-gray-400 text-xs mb-1">Scale: {{ controls.duckScale }}</label>
          <input v-model.number="controls.duckScale" type="range" min="10" max="300" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
        </div>
        <div>
          <label class="block text-gray-400 text-xs mb-1">Rotation: {{ controls.duckRotation }}°</label>
          <input v-model.number="controls.duckRotation" type="range" min="0" max="360" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
        </div>
      </div>

      <!-- Cesium Man Controls -->
      <div>
        <h4 class="text-blue-400 font-bold text-sm mb-2">Cesium Man</h4>
        <div class="mb-2">
          <label class="block text-gray-400 text-xs mb-1">Scale: {{ controls.manScale }}</label>
          <input v-model.number="controls.manScale" type="range" min="1" max="50" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
        </div>
        <div>
          <label class="block text-gray-400 text-xs mb-1">Rotation: {{ controls.manRotation }}°</label>
          <input v-model.number="controls.manRotation" type="range" min="0" max="360" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
        </div>
      </div>
    </div>
  </div>
</template>`;
