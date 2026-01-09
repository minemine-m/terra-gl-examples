<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
const logs = ref<string[]>([]);
let map: terra.Map | null = null;

const addLog = (msg: string) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()} - ${msg}`);
  if (logs.value.length > 20) logs.value.pop();
};

onMounted(() => {
  if (!mapContainer.value) return;

  const osmSource = new terra.WMTSSource({
    urlTemplate: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    minLevel: 0,
    maxLevel: 19,
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  });

  const baseLayer = new terra.WMTSTileLayer("base-layer", {
    source: osmSource,
    projection: terra.ProjectFactory.createFromID("3857", 0),
    layerName: "light-layer",
    style: "default",
    matrixSet: "EPSG:3857"
  });

  map = new terra.Map(mapContainer.value, {
    center: [116.405467, 39.907761, 2000],
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

  // Event Listeners
  map.on('click', (e: any) => {
    // e.lnglat is usually available
    const { lng, lat } = e.lnglat || {};
    addLog(`Click at: [${lng?.toFixed(4)}, ${lat?.toFixed(4)}]`);
  });

  map.on('dblclick', () => {
    addLog('Double Click');
  });

  map.on('contextmenu', () => {
    addLog('Context Menu (Right Click)');
  });

  map.on('zoomstart', () => {
    addLog('Zoom Start');
  });

  map.on('zoomend', () => {
    addLog(`Zoom End: Level ${map?.getZoom().toFixed(2)}`);
  });

  map.on('movestart', () => {
    addLog('Move Start');
  });

  map.on('moveend', () => {
    const center = map?.getCenter();
    addLog(`Move End: Center [${center?.[0].toFixed(4)}, ${center?.[1].toFixed(4)}]`);
  });
});

onBeforeUnmount(() => {
  if (map) {
    if (typeof map.dispose === 'function') {
      map.dispose();
    }
    map = null;
  }
});
</script>

<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>
    
    <!-- Log Panel -->
    <div class="absolute top-4 right-4 bg-gray-800/90 text-white p-4 rounded-lg shadow-lg w-80 max-h-[500px] overflow-hidden flex flex-col z-10 border border-gray-700">
      <h3 class="font-bold mb-2 border-b border-gray-600 pb-2">{{ $t('examples.mapEvents.panelTitle') }}</h3>
      <div class="flex-1 overflow-y-auto font-mono text-xs space-y-1">
        <div v-if="logs.length === 0" class="text-gray-500 italic">{{ $t('examples.mapEvents.placeholder') }}</div>
        <div v-for="(log, index) in logs" :key="index" class="text-gray-300">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>
