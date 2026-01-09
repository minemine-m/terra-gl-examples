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

  // Water Polygon Layer
  const waterLayer = new terra.PolygonLayer('water-layer', { isSceneLayer: true, altitude: 1 });
  map.addLayer(waterLayer);

  fetch('/geojson/水系.json')
    .then(res => res.json())
    .then(data => {
      data.features.forEach((feature: any) => {
         if (feature.geometry && feature.geometry.coordinates) {
             // Inject Z coordinate for water level
             const injectZ = (coords: any[]) => {
                 if (typeof coords[0] === 'number') return [...coords, 1]; 
                 return coords.map(injectZ);
             };
             feature.geometry.coordinates = injectZ(feature.geometry.coordinates);
         }

         const water = new terra.Polygon({
             geometry: feature.geometry,
             style: {
                 type: 'base-water',
                 normalMap: '/image/waternormals.jpg', // Ensure this exists in public/image
                 color: '#0c99e5',
                 sunColor: '#FF0597',
                 opacity: 0.6
             }
         });
         water.addTo(waterLayer);
      });
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
  <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>
</template>
