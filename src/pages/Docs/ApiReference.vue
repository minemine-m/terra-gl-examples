<template>
  <div class="w-full min-h-full bg-gray-900">
    <ApiContent 
        v-if="htmlContent" 
        :content="htmlContent" 
        :category="category" 
        :file="file"
    />
    <div v-else-if="loading" class="p-10 text-center text-gray-500">
        Loading...
    </div>
    <div v-else class="p-10 text-center text-gray-500 flex flex-col items-center justify-center h-full">
        <svg class="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        <p class="text-xl font-light">Select an API item from the sidebar to view details</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useApiDocs } from '../../composables/useApiDocs';
import ApiContent from '../../components/docs/ApiContent.vue';

const route = useRoute();
const { getDocContent } = useApiDocs();

const htmlContent = ref<string | null>(null);
const loading = ref(false);

const category = computed(() => route.params.category as string);
const file = computed(() => route.params.file as string);

watch(
    () => [route.params.category, route.params.file],
    async ([newCategory, newFile]) => {
        if (newCategory && newFile) {
            loading.value = true;
            try {
                htmlContent.value = await getDocContent(newCategory as string, newFile as string);
            } catch (e) {
                console.error('Failed to load doc content:', e);
                htmlContent.value = null;
            } finally {
                loading.value = false;
            }
        } else {
            htmlContent.value = null;
        }
    },
    { immediate: true }
);
</script>
