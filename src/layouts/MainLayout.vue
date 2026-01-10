<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';

const isSidebarOpen = ref(false);
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full bg-gray-900 overflow-hidden">
    <!-- Mobile Header -->
    <header class="md:hidden h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4 flex-shrink-0 z-20 justify-between">
      <div class="flex items-center gap-3">
        <button 
          @click="isSidebarOpen = true"
          class="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="text-lg font-bold text-white tracking-tight">
          <span class="text-blue-500">Terra</span>-GL
        </span>
      </div>
    </header>

    <Sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <main class="flex-1 h-full overflow-hidden relative">
      <router-view v-slot="{ Component }">
        <!-- Removed transition for now to debug rendering issues -->
        <component :is="Component" :key="$route.fullPath" />
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
