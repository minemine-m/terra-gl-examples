<script setup lang="ts">
import { ref, computed } from 'vue';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/atom-one-dark.css';
import { useI18n } from 'vue-i18n';

// Register languages
hljs.registerLanguage('xml', xml);

const props = defineProps<{
  code: string;
  title: string;
  description?: string;
}>();

const { t } = useI18n();
const activeTab = ref<'preview' | 'code'>('preview');
const copied = ref(false);

const highlightedCode = computed(() => {
  return hljs.highlight(props.code, { language: 'xml' }).value;
});

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
};
</script>

<template>
  <div class="flex flex-col h-full w-full bg-gray-900">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
      <div>
        <h1 class="text-xl font-bold text-white">{{ title }}</h1>
        <p v-if="description" class="text-sm text-gray-400 mt-1">{{ description }}</p>
      </div>
      
      <!-- Tab Switcher -->
      <div class="flex items-center gap-4">
        <div class="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
          <button 
            @click="activeTab = 'preview'"
            class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            :class="activeTab === 'preview' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'"
          >
            {{ t('viewer.preview') }}
          </button>
          <button 
            @click="activeTab = 'code'"
            class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            :class="activeTab === 'code' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'"
          >
            {{ t('viewer.code') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 relative overflow-hidden">
      <!-- Preview Mode -->
      <div v-show="activeTab === 'preview'" class="w-full h-full">
        <slot></slot>
      </div>

      <!-- Code Mode -->
      <div v-show="activeTab === 'code'" class="w-full h-full relative group">
        <!-- Copy Button -->
        <button 
          @click="copyCode"
          class="absolute top-4 right-8 px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-xs text-white transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-600"
        >
          {{ copied ? t('viewer.copied') : t('viewer.copy') }}
        </button>
        
        <div class="w-full h-full overflow-auto bg-[#282c34] p-6">
          <pre><code class="language-xml" v-html="highlightedCode"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar styling for code view */
pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>
