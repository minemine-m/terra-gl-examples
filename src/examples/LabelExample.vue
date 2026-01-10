<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, watch } from 'vue';
import * as terra from '@terra.gl/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let labelLayer: terra.PointLayer | null = null;
let currentLabel: terra.Label | null = null;

// Control state
const controls = reactive({
  text: 'Hello Terra-GL',
  fontSize: 24,
  textColor: '#ffffff',
  bgColor: '#3b82f6',
  showBackground: true,
  rotation: 0
});

// Watchers to update label style
watch(controls, () => {
  updateLabelStyle();
});

const updateLabelStyle = () => {
  if (!currentLabel) return;
  
  // Note: In Terra-GL, we typically update style by setStyle or creating new style object
  // Assuming setStyle is available and merges or replaces.
  // Based on standard implementation, we might need to refresh the symbol.
  
  currentLabel.setStyle({
    type: 'canvas-label-fixed',
    text: controls.text,
    fontFamily: "'Microsoft YaHei', sans-serif",
    fontWeight: 'bold',
    fontSizeDpi: 48, // Higher res for clear text
    textColor: controls.textColor,
    strokeColor: '#000000',
    strokeWidth: 2,
    showBackground: controls.showBackground,
    bgColor: controls.bgColor,
    bgOpacity: 0.8,
    roundRectRadius: 5,
    screenSpaceSize: controls.fontSize,
    rotation: controls.rotation,
    pixelOffset: [0, -30] // Offset to avoid covering the point
  } as any);
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

  // Create Layer
  labelLayer = new terra.PointLayer('label-layer');
  map.addLayer(labelLayer);

  // Create Label
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
    } as any
  });
  
  currentLabel.addTo(labelLayer);
  
  // Add a marker to show the anchor point
  const anchorMarker = new terra.Maker({
    geometry: { type: 'Point', coordinates: [116.397428, 39.90923, 0] },
    style: {
      type: 'basic-point',
      color: '#ff0000',
      size: 10
    }
  });
  anchorMarker.addTo(labelLayer);
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
    
    <!-- Control Panel -->
    <div class="absolute top-4 right-4 bg-gray-800 p-5 rounded-lg shadow-xl z-10 w-72 border border-gray-700">
      <h3 class="text-white font-bold mb-4 border-b border-gray-600 pb-2">{{ t('examples.labelExample.panelTitle') }}</h3>
      
      <div class="space-y-4">
        <!-- Text Input -->
        <div>
          <label class="block text-gray-400 text-xs mb-1">{{ t('examples.labelExample.content') }}</label>
          <input 
            v-model="controls.text" 
            type="text" 
            class="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
          >
        </div>

        <!-- Font Size -->
        <div>
          <label class="block text-gray-400 text-xs mb-1">{{ t('examples.labelExample.size') }}: {{ controls.fontSize }}px</label>
          <input 
            v-model.number="controls.fontSize" 
            type="range" 
            min="12" 
            max="64" 
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          >
        </div>

        <!-- Colors -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-gray-400 text-xs mb-1">{{ t('examples.labelExample.textColor') }}</label>
            <input v-model="controls.textColor" type="color" class="w-full h-8 bg-transparent cursor-pointer rounded">
          </div>
          <div class="flex-1">
            <label class="block text-gray-400 text-xs mb-1">{{ t('examples.labelExample.bgColor') }}</label>
            <input v-model="controls.bgColor" type="color" class="w-full h-8 bg-transparent cursor-pointer rounded">
          </div>
        </div>

        <!-- Rotation -->
         <div>
          <label class="block text-gray-400 text-xs mb-1">{{ t('examples.labelExample.rotation') }}: {{ controls.rotation }}°</label>
          <input 
            v-model.number="controls.rotation" 
            type="range" 
            min="0" 
            max="360" 
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          >
        </div>

        <!-- Toggle Background -->
        <div class="flex items-center justify-between">
          <span class="text-gray-400 text-sm">{{ t('examples.labelExample.background') }}</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="controls.showBackground" class="sr-only peer">
            <div class="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      <div class="mt-4 text-xs text-gray-500 italic">
        * Use Label class with PointLayer
      </div>
    </div>
  </div>
</template>
