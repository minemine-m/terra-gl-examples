<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './LanguageSwitcher.vue';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<template>
  <nav class="w-full px-8 py-6 flex justify-between items-center z-10" :class="$attrs.class || 'absolute top-0'">
    <!-- Logo -->
    <router-link to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <img src="/favicon/favicon-32x32.png" alt="Terra-GL Logo" class="w-8 h-8" />
      <span class="text-2xl font-bold tracking-tighter">
        <span class="text-blue-500">Terra</span>-GL
      </span>
    </router-link>

    <!-- Navigation Links -->
    <div class="flex items-center gap-8">
      <div class="flex items-center gap-6 bg-gray-800/50 backdrop-blur px-6 py-2 rounded-full border border-gray-700/50">
        <router-link 
          to="/" 
          class="text-sm font-medium transition-colors"
          :class="isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'"
        >
          {{ t('nav.home') }}
        </router-link>
        <router-link 
          to="/examples/basic-map" 
          class="text-sm font-medium transition-colors"
          :class="isActive('/examples/basic-map') || isActive('/gallery') ? 'text-blue-400' : 'text-gray-300 hover:text-white'"
        >
          {{ t('nav.examples') }}
        </router-link>
      </div>
      
      <LanguageSwitcher />
    </div>
  </nav>
</template>
