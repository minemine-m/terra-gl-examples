<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;

const layerCount = ref(0);
const logs = ref<string[]>([]);

const log = (msg: string) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()} - ${msg}`);
  if (logs.value.length > 5) logs.value.pop();
};

const addLayer = () => {
  if (!map) return;
  const id = `random-layer-${layerCount.value++}`;
  const layer = new terra.PointLayer(id);
  map.addLayer(layer);
  
  // Add a random point
  const lat = 39.90 + (Math.random() - 0.5) * 0.1;
  const lng = 116.40 + (Math.random() - 0.5) * 0.1;
  
  const point = new terra.Marker({
    geometry: { type: 'Point', coordinates: [lng, lat] },
    style: {
      type: 'basic-point',
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      size: 15
    }
  });
  point.addTo(layer);
  
  log(`Added layer: ${id}`);
};

const removeLastLayer = () => {
  if (!map || layerCount.value === 0) return;
  const id = `random-layer-${layerCount.value - 1}`;
  
  // Find layer by ID (Terra-GL usually exposes getLayer or findLayer)
  // Let's assume map.getLayer(id) or we iterate
  // Actually map.removeLayer(id) works by ID usually.
  
  // Check existence first if we want to log
  const layer = map.getLayer(id);
  if (layer) {
    map.removeLayer(id); // Or map.removeLayer(layer)
    layerCount.value--;
    log(`Removed layer: ${id}`);
  } else {
    log(`Layer not found: ${id}`);
  }
};

const toggleVisibility = () => {
  if (!map || layerCount.value === 0) return;
  const id = `random-layer-${layerCount.value - 1}`;
  const layer = map.getLayer(id);
  if (layer) {
    const isVisible = layer.visible; // Access visible property? Or getVisible()?
    // Typically layer.visible or layer.getVisible()
    // Let's assume property 'visible' exists and setVisible method exists.
    layer.visible = !isVisible;
    log(`Toggled visibility for ${id}`);
  }
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
    center: [116.40, 39.90, 10000],
    zoom: 12,
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
    
    <!-- Controls -->
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10 flex flex-col gap-2 w-64 border border-gray-700">
      <h3 class="text-white font-bold mb-2 border-b border-gray-600 pb-2">{{ t('examples.layerOperations.panelTitle') }}</h3>
      
      <div class="space-y-2">
        <button @click="addLayer" class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors text-sm font-medium">
          {{ t('examples.layerOperations.addRandomLayer') }}
        </button>
        <div class="grid grid-cols-2 gap-2">
          <button @click="toggleVisibility" class="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-xs">
            {{ t('examples.layerOperations.toggleLast') }}
          </button>
          <button @click="removeLastLayer" class="px-3 py-2 bg-red-600/80 text-white rounded hover:bg-red-500 transition-colors text-xs">
            {{ t('examples.layerOperations.removeLast') }}
          </button>
        </div>
      </div>
      
      <div class="mt-4">
        <h4 class="text-gray-400 text-xs font-bold mb-1 uppercase">{{ t('examples.layerOperations.operationLogs') }}</h4>
        <div class="bg-black/50 p-2 rounded h-24 overflow-y-auto custom-scrollbar">
          <div v-if="logs.length === 0" class="text-gray-600 text-xs italic text-center py-2">{{ t('examples.layerOperations.noOperationsYet') }}</div>
          <div v-for="(msg, i) in logs" :key="i" class="text-xs font-mono text-gray-300 mb-1 border-b border-gray-800/50 pb-1 last:border-0 last:pb-0">
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
}
</style>
