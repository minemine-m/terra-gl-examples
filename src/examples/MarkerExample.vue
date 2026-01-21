<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;

onMounted(() => {
  if (!mapContainer.value) return;

  // 1. Initialize Map
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
    center: [116.405467, 39.907761, 2000], // Beijing
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

  // 2. Create Point Layer
  const markerLayer = new terra.PointLayer('marker-layer', { altitude: 0 });
  map.addLayer(markerLayer);

  // 3. Create Marker
  const marker = new terra.Marker({
    geometry: {
      type: 'Point',
      coordinates: [116.405467, 39.907761]
    },
    style: {
      type: 'icon-point',
      // Using a simple online marker icon
      url: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', 
      size: [32, 32],
      anchor: [0.5, 1], // Center bottom
      sizeAttenuation: false
    },
    userData: {
      name: "Tiananmen",
      description: "The Gate of Heavenly Peace."
    }
  });

  // 4. Add Marker to Layer
  marker.addTo(markerLayer);

  // 5. Setup InfoWindow
  const createContent = () => {
    const div = document.createElement('div');
    div.style.padding = '10px';
    div.style.color = '#333';
    div.innerHTML = `
      <h3 style="margin: 0 0 5px 0;">Tiananmen</h3>
      <p style="margin: 0;">Beijing, China</p>
    `;
    return div;
  };

  marker.setInfoWindow({
    title: "Tiananmen",
    custom: true,
    content: createContent(),
    minWidth: 150,
    dy: -40 // Offset upwards
  });

  // Open by default
  setTimeout(() => {
    marker.openInfoWindow();
  }, 1000);
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
  <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>
</template>
