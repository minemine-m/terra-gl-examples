export const code = `<script setup lang="ts">
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
    center: [113.5517, 34.7931, 1000],
    zoom: 15,
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

  

  // 2. Add Pipeline Layer (Lines)
  const pipeLayer = new terra.LineLayer('pipe-layer');
  map.addLayer(pipeLayer);

  fetch('/geojson/public.gsgx_pipe.json')
    .then(res => res.json())
    .then(data => {
      data.features.forEach((feature: any) => {
        // Fix coordinates: Add Z=1 to prevent clipping with ground
        if (feature.geometry && feature.geometry.coordinates) {
             // Handle MultiLineString specifically if needed, but for now generic map
             // Flattening complex structures might be needed if strictly MultiLineString
             // But terra.MultiLineString handles GeoJSON geometry structure usually.
             // We just need to inject Z.
             
             // Simple recursive function to inject Z
             const injectZ = (coords: any[]) => {
                 if (typeof coords[0] === 'number') return [...coords, -1]; // [x, y, z]
                 return coords.map(injectZ);
             };
             feature.geometry.coordinates = injectZ(feature.geometry.coordinates);
        }

        const pipe = new terra.MultiLineString({
          geometry: feature.geometry,
          style: {
            type: 'basic-line',
            color: '#0068F8', // Blue
            width: 3
          }
        });
        pipe.addTo(pipeLayer);
      });
    });

  // 3. Add Valve Layer (Points)
  const valveLayer = new terra.PointLayer('valve-layer', { collision: true });
  map.addLayer(valveLayer);

  fetch('/geojson/public.gsss_valve.json')
    .then(res => res.json())
    .then(data => {
       data.features.forEach((feature: any) => {
         if (feature.geometry && feature.geometry.coordinates) {
            feature.geometry.coordinates = [...feature.geometry.coordinates, 1];
         }
         
         const valve = new terra.Maker({
           geometry: feature.geometry,
           style: {
             type: 'icon-point',
             url: '/image/point/fxd.png', // Using available icon
             size: [24, 24],
             anchor: [0.5, 0.5],
             sizeAttenuation: false
           },
           userData: feature.properties
         });
         
         valve.on('click', () => {
             console.log('Valve clicked', feature.properties);
             const info = new terra.InfoWindow({
                 title: "Valve Info",
                 content: \`ID: \${feature.properties.id || 'N/A'}<br>Type: \${feature.properties.type || 'Unknown'}\`
             });
             info.addTo(map!);
             info.open(feature.geometry.coordinates);
         });

         valve.addTo(valveLayer);
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
`;
