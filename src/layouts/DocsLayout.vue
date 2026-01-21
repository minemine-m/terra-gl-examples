<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ApiSidebar from '../components/docs/ApiSidebar.vue';

const route = useRoute();
const isSidebarOpen = ref(false);

// Close sidebar on route change
watch(() => route.path, () => {
  isSidebarOpen.value = false;
});
</script>

<template>
  <div class="flex h-screen w-full bg-gray-900 overflow-hidden">
    <!-- Desktop Sidebar -->
    <div class="hidden md:block h-full z-20 shadow-xl">
      <ApiSidebar />
    </div>

    <!-- Mobile Header -->
    <div class="md:hidden fixed top-0 left-0 right-0 h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4 z-30">
      <button 
        @click="isSidebarOpen = !isSidebarOpen"
        class="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800 transition-colors"
      >
        <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <span class="ml-3 font-semibold text-gray-200">Documentation</span>
    </div>

    <!-- Mobile Sidebar Drawer -->
    <div 
        v-if="isSidebarOpen" 
        class="fixed inset-0 z-40 md:hidden"
    >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="isSidebarOpen = false"></div>
        
        <!-- Sidebar Content -->
        <div class="absolute top-14 left-0 bottom-0 w-72 bg-gray-900 shadow-2xl border-r border-gray-800 transform transition-transform duration-300">
            <ApiSidebar />
        </div>
    </div>
    
    <!-- Main Content -->
    <main class="flex-1 h-full overflow-hidden relative bg-gray-900 text-gray-100 pt-14 md:pt-0 flex flex-col">
        <router-view />
    </main>
  </div>
</template>
