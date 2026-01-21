<template>
  <div class="w-full min-h-full bg-gray-900">
    <ApiContent 
        v-if="htmlContent" 
        :content="htmlContent" 
        category="General" 
        file="Introduction"
    />
    <div v-else-if="loading" class="p-10 text-center text-gray-500">
        Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApiDocs } from '../../composables/useApiDocs';
import ApiContent from '../../components/docs/ApiContent.vue';

const { getIntroductionUrl } = useApiDocs();
const htmlContent = ref<string | null>(null);
const loading = ref(true);

onMounted(async () => {
    try {
        const url = await getIntroductionUrl();
        htmlContent.value = url;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
});
</script>
