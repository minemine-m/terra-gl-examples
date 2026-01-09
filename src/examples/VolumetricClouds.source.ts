export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

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
    center: [113.5517, 34.7931, 2000],
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

  

  // Clouds Layer
  const cloudsLayer = new terra.CloudsLayer('clouds-layer', { 
      texture: '/image/cloud.png', 
      isSceneLayer: true 
  });
  map.addLayer(cloudsLayer);

  // Add random clouds
  for(let i=0; i<20; i++) {
      const lat = 34.7931 + (Math.random() - 0.5) * 0.05;
      const lng = 113.5517 + (Math.random() - 0.5) * 0.05;
      const height = 1000 + Math.random() * 500;

      const cloud = new terra.ICloud({
          geometry: {
              type: "Point",
              coordinates: [lng, lat, height]
          },
          style: {
              type: 'cloud',
              hexcolor: '#FFFFFF',
              growth: 14,
              segments: 90,
              speed: 0.2,
              opacity: 0.25,
              boundstext: { x: 50, y: 2, z: 30 }
          }
      });
      cloud.addTo(cloudsLayer);
  }
});

onBeforeUnmount(() => {
  if (map) {
    if (typeof map.dispose === 'function') map.dispose();
    map = null;
  }
});
</script>

<template>
  <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>
</template>
`;
