<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

const route = useRoute();
const { t } = useI18n();

const examples = computed(() => [
  // {
  //   title: t('examples.terrain3d.title'),
  //   path: '/examples/terrain-3d',
  //   description: t('examples.terrain3d.description')
  // },
  {
    title: t('examples.basicMap.title'),
    path: '/examples/basic-map',
    description: t('examples.basicMap.description')
  }
]);
</script>

<template>
  <aside class="w-64 h-full bg-gray-800 border-r border-gray-700 flex flex-col">
    <div class="p-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 min-w-0">
            <img src="/favicon/favicon-32x32.png" alt="Logo" class="w-6 h-6 flex-shrink-0" />
            <h1 class="text-lg font-bold text-white tracking-tight flex items-center gap-1.5 min-w-0">
              <span class="text-blue-500 flex-shrink-0">{{ t('sidebar.title') }}</span>
              <span class="truncate hidden sm:inline">{{ t('sidebar.subtitle') }}</span>
            </h1>
        </div>
        <LanguageSwitcher class="flex-shrink-0" />
      </div>
    </div>
    
    <nav class="flex-1 overflow-y-auto py-4">
      <!-- Back to Home -->
      <div class="px-3 mb-4">
        <router-link 
          to="/" 
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('sidebar.backToHome') }}
        </router-link>
      </div>

      <ul class="space-y-1 px-3">
        <li v-for="example in examples" :key="example.path">
          <router-link 
            :to="example.path"
            class="block px-4 py-3 rounded-lg transition-colors group"
            :class="route.path === example.path ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-gray-400 hover:bg-gray-700 hover:text-white'"
          >
            <div class="font-medium">{{ example.title }}</div>
            <div class="text-xs mt-1 opacity-70 truncate" :title="example.description">{{ example.description }}</div>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <div class="p-4 border-t border-gray-700 text-xs text-gray-500 text-center">
      {{ t('sidebar.footer') }}
    </div>
  </aside>
</template>
