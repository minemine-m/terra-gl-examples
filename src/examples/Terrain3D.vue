<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';
import ControlPanel from './ControlPanel.vue';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;
const pitch = ref(60);
const bearing = ref(0);
const zoom = ref(12);

const emit = defineEmits<{
  (e: 'view-change', data: { pitch: number, bearing: number, zoom: number }): void;
  (e: 'map-loaded'): void;
}>();

const updatePitch = (val: number) => {
  if (!map) return;
  pitch.value = val;
  const center = map.getCenter();
  map.viewer.flyToPoint({
    center: center,
    polarDeg: val,
    duration: 100
  });
};

const updateBearing = (val: number) => {
  if (!map) return;
  bearing.value = val;
  const center = map.getCenter();
  map.viewer.flyToPoint({
    center: center,
    azimuthDeg: val,
    duration: 100
  });
};

onMounted(() => {
  if (!mapContainer.value) return;

  // 1. Create Data Sources
  const osmSource = new terra.WMTSSource({
    urlTemplate: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    minLevel: 0,
    maxLevel: 19,
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  });

  // Terrain Source (MapLibre Demo Tiles - Terrain RGB format)
  const terrainSource = new terra.WMTSSource({
    urlTemplate: "https://demotiles.maplibre.org/terrain-tiles/{z}/{x}/{y}.png",
    dataType: "terrain-rgb",
    minLevel: 0,
    maxLevel: 15,
    projectionID: "3857"
  });

  // 2. Create Layer
  const baseLayer = new terra.WMTSTileLayer("base-layer", {
    source: osmSource,
    projection: terra.ProjectFactory.createFromID("3857", 0),
    layerName: "osm",
    style: "default",
    matrixSet: "EPSG:3857"
  });

  // 3. Attach Terrain Source to Layer Loader
  // Note: accessing internal loader to set demSource as it might not be exposed in options yet
  if ((baseLayer as any).loader) {
    (baseLayer as any).loader.demSource = terrainSource;
  }

  // 4. Initialize Map
  map = new terra.Map(mapContainer.value, {
    center: [113.6253, 34.7466, 2000], // Zhengzhou
    zoom: 12,
    viewer: {
      antialias: true,
      logarithmicDepthBuffer: true,
      polarDeg: 70,
      azimuthDeg: 0,
      // Add a simple skybox or background color
      // background: '#87CEEB' 
    },
    basemap: {
      Baselayers: [baseLayer],
      minLevel: 2,
      maxLevel: 19
    }
  });

  map.on('control-change', () => {
    if (!map) return;
    const controls = (map.viewer.controls as any);
    // Assuming MapControls/OrbitControls API
    // polar angle 0 is Y+ (up), 90 is horizon (if Z up). 
    // Terra-GL usually uses Z-up?
    // In three.js OrbitControls: 
    // getPolarAngle(): 0 to PI. 0 is top.
    // getAzimuthalAngle(): -PI to PI.

    // We want degrees.
    let pitch = 0;
    let bearing = 0;

    if (controls.getPolarAngle) {
      pitch = controls.getPolarAngle() * 180 / Math.PI;
    }
    if (controls.getAzimuthalAngle) {
      bearing = controls.getAzimuthalAngle() * 180 / Math.PI;
    }

    emit('view-change', {
      pitch,
      bearing,
      zoom: map.getZoom()
    });
  });

  emit('map-loaded');

  // Initial camera angle
  map.viewer.flyToPoint({
    center: [113.6253, 34.7466, 2000],
    distance: 5000,
    polarDeg: 70,
    azimuthDeg: 0,
    duration: 0
  });
});

onBeforeUnmount(() => {
  if (map) {
    // Ensure map is properly disposed to prevent WebGL context loss or memory leaks
    try {
      const gl = map.viewer.renderer.getContext();
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    } catch (e) {
      console.warn('Error disposing WebGL context', e);
    }
    map.dispose();
    map = null;
  }
});
</script>

<template>
  <div class="w-full h-full relative bg-gray-900">
    <div ref="mapContainer" class="w-full h-full absolute inset-0"></div>
    <!-- Map Canvas will be injected here -->

    <!-- Integrated Control Panel -->
    <ControlPanel :pitch="pitch" :bearing="bearing" :zoom="zoom" @update:pitch="updatePitch"
      @update:bearing="updateBearing" />
  </div>
</template>

<style scoped>
/* Ensure container takes full space */
:deep(canvas) {
  outline: none;
}
</style>
