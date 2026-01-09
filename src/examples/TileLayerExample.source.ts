export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let currentLayer: terra.WMTSTileLayer | null = null;
const activeLayerId = ref('carto_dark');

const layers = {
  carto_dark: {
    name: 'Carto Dark',
    url: 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  },
  carto_light: {
    name: 'Carto Light',
    url: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  },
  osm: {
    name: 'OpenStreetMap',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  arcgis: {
    name: 'ArcGIS Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri'
  }
};

const switchLayer = (layerId: string) => {
  if (!map) return;
  if (currentLayer) map.removeLayer(currentLayer.getId());

  const config = layers[layerId];
  const source = new terra.WMTSSource({
    urlTemplate: config.url,
    minLevel: 0,
    maxLevel: 19,
    attribution: config.attribution
  });

  const newLayer = new terra.WMTSTileLayer("base-layer-" + layerId, {
    source: source,
    projection: terra.ProjectFactory.createFromID("3857", 0),
    layerName: "layer-" + layerId,
    style: "default",
    matrixSet: "EPSG:3857"
  });

  map.addLayer(newLayer); 
  currentLayer = newLayer;
  activeLayerId.value = layerId;
};

onMounted(() => {
  if (!mapContainer.value) return;

  // Initialize with Dark
  const config = layers.carto_dark;
  const source = new terra.WMTSSource({
    urlTemplate: config.url,
    minLevel: 0,
    maxLevel: 19,
    attribution: config.attribution
  });

  currentLayer = new terra.WMTSTileLayer("base-layer-init", {
    source: source,
    projection: terra.ProjectFactory.createFromID("3857", 0),
    layerName: "init-layer",
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
        Baselayers: [currentLayer],
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
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10">
      <h3 class="text-white font-bold mb-3">Base Layer</h3>
      <div class="space-y-2">
        <label v-for="(config, id) in layers" :key="id" class="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
          <input type="radio" name="baselayer" :value="id" :checked="activeLayerId === id" @change="switchLayer(id)" class="text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600">
          <span>{{ config.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>`;
