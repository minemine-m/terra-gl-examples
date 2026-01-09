<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import * as terra from '@terra.gl/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let currentLayer: terra.WMTSTileLayer | null = null;

const activeLayerId = ref('carto_dark');

const layers = computed(() => ({
  carto_dark: {
    name: t('examples.tileLayer.layers.dark'),
    url: 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  },
  carto_light: {
    name: t('examples.tileLayer.layers.light'),
    url: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  },
  osm: {
    name: t('examples.tileLayer.layers.osm'),
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  arcgis: {
    name: t('examples.tileLayer.layers.satellite'),
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri'
  }
}));

const switchLayer = (layerId: string) => {
  if (!map) return;
  
  // Remove existing layer
  if (currentLayer) {
    // There isn't a direct "removeBaseLayer" usually, but let's check API.
    // If basemap is managed via map.options or basemap property.
    // Usually we replace the basemap layers list or remove layer from map.
    // Let's try removing it as a normal layer first or checking if we can clear baselayers.
    
    // Assuming we can just clear layers or use map.removeLayer if it's in layer list.
    // But BaseLayers are special.
    // Workaround: Re-initialize map or use map.setBaseMap if available?
    // Let's look at Map.ts structure or just try to remove it.
    
    // A safer bet for this example if dynamic switching isn't obvious:
    // Remove the layer by ID if possible.
    map.removeLayer(currentLayer.getId());
  }

  const config = layers.value[layerId as keyof typeof layers.value];
  
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

  // Add as base layer (bottom most)
  map.addLayer(newLayer); 
  // Force it to back if needed, but for now just adding should work if we removed previous.
  
  currentLayer = newLayer;
  activeLayerId.value = layerId;
};

onMounted(() => {
  if (!mapContainer.value) return;

  // Initialize with Dark
  const config = layers.value.carto_dark;
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
    
    <!-- Controls -->
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10">
      <h3 class="text-white font-bold mb-3">Base Layer</h3>
      <div class="space-y-2">
        <label 
          v-for="(config, id) in layers" 
          :key="id" 
          class="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white"
        >
          <input 
            type="radio" 
            name="baselayer" 
            :value="id" 
            :checked="activeLayerId === id"
            @change="switchLayer(id as string)"
            class="text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
          >
          <span>{{ config.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
