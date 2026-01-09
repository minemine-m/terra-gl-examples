<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;

// Preset locations
const locations = [
  { name: 'Zhengzhou', center: [113.6253, 34.7466, 2000] },
  { name: 'Beijing', center: [116.4074, 39.9042, 2000] },
  { name: 'Shanghai', center: [121.4737, 31.2304, 2000] },
  { name: 'New York', center: [-74.006, 40.7128, 2000] },
  { name: 'London', center: [-0.1278, 51.5074, 2000] },
];

const flyToCity = (loc: any) => {
  if (!map || !map.viewer) return;
  
  // Use flyToPoint for smooth transition
  map.viewer.flyToPoint({
    center: loc.center,
    distance: 50000,
    duration: 2000,
    polarDeg: 45,
    azimuthDeg: 0,
    curvePath: true // Enable curved path
  });
};

const resetView = () => {
  if (!map || !map.viewer) return;
  map.viewer.flyToPoint({
    center: [113.6253, 34.7466, 2000],
    distance: 200000,
    duration: 1500,
    polarDeg: 0,
    azimuthDeg: 0
  });
};

const rotateCamera = () => {
    if (!map || !map.viewer) return;
    // Simple rotation by adjusting azimuth
     map.viewer.flyToPoint({
        center: [113.6253, 34.7466, 2000],
        distance: 50000,
        polarDeg: 60,
        azimuthDeg: (map.viewer.controls.getAzimuthalAngle() * 180 / Math.PI) + 45
    });
}

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
    center: [113.6253, 34.7466, 2000],
    zoom: 10,
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
    
    <!-- Control Panel -->
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10 w-64 border border-gray-700">
      <h3 class="text-white font-bold mb-3 border-b border-gray-600 pb-2">Camera Controls</h3>
      
      <div class="space-y-2">
        <div class="text-gray-400 text-sm mb-1">Fly To City:</div>
        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="loc in locations" 
            :key="loc.name"
            @click="flyToCity(loc)"
            class="px-3 py-1.5 bg-gray-700 hover:bg-blue-600 text-white text-sm rounded transition-colors"
          >
            {{ loc.name }}
          </button>
        </div>
        
        <div class="mt-4 pt-2 border-t border-gray-600">
          <button @click="resetView" class="w-full mb-2 px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white text-sm rounded transition-colors">
            Reset View (Top-Down)
          </button>
           <button @click="rotateCamera" class="w-full px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white text-sm rounded transition-colors">
            Rotate 45°
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
