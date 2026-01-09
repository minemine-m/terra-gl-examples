<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from '../components/Navbar.vue';

const { t } = useI18n();

const examples = computed(() => [
  {
    category: 'basic',
    title: 'Map Control',
    items: [
      {
        id: 'basic-map',
        title: t('examples.basicMap.title'),
        description: t('examples.basicMap.description'),
        path: '/examples/basic-map',
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'camera-control',
        title: t('examples.cameraControl.title'),
        description: t('examples.cameraControl.description'),
        path: '/examples/camera-control',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'map-events',
        title: t('examples.mapEvents.title'),
        description: t('examples.mapEvents.description'),
        path: '/examples/map-events',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    category: 'layer',
    title: 'Layers',
    items: [
      {
        id: 'tile-layer',
        title: t('examples.tileLayer.title'),
        description: t('examples.tileLayer.description'),
        path: '/examples/tile-layer',
        image: 'https://images.unsplash.com/photo-1535957996774-c955885dbbd8?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'layer-management',
        title: t('examples.layerManagement.title'),
        description: t('examples.layerManagement.description'),
        path: '/examples/layer-management',
        image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'layer-operations',
        title: t('examples.layerOperations.title'),
        description: t('examples.layerOperations.description'),
        path: '/examples/layer-operations',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'layer-properties',
        title: t('examples.layerProperties.title'),
        description: t('examples.layerProperties.description'),
        path: '/examples/layer-properties',
        image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    category: 'geometry',
    title: 'Geometry & Interaction',
    items: [
      {
        id: 'ui-components',
        title: t('examples.uiComponents.title'),
        description: t('examples.uiComponents.description'),
        path: '/examples/ui-components',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'marker-example',
        title: t('examples.markerExample.title'),
        description: t('examples.markerExample.description'),
        path: '/examples/marker-example',
        image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'vector-shapes',
        title: t('examples.vectorShapes.title'),
        description: t('examples.vectorShapes.description'),
        path: '/examples/vector-shapes',
        image: 'https://images.unsplash.com/photo-1555436169-20e93ee0a713?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'draw-tool',
        title: t('examples.drawTool.title'),
        description: t('examples.drawTool.description'),
        path: '/examples/draw-tool',
        image: 'https://images.unsplash.com/photo-1635326444826-06c8f84991a9?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'marker-styles',
        title: t('examples.markerStyles.title'),
        description: t('examples.markerStyles.description'),
        path: '/examples/marker-styles',
        image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'geometry-styles',
        title: t('examples.geometryStyles.title'),
        description: t('examples.geometryStyles.description'),
        path: '/examples/geometry-styles',
        image: 'https://images.unsplash.com/photo-1555436169-20e93ee0a713?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    category: 'advanced',
    title: 'Advanced Visuals',
    items: [
      {
        id: 'pipeline-network',
        title: t('examples.pipelineNetwork.title'),
        description: t('examples.pipelineNetwork.description'),
        path: '/examples/pipeline-network',
        image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'realistic-water',
        title: t('examples.realisticWater.title'),
        description: t('examples.realisticWater.description'),
        path: '/examples/realistic-water',
        image: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'volumetric-clouds',
        title: t('examples.volumetricClouds.title'),
        description: t('examples.volumetricClouds.description'),
        path: '/examples/volumetric-clouds',
        image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'model-layer',
        title: t('examples.modelLayer.title'),
        description: t('examples.modelLayer.description'),
        path: '/examples/model-layer',
        image: 'https://images.unsplash.com/photo-1615840287214-7ff58ee0489b?q=80&w=600&auto=format&fit=crop'
      }
    ]
  }
]);
</script>

<template>
  <div class="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
    <!-- Fixed Navbar Container -->
    <div class="flex-shrink-0 relative z-20 bg-gray-900 border-b border-gray-800 shadow-lg">
      <Navbar class="!relative !py-4" />
    </div>

    <!-- Scrollable Content -->
    <section class="flex-1 overflow-y-auto custom-scrollbar px-8 py-12 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-4 text-center">
          {{ t('home.examplesTitle') }}
        </h2>
        <p class="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          {{ t('home.examplesSubtitle') }}
        </p>

        <div v-for="category in examples" :key="category.category" class="mb-16">
          <h3 class="text-2xl font-bold mb-6 text-blue-400 border-l-4 border-blue-500 pl-4">
            {{ category.title }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <router-link 
              v-for="example in category.items" 
              :key="example.id"
              :to="example.path"
              class="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1"
            >
              <!-- Thumbnail -->
              <div class="h-48 overflow-hidden relative">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                <img 
                  :src="example.image" 
                  :alt="example.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                >
              </div>
              
              <!-- Content -->
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {{ example.title }}
                </h3>
                <p class="text-gray-400 text-sm line-clamp-3 mb-4">
                  {{ example.description }}
                </p>
                <div class="flex items-center text-blue-400 text-sm font-medium">
                  {{ t('home.viewExample') }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Footer inside scrollable area -->
      <footer class="py-8 text-center text-gray-600 text-sm border-t border-gray-800 mt-auto">
        &copy; {{ new Date().getFullYear() }} Terra-GL. All rights reserved.
      </footer>
    </section>
  </div>
</template>

<style scoped>
/* Custom Scrollbar Styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #111827; /* gray-900 */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #374151; /* gray-700 */
  border-radius: 4px;
  border: 2px solid #111827; /* Creates padding effect */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #4B5563; /* gray-600 */
}
</style>
