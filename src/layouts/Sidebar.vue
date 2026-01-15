<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

const route = useRoute();
const { t } = useI18n();

// Define props for controlling sidebar state
const props = defineProps<{
  isOpen?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Close sidebar on route change (mobile)
const closeSidebar = () => {
  emit('close');
};

const examples = computed(() => [
  {
    category: t('sidebar.categories.mapControl'),
    items: [
      {
        title: t('examples.basicMap.title'),
        path: '/examples/basic-map',
        description: t('examples.basicMap.description')
      },
      {
        title: t('examples.mapEvents.title'),
        path: '/examples/map-events',
        description: t('examples.mapEvents.description')
      },
      {
        title: t('examples.cameraControl.title'),
        path: '/examples/camera-control',
        description: t('examples.cameraControl.description')
      }
    ]
  },
  {
    category: t('sidebar.categories.layers'),
    items: [
      {
        title: t('examples.tileLayer.title'),
        path: '/examples/tile-layer',
        description: t('examples.tileLayer.description')
      },
      {
        title: t('examples.layerManagement.title'),
        path: '/examples/layer-management',
        description: t('examples.layerManagement.description')
      },
      {
        title: t('examples.layerOperations.title'),
        path: '/examples/layer-operations',
        description: t('examples.layerOperations.description')
      },
      {
        title: t('examples.layerProperties.title'),
        path: '/examples/layer-properties',
        description: t('examples.layerProperties.description')
      }
    ]
  },
  {
    category: t('sidebar.categories.geometryInteraction'),
    items: [
      {
        title: t('examples.markerExample.title'),
        path: '/examples/marker-example',
        description: t('examples.markerExample.description')
      },
      {
        title: t('examples.markerStyles.title'),
        path: '/examples/marker-styles',
        description: t('examples.markerStyles.description')
      },
      {
        title: t('examples.vectorShapes.title'),
        path: '/examples/vector-shapes',
        description: t('examples.vectorShapes.description')
      },
      {
        title: t('examples.geometryStyles.title'),
        path: '/examples/geometry-styles',
        description: t('examples.geometryStyles.description')
      },
      {
        title: t('examples.drawTool.title'),
        path: '/examples/draw-tool',
        description: t('examples.drawTool.description')
      },
      {
        title: t('examples.uiComponents.title'),
        path: '/examples/ui-components',
        description: t('examples.uiComponents.description')
      },
      {
        title: t('examples.labelExample.title'),
        path: '/examples/label-example',
        description: t('examples.labelExample.description')
      }
    ]
  },
  {
    category: t('sidebar.categories.advancedVisuals'),
    items: [
      {
        title: t('examples.pipelineNetwork.title'),
        path: '/examples/pipeline-network',
        description: t('examples.pipelineNetwork.description')
      },
      {
        title: t('examples.modelLayer.title'),
        path: '/examples/model-layer',
        description: t('examples.modelLayer.description')
      },
      {
        title: t('examples.realisticWater.title'),
        path: '/examples/realistic-water',
        description: t('examples.realisticWater.description')
      },
      {
        title: t('examples.volumetricClouds.title'),
        path: '/examples/volumetric-clouds',
        description: t('examples.volumetricClouds.description')
      },
      {
        title: t('examples.zhengzhouNight.title'),
        path: '/examples/zhengzhou-night',
        description: t('examples.zhengzhouNight.description')
      }
    ]
  }
]);
</script>

<template>
  <!-- Sidebar Backdrop (Mobile) -->
  <div 
    v-if="isOpen" 
    class="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
    @click="closeSidebar"
  ></div>

  <!-- Sidebar -->
  <aside 
    class="fixed md:static inset-y-0 left-0 w-64 h-full bg-gray-800 border-r border-gray-700 flex flex-col z-40 transform transition-transform duration-300 ease-in-out md:transform-none"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 min-w-0">
            <img src="/favicon/favicon-32x32.png" alt="Logo" class="w-6 h-6 flex-shrink-0" />
            <h1 class="text-lg font-bold text-white tracking-tight flex items-center gap-1.5 min-w-0">
              <span class="text-blue-500 flex-shrink-0">{{ t('sidebar.title') }}</span>
              <span class="truncate hidden sm:inline">{{ t('sidebar.subtitle') }}</span>
            </h1>
        </div>

        <div class="flex items-center gap-2">
            <div class="hidden md:block">
               <LanguageSwitcher />
            </div>
            <!-- Close button for mobile inside sidebar -->
            <button class="md:hidden text-gray-400 hover:text-white" @click="closeSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
      </div>
      <!-- Language Switcher moved below title on mobile if needed, or kept here -->
      <div class="mt-2 md:hidden">
         <LanguageSwitcher />
      </div>
    </div>
    
    <nav class="flex-1 overflow-y-auto py-4">
      <!-- Back to Home -->
      <div class="px-3 mb-4">
        <router-link 
          to="/" 
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          @click="closeSidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('sidebar.backToHome') }}
        </router-link>
      </div>

      <div v-for="category in examples" :key="category.category" class="mb-4">
        <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {{ category.category }}
        </div>
        <ul class="space-y-1 px-3">
          <li v-for="example in category.items" :key="example.path">
            <router-link 
              :to="example.path"
              class="block px-4 py-2.5 rounded-lg transition-colors group"
              :class="route.path === example.path ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-gray-400 hover:bg-gray-700 hover:text-white'"
              @click="closeSidebar"
            >
              <div class="font-medium text-sm">{{ example.title }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    
    <div class="p-4 border-t border-gray-700 text-xs text-gray-500 text-center">
      {{ t('sidebar.footer') }}
    </div>
  </aside>
</template>
