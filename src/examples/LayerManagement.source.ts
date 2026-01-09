export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let osmLayer: terra.WMTSTileLayer | null = null;
let satelliteLayer: terra.WMTSTileLayer | null = null;

const layerState = ref({
  osm: { visible: true, opacity: 1.0 },
  satellite: { visible: false, opacity: 1.0 }
});

const toggleLayer = (layerName: 'osm' | 'satellite') => {
  if (!map) return;
  
  const layer = layerName === 'osm' ? osmLayer : satelliteLayer;
  if (layer) {
    layerState.value[layerName].visible = !layerState.value[layerName].visible;
    layer.visible = layerState.value[layerName].visible;
  }
};

onMounted(() => {
  if (!mapContainer.value) return;

  // OSM Layer
  const osmSource = new terra.WMTSSource({
    urlTemplate: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    minLevel: 0,
    maxLevel: 19,
    attribution: "Dark"
  });
  osmLayer = new terra.WMTSTileLayer("osm-layer", {
    source: osmSource,
    projection: terra.ProjectFactory.createFromID("3857", 0),
    layerName: "osm",
    style: "default",
    matrixSet: "EPSG:3857"
  });

  // Satellite Layer (ArcGIS)
  const arcgisSource = new terra.ArcGisSource({
      urlTemplate: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      minLevel: 0,
      maxLevel: 19,
      attribution: "ArcGIS"
  });
  satelliteLayer = new terra.WMTSTileLayer("sat-layer", {
      source: arcgisSource,
      projection: terra.ProjectFactory.createFromID("3857", 0),
      layerName: "satellite",
      style: "default",
      matrixSet: "EPSG:3857"
  });
  satelliteLayer.visible = false;

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
      Baselayers: [satelliteLayer, osmLayer], // Add both, control visibility
      minLevel: 2,
      maxLevel: 19
    }
  });

  
});

onBeforeUnmount(() => {
  if (map) {
    if (typeof map.dispose === 'function') map.dispose();
    map = null;
  }
});
</script>

<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>
    
    <div class="absolute top-4 left-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10 w-64 border border-gray-700">
      <h3 class="text-white font-bold mb-3 border-b border-gray-600 pb-2">Layer Management</h3>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-gray-300">Dark Map</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="layerState.osm.visible" @change="toggleLayer('osm')" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-gray-300">Satellite</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="layerState.satellite.visible" @change="toggleLayer('satellite')" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
`;
