<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const { t } = useI18n();
const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;

onMounted(() => {
  if (!mapContainer.value) return;

  const osmSource = new terra.WMTSSource({
    urlTemplate: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    minLevel: 0,
    maxLevel: 19,
    attribution: "Dark"
  });

  const baseLayer = new terra.WMTSTileLayer("base-layer", {
    source: osmSource,
    projection: terra.ProjectFactory.createFromID("3857", 0),
    layerName: "dark-layer",
    style: "default",
    matrixSet: "EPSG:3857"
  });

  map = new terra.Map(mapContainer.value, {
    center: [0, 20, 20000000],
    zoom: 2,
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
  
  // Auto-rotate
  let rotation = 0;
  const animate = () => {
    if (map) {
      rotation += 0.1;
      map.viewer.setAzimuth(rotation);
      requestAnimationFrame(animate);
    }
  };
  animate();
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
    <!-- Background Map -->
    <div ref="mapContainer" class="absolute inset-0 z-0"></div>
    
    <!-- Overlay Content -->
    <div class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 text-white p-8 pointer-events-none">
      <div class="max-w-3xl text-center pointer-events-auto">
        <h1 class="text-5xl font-bold mb-6 text-blue-500 drop-shadow-lg">{{ t('home.title') }}</h1>
        <h2 class="text-2xl font-light mb-8 text-gray-200 drop-shadow-md">{{ t('home.subtitle') }}</h2>
        <p class="text-lg text-gray-300 mb-10 leading-relaxed drop-shadow-sm">
          {{ t('home.description') }}
        </p>
        
        <div class="flex gap-4 justify-center">
          <router-link 
            to="/examples/basic-map" 
            class="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-900/50 backdrop-blur-sm"
          >
            {{ t('home.getStarted') }}
          </router-link>
          <router-link 
            to="/gallery" 
            class="px-8 py-3 bg-gray-700/80 hover:bg-gray-600/80 rounded-lg font-semibold transition-colors border border-gray-600 backdrop-blur-sm"
          >
            {{ t('home.examplesTitle') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
