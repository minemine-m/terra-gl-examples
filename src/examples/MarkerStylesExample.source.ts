export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let markerLayer: terra.PointLayer | null = null;

// Store markers for controls
const markers: Record<string, terra.Maker> = {};

const flyToMarker = (key: string) => {
  if (!map || !markers[key]) return;
  const coords = markers[key].getGeometry().coordinates;
  
  map.viewer.flyToPoint({
    x: coords[0],
    y: coords[1],
    z: 2000,
    pitch: -45,
    yaw: 0,
    duration: 1500
  });
  
  // Open popup after fly
  setTimeout(() => {
    markers[key].openInfoWindow();
  }, 1600);
};

const changeColor = (key: string) => {
  const marker = markers[key];
  if (!marker) return;
  
  // Random color
  const color = '#' + Math.floor(Math.random()*16777215).toString(16);
  
  const currentStyle = (marker as any)._style?.config || {};
  
  // Handle different marker types
  if (currentStyle.type === 'basic-point') {
    marker.setStyle({ ...currentStyle, color });
  } else {
    const newSize = Math.random() > 0.5 ? [48, 48] : [32, 32];
    marker.setStyle({ ...currentStyle, size: newSize });
  }
};

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
    center: [116.397428, 39.90923, 15000],
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

  markerLayer = new terra.PointLayer('marker-layer');
  map.addLayer(markerLayer);

  // 1. Icon Point
  const iconMarker = new terra.Maker({
    geometry: { type: 'Point', coordinates: [116.35, 39.90] },
    style: {
      type: 'icon-point',
      url: '/image/point/fxd.png',
      size: [32, 32],
      anchor: [0.5, 0.5]
    },
    userData: { name: 'Icon Marker' }
  });
  iconMarker.setInfoWindow({ title: 'Icon Marker', content: 'This is an image-based marker.' });
  markers['icon'] = iconMarker;
  
  // 2. Basic Point (Circle)
  const circleMarker = new terra.Maker({
    geometry: { type: 'Point', coordinates: [116.40, 39.90] },
    style: {
      type: 'basic-point',
      color: '#ff0000',
      size: 20,
      outlineColor: '#ffffff',
      outlineWidth: 2
    },
    userData: { name: 'Circle Marker' }
  });
  circleMarker.setInfoWindow({ title: 'Circle Marker', content: 'This is a vector circle marker.' });
  markers['circle'] = circleMarker;

  // 3. Blue Point
  const blueMarker = new terra.Maker({
    geometry: { type: 'Point', coordinates: [116.45, 39.90] },
    style: {
      type: 'basic-point',
      color: '#0000ff',
      size: 15,
      opacity: 0.8
    },
    userData: { name: 'Blue Marker' }
  });
  blueMarker.setInfoWindow({ title: 'Blue Marker', content: 'Another vector marker style.' });
  markers['blue'] = blueMarker;

  iconMarker.addTo(markerLayer);
  circleMarker.addTo(markerLayer);
  blueMarker.addTo(markerLayer);
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
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10 w-64 border border-gray-700">
       <!-- Controls... -->
    </div>
  </div>
</template>`;
