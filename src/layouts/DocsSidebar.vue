<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
// import typedocSidebar from '../docs/typedoc-sidebar.json';

const route = useRoute();
const { t } = useI18n();

const props = defineProps<{
  isOpen?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closeSidebar = () => {
  emit('close');
};

const apiGroups = {
  'Map & View': ['Viewer', 'Map', 'Camera', 'ViewerBase'],
  'Layers': ['Layer', 'TileLayer', 'VectorTileLayer', 'PointLayer', 'LineLayer', 'PolygonLayer', 'ModelLayer', 'CloudsLayer', 'WMTSTileLayer', 'BaseLayer'],
  'Sources': ['Source', 'TileSource', 'TDTSource', 'ArcGisSource', 'MapBoxSource', 'WMTSSource', 'MVTSource', 'MVTGeoSource', 'TDTQMSource', 'ArcGisDemSource', 'TileGeometryLoader', 'TileMaterialLoader'],
  'Geometry': ['Point', 'LineString', 'Polygon', 'MultiLineString', 'Feature', 'Geometry', 'TileGeometry'],
  'Interaction': ['MapTool', 'DrawTool', 'InfoWindow', 'Marker', 'Label', 'EventClass'],
  'Styles': ['Style', 'PointStyle', 'LineStyle', 'PolygonStyle', 'VectorStyle', 'ModelStyle', 'LabelStyle', 'IconPointStyle', 'ArrowLineStyle', 'ExtrudeStyle'],
  'Interfaces': [], // Will catch all interfaces not matched above
  'Others': [] // Will catch everything else
};

const getCategorizedDocs = () => {
  const guideSection = {
    category: t('docs.categories.guide'),
    items: [
      { title: t('docs.items.introduction'), path: '/docs/introduction' },
      { title: t('docs.items.gettingStarted'), path: '/docs/getting-started' },
      { title: t('docs.items.coreConcepts'), path: '/docs/core-concepts' },
      { title: 'API Reference', path: '/docs/Viewer' }
    ]
  };

  // Flatten all items from typedoc
  const typedocSidebar: any[] = []; // Placeholder since file is missing and we use new API docs
  const allApiItems = typedocSidebar.flatMap(section => section.items.map(item => ({
    title: item.text,
    path: item.link,
    // Try to guess type from link or section
    type: section.text 
  })));

  const groupedApi = {};
  const processedItems = new Set();

  // Initialize groups
  Object.keys(apiGroups).forEach(key => {
    groupedApi[key] = [];
  });

  // 1. Assign based on explicit names in apiGroups
  Object.entries(apiGroups).forEach(([groupName, keywords]) => {
    keywords.forEach(keyword => {
      // Find items that match the keyword exactly or start with it (optional)
      // For now, let's do exact match or loose match?
      // Let's iterate all items and check if they contain the keyword? No, exact match first.
    });
  });

  // Efficient categorization
  allApiItems.forEach(item => {
    let assigned = false;
    
    // Check explicit groups
    for (const [groupName, keywords] of Object.entries(apiGroups)) {
      if (groupName === 'Interfaces' || groupName === 'Others') continue;
      
      // Check if item title is in keywords or starts with a keyword (e.g. TileLayer matches Layer?)
      // Better: check if any keyword is contained in the title?
      // Or just use the hardcoded list strictly?
      // Let's use a smarter check:
      if (keywords.some(k => item.title === k || item.title.includes(k))) {
         // Special handling: "Layer" keyword might match "LayerManagement" which is not an API class
         // But here we are processing API docs only.
         // "TileLayer" includes "Layer".
         groupedApi[groupName].push(item);
         assigned = true;
         break;
      }
    }

    if (!assigned) {
      if (item.type === 'Interfaces') {
        groupedApi['Interfaces'].push(item);
      } else {
        groupedApi['Others'].push(item);
      }
    }
  });

  // Transform to array format expected by template
  const apiSections = Object.entries(groupedApi)
    .filter(([_, items]) => (items as any[]).length > 0)
    .map(([category, items]) => ({
      category,
      items: (items as any[]).sort((a, b) => a.title.localeCompare(b.title))
    }));

  return [guideSection, ...apiSections];
};

const docs = computed(() => getCategorizedDocs());
</script>

<template>
  <div 
    v-if="isOpen" 
    class="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
    @click="closeSidebar"
  ></div>

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
              <span class="truncate hidden sm:inline">{{ t('docs.title') }}</span>
            </h1>
        </div>

        <div class="flex items-center gap-2">
            <div class="hidden md:block">
               <LanguageSwitcher />
            </div>
            <button class="md:hidden text-gray-400 hover:text-white" @click="closeSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
      </div>
      <div class="mt-2 md:hidden">
         <LanguageSwitcher />
      </div>
    </div>
    
    <nav class="flex-1 overflow-y-auto py-4">
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

      <div v-for="category in docs" :key="category.category" class="mb-4">
        <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {{ category.category }}
        </div>
        <ul class="space-y-1 px-3">
          <li v-for="item in category.items" :key="item.path">
            <router-link 
              :to="item.path"
              class="block px-4 py-2.5 rounded-lg transition-colors group"
              :class="route.path === item.path ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-gray-400 hover:bg-gray-700 hover:text-white'"
              @click="closeSidebar"
            >
              <div class="font-medium text-sm">{{ item.title }}</div>
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
