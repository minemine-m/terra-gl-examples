<script setup lang="ts">
defineProps<{
  pitch: number;
  bearing: number;
  zoom: number;
}>();

const emit = defineEmits<{
  (e: 'update:pitch', val: number): void;
  (e: 'update:bearing', val: number): void;
}>();
</script>

<template>
  <div class="absolute top-4 right-4 bg-gray-900/90 backdrop-blur p-4 rounded-lg shadow-xl text-white w-64 border border-gray-700 z-10">
    <h3 class="font-bold mb-4 text-lg">3D Terrain Demo</h3>
    
    <div class="mb-4">
      <label class="block text-xs text-gray-400 mb-1">Pitch (Tilt): {{ pitch.toFixed(0) }}°</label>
      <input 
        type="range" min="0" max="85" step="1"
        :value="pitch" 
        @input="emit('update:pitch', Number(($event.target as HTMLInputElement).value))"
        class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      >
    </div>

    <div class="mb-4">
      <label class="block text-xs text-gray-400 mb-1">Bearing (Rotation): {{ bearing.toFixed(0) }}°</label>
      <input 
        type="range" min="0" max="360" step="1"
        :value="bearing" 
        @input="emit('update:bearing', Number(($event.target as HTMLInputElement).value))"
        class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      >
    </div>
    
    <div class="text-xs text-gray-500 mt-4">
      <p>Use left mouse to pan.</p>
      <p>Use right mouse or Ctrl+drag to tilt/rotate.</p>
    </div>
  </div>
</template>
