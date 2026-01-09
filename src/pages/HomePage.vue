<script setup lang="ts">
import { ref } from 'vue';
import MapContainer from '../components/MapContainer.vue';
import ControlPanel from '../components/ControlPanel.vue';

const mapRef = ref<InstanceType<typeof MapContainer> | null>(null);
const pitch = ref(60);
const bearing = ref(0);
const zoom = ref(12);

const handleViewChange = (data: { pitch: number, bearing: number, zoom: number }) => {
  // Update local state, but avoid triggering update loops if we wanted 2-way binding (not implemented here)
  // Just for display in ControlPanel
  pitch.value = data.pitch;
  bearing.value = data.bearing;
  zoom.value = data.zoom;
};

const updatePitch = (val: number) => {
  pitch.value = val;
  mapRef.value?.setPitch(val);
};

const updateBearing = (val: number) => {
  bearing.value = val;
  mapRef.value?.setBearing(val);
};
</script>

<template>
  <div class="relative w-full h-full">
    <MapContainer ref="mapRef" @view-change="handleViewChange" />
    <ControlPanel 
      :pitch="pitch" 
      :bearing="bearing" 
      :zoom="zoom"
      @update:pitch="updatePitch"
      @update:bearing="updateBearing"
    />
  </div>
</template>
