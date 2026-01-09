<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as terra from '@terra.gl/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let testLayer: terra.PolygonLayer | null = null;
// ... (rest of the script)opacity = ref(0.8);
const altitude = ref(100);

watch(opacity, (val) => {
  if (testLayer) testLayer.setOpacity(val);
});

watch(altitude, (val) => {
  if (testLayer) testLayer.setAltitude(val);
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
    zoom: 15,
    viewer: {
      antialias: true,
      polarDeg: 60,
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

  // Create a polygon layer
  testLayer = new terra.PolygonLayer('test-layer', { altitude: altitude.value });
  map.addLayer(testLayer);
  testLayer.setOpacity(opacity.value);

  const polygon = new terra.Polygon({
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [116.390428, 39.91423],
        [116.404428, 39.91423],
        [116.404428, 39.90423],
        [116.390428, 39.90423],
        [116.390428, 39.91423]
      ]]
    },
    style: {
      type: 'basic-polygon',
      color: '#00ff00',
      opacity: 1.0, // Base opacity, layer opacity multiplies this
      borderColor: '#ffff00',
      borderWidth: 2
    }
  });
  polygon.addTo(testLayer);
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
      <h3 class="text-white font-bold mb-4 border-b border-gray-600 pb-2">{{ t('examples.layerProperties.panelTitle') }}</h3>
      
      <div class="mb-4">
        <label class="block text-gray-400 text-sm mb-1">{{ t('examples.layerProperties.opacity') }}: {{ opacity }}</label>
        <input type="range" v-model.number="opacity" min="0" max="1" step="0.1" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
      </div>
      
      <div>
        <label class="block text-gray-400 text-sm mb-1">{{ t('examples.layerProperties.altitude') }}: {{ altitude }}m</label>
        <input type="range" v-model.number="altitude" min="0" max="1000" step="10" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
      </div>
    </div>
  </div>
</template>
