<template>
  <div class="h-full flex flex-col bg-gray-900 border-r border-gray-800 w-72">
    <!-- Search Bar -->
    <div class="p-4 border-b border-gray-800">
      <div class="mb-4">
        <router-link to="/" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span class="text-sm font-medium">Back to Home</span>
        </router-link>
      </div>
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search API..." 
          class="w-full bg-gray-800 text-gray-200 text-sm rounded-md pl-9 pr-3 py-2 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder-gray-500"
        />
        <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 overflow-y-auto custom-scrollbar p-3">
      <div v-if="loading" class="text-center py-4 text-gray-500">
          Loading...
      </div>
      
      <div v-else class="space-y-6">
        <div v-for="group in filteredGroups" :key="group.name" class="space-y-2">
          <h3 class="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 sticky top-0 bg-gray-900/90 backdrop-blur-sm py-2 z-10 border-b border-gray-800/50">
            {{ group.name }}
            <span class="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded-full text-gray-400">{{ group.items.length }}</span>
          </h3>
          
          <ul class="space-y-0.5">
            <li v-for="item in group.items" :key="item.path">
              <router-link 
                :to="'/docs/' + item.path"
                :class="[
                  'block px-3 py-1.5 rounded-md text-[13px] transition-colors duration-200 flex items-center justify-between group',
                  isActive(item)
                    ? 'bg-blue-900/40 text-blue-300 font-medium' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                ]"
              >
                <div class="flex items-center gap-2 truncate">
                    <span 
                        :class="['flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold border', getKindStyle(item.kind)]"
                        :title="item.kind"
                    >
                        {{ getKindLabel(item.kind) }}
                    </span>
                    <span class="truncate" :title="item.name">{{ item.name }}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <div v-if="filteredGroups.length === 0" class="text-center py-8 text-gray-500 text-sm">
          No matches found
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useApiDocs, type DocFile } from '../../composables/useApiDocs';

const route = useRoute();
const { docs, loading } = useApiDocs();
const searchQuery = ref('');

const filteredGroups = computed(() => {
  if (!searchQuery.value) return docs.value;
  
  const q = searchQuery.value.toLowerCase();
  // Filter items but keep structure
  return docs.value.map(group => ({
    ...group,
    items: group.items.filter(item => 
        item.name.toLowerCase().includes(q) || 
        group.name.toLowerCase().includes(q)
    )
  })).filter(group => group.items.length > 0);
});

const isActive = (item: DocFile) => {
    // Current route params: category, file
    // Note: route.params.category is the folder (e.g. classes), route.params.file is filename (e.g. TileSystem.TileMap)
    // item.path is "classes/TileSystem.TileMap"
    // So we can compare item.path with category + '/' + file
    const currentPath = `${route.params.category}/${route.params.file}`;
    return currentPath === item.path;
};

const getKindLabel = (kind: string) => {
    switch(kind) {
        case 'classes': return 'C';
        case 'interfaces': return 'I';
        case 'functions': return 'F';
        case 'types': return 'T';
        case 'enums': return 'E';
        case 'modules': return 'M';
        case 'variables': return 'V';
        default: return kind.charAt(0).toUpperCase();
    }
};

const getKindStyle = (kind: string) => {
    switch(kind) {
        case 'classes': return 'border-blue-700/50 text-blue-400 bg-blue-900/20';
        case 'interfaces': return 'border-green-700/50 text-green-400 bg-green-900/20';
        case 'functions': return 'border-purple-700/50 text-purple-400 bg-purple-900/20';
        case 'types': return 'border-yellow-700/50 text-yellow-400 bg-yellow-900/20';
        case 'enums': return 'border-orange-700/50 text-orange-400 bg-orange-900/20';
        case 'modules': return 'border-red-700/50 text-red-400 bg-red-900/20';
        default: return 'border-gray-700 text-gray-400 bg-gray-800';
    }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #374151;
  border-radius: 20px;
}
</style>
