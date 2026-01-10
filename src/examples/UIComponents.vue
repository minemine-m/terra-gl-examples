<script setup lang="ts">
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
    center: [113.6253, 34.7466, 2000],
    zoom: 12,
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

  /*
  // 1. Add InfoWindow
  // const infoWindow = new terra.InfoWindow({
  //     title: "Zhengzhou",
  //     content: "<div style='padding:10px;'>Capital of Henan Province<br/>A major transportation hub.</div>",
  //     minWidth: 200
  // });
  // infoWindow.addTo(map);
  // infoWindow.open([113.6253, 34.7466, 2000]);

  // 2. Add UIMarker (HTML Marker)
  const markerEl = document.createElement('div');
  markerEl.className = 'custom-marker';
  markerEl.innerHTML = '📍';
  markerEl.style.fontSize = '30px';
  markerEl.style.cursor = 'pointer';
  markerEl.onclick = () => {
      alert('You clicked the custom marker!');
  };

  // const uiMarker = new terra.UIMarker([113.65, 34.75, 2000], {
  //     content: markerEl,
  //     alignment: 'bottom'
  // });
  // uiMarker.addTo(map);
  */
  console.log("UI Components (InfoWindow, UIMarker) are temporarily disabled due to API changes.");
  
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

<style>
/* Style for InfoWindow is usually handled by terra.css, but we can override or add custom styles */
.custom-marker {
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
