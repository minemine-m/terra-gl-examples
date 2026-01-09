export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, watch } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let labelLayer: terra.PointLayer | null = null;
let currentLabel: terra.Label | null = null;

const controls = reactive({
  text: 'Hello Terra-GL',
  fontSize: 24,
  textColor: '#ffffff',
  bgColor: '#3b82f6',
  showBackground: true,
  rotation: 0
});

watch(controls, () => {
  updateLabelStyle();
});

const updateLabelStyle = () => {
  if (!currentLabel) return;
  
  currentLabel.setStyle({
    type: 'canvas-label-fixed',
    text: controls.text,
    fontFamily: "'Microsoft YaHei', sans-serif",
    fontWeight: 'bold',
    fontSizeDpi: 48,
    textColor: controls.textColor,
    strokeColor: '#000000',
    strokeWidth: 2,
    showBackground: controls.showBackground,
    bgColor: controls.bgColor,
    bgOpacity: 0.8,
    roundRectRadius: 5,
    screenSpaceSize: controls.fontSize,
    rotation: controls.rotation,
    pixelOffset: [0, -30]
  });
};

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

  labelLayer = new terra.PointLayer('label-layer');
  map.addLayer(labelLayer);

  currentLabel = new terra.Label({
    geometry: {
      type: 'Point',
      coordinates: [116.397428, 39.90923, 0]
    },
    style: {
      type: 'canvas-label-fixed',
      text: controls.text,
      fontFamily: "Arial",
      fontWeight: 'bold',
      fontSizeDpi: 48,
      textColor: controls.textColor,
      strokeColor: '#000000',
      strokeWidth: 2,
      showBackground: controls.showBackground,
      bgColor: controls.bgColor,
      bgOpacity: 0.8,
      roundRectRadius: 5,
      screenSpaceSize: controls.fontSize,
      pixelOffset: [0, -30]
    }
  });
  
  currentLabel.addTo(labelLayer);
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
    <div class="absolute top-4 right-4 bg-gray-800 p-5 rounded-lg shadow-xl z-10 w-72 border border-gray-700">
       <!-- Controls ... -->
    </div>
  </div>
</template>`;
