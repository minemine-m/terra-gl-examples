<script setup lang="ts">
import Sidebar from './Sidebar.vue';
</script>

<template>
  <div class="flex h-screen w-full bg-gray-900 overflow-hidden">
    <Sidebar />
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
