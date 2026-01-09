export const code = `<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;

const layerCount = ref(0);
const logs = ref<string[]>([]);

const log = (msg: string) => {
  logs.value.unshift(\`\${new Date().toLocaleTimeString()} - \${msg}\`);
  if (logs.value.length > 5) logs.value.pop();
};

const addLayer = () => {
  if (!map) return;
  const id = \`random-layer-\${layerCount.value++}\`;
  const layer = new terra.PointLayer(id);
  map.addLayer(layer);
  
  // Add a random point
  const lat = 39.90 + (Math.random() - 0.5) * 0.1;
  const lng = 116.40 + (Math.random() - 0.5) * 0.1;
  
  const point = new terra.Maker({
    geometry: { type: 'Point', coordinates: [lng, lat] },
    style: {
      type: 'basic-point',
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      size: 15
    }
  });
  point.addTo(layer);
  
  log(\`Added layer: \${id}\`);
};

const removeLastLayer = () => {
  if (!map || layerCount.value === 0) return;
  const id = \`random-layer-\${layerCount.value - 1}\`;
  
  const layer = map.getLayer(id);
  if (layer) {
    map.removeLayer(id);
    layerCount.value--;
    log(\`Removed layer: \${id}\`);
  } else {
    log(\`Layer not found: \${id}\`);
  }
};

const toggleVisibility = () => {
  if (!map || layerCount.value === 0) return;
  const id = \`random-layer-\${layerCount.value - 1}\`;
  const layer = map.getLayer(id);
  if (layer) {
    const isVisible = layer.visible;
    layer.visible = !isVisible;
    log(\`Toggled visibility for \${id}\`);
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
    center: [116.40, 39.90, 10000],
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
    <div class="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10 flex flex-col gap-2 w-64 border border-gray-700">
      <!-- Controls -->
    </div>
  </div>
</template>`;
