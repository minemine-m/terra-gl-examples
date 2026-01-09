<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from '../components/Navbar.vue';

const { t } = useI18n();

const examples = computed(() => [
  // {
  //   id: 'terrain-3d',
  //   title: t('examples.terrain3d.title'),
  //   description: t('examples.terrain3d.description'),
  //   path: '/examples/terrain-3d',
  //   image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop'
  // },
  {
    id: 'basic-map',
    title: t('examples.basicMap.title'),
    description: t('examples.basicMap.description'),
    path: '/examples/basic-map',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop'
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          <router-link 
            v-for="example in examples" 
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
