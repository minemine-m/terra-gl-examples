<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
let markerLayer: terra.PointLayer | null = null;
// ... (rest of the script)Store markers for controls
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
    // For icon, maybe change opacity or size as color tinting icons is harder without masking
    // Let's toggle size for icons
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
      <h3 class="text-white font-bold mb-4 border-b border-gray-600 pb-2">{{ t('examples.markerStyles.panelTitle') }}</h3>
      
      <div class="space-y-4">
        <!-- Icon Marker -->
        <div class="flex items-center justify-between">
          <span class="text-gray-300 text-sm">{{ t('examples.markerStyles.iconMarker') }}</span>
          <div class="flex gap-2">
            <button @click="flyToMarker('icon')" class="px-2 py-1 bg-blue-600 text-xs rounded hover:bg-blue-500 text-white">{{ t('examples.markerStyles.flyTo') }}</button>
            <button @click="changeColor('icon')" class="px-2 py-1 bg-gray-600 text-xs rounded hover:bg-gray-500 text-white">{{ t('examples.markerStyles.resize') }}</button>
          </div>
        </div>

        <!-- Circle Marker -->
        <div class="flex items-center justify-between">
          <span class="text-red-400 text-sm">{{ t('examples.markerStyles.redCircle') }}</span>
          <div class="flex gap-2">
            <button @click="flyToMarker('circle')" class="px-2 py-1 bg-blue-600 text-xs rounded hover:bg-blue-500 text-white">{{ t('examples.markerStyles.flyTo') }}</button>
            <button @click="changeColor('circle')" class="px-2 py-1 bg-gray-600 text-xs rounded hover:bg-gray-500 text-white">{{ t('examples.markerStyles.color') }}</button>
          </div>
        </div>

        <!-- Blue Marker -->
        <div class="flex items-center justify-between">
          <span class="text-blue-400 text-sm">{{ t('examples.markerStyles.blueDot') }}</span>
          <div class="flex gap-2">
            <button @click="flyToMarker('blue')" class="px-2 py-1 bg-blue-600 text-xs rounded hover:bg-blue-500 text-white">{{ t('examples.markerStyles.flyTo') }}</button>
            <button @click="changeColor('blue')" class="px-2 py-1 bg-gray-600 text-xs rounded hover:bg-gray-500 text-white">{{ t('examples.markerStyles.color') }}</button>
          </div>
        </div>
      </div>
      
      <div class="mt-4 text-xs text-gray-500 italic">
        {{ t('examples.markerStyles.clickTip') }}
      </div>
    </div>
  </div>
</template>
