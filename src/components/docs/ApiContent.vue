<template>
  <div class="w-full h-full flex flex-col font-sans text-gray-100 api-content-wrapper overflow-hidden bg-[#111827]">
    <!-- Breadcrumb (Optional, kept for context but could be removed if redundant) -->
    <div class="flex-none px-4 py-2 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm z-10 flex items-center justify-between">
      <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
        <span class="text-blue-400">API Reference</span>
        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <span>{{ category }}</span>
        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <span class="text-gray-200">{{ displayFile }}</span>
      </div>
      
      <!-- Open original button -->
      <a :href="content" target="_blank" class="text-xs text-blue-500 hover:text-blue-400 flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        Open Raw
      </a>
    </div>

    <!-- Iframe Container -->
    <div class="flex-1 w-full h-full relative bg-[#111827]">
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-20 bg-gray-900">
             <span class="text-gray-400">Loading...</span>
        </div>
        <iframe 
            v-if="content"
            ref="iframeRef"
            :src="content"
            class="w-full h-full border-0 block"
            @load="onIframeLoad"
        ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  content: string; // This is now the URL
  category: string;
  file: string;
}>();

const router = useRouter();
const iframeRef = ref<HTMLIFrameElement | null>(null);
const loading = ref(true);

const displayFile = computed(() => {
    if (props.file.includes('.')) {
        return props.file.split('.').pop();
    }
    return props.file;
});

watch(() => props.content, () => {
    loading.value = true;
});

const onIframeLoad = () => {
    loading.value = false;
    const iframe = iframeRef.value;
    if (!iframe || !iframe.contentDocument) return;

    const doc = iframe.contentDocument;

    // 1. Force TypeDoc to use Dark Mode (if supported by the template)
    try {
        doc.documentElement.dataset.theme = 'dark';
        localStorage.setItem("tsd-theme", "dark");
    } catch (e) { /* ignore */ }

    // 2. Inject Custom Styles to override TypeDoc layout and colors
    const style = doc.createElement('style');
    style.textContent = `
        /* Ensure full height and proper scrolling */
        html {
            height: 100% !important;
            overflow: hidden !important; /* Let body handle scrolling */
        }
        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            background-color: #111827 !important; /* gray-900 */
            color: #e5e7eb !important; /* gray-200 */
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            display: block !important;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #111827; 
        }
        ::-webkit-scrollbar-thumb {
            background-color: #374151;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: #4b5563;
        }

        /* Hide TypeDoc Header and Sidebar */
        .tsd-page-toolbar, 
        .col-menu, 
        .tsd-navigation, 
        .site-menu,
        footer,
        .tsd-breadcrumb { 
            display: none !important; 
        }

        /* Adjust Layout */
        .container,
        .container-main { 
            max-width: 100% !important; 
            padding: 1rem 1.5rem !important; 
            margin: 0 !important;
            width: 100% !important;
            min-height: 100% !important;
            /* Flex layout to remove grid gaps */
            display: flex !important;
            flex-direction: row !important;
        }
        .col-content {
            flex: 1 !important;
            width: auto !important;
            max-width: none !important;
            float: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        /* Keep right sidebar visible but fixed width */
        .col-sidebar {
            flex: 0 0 18rem !important;
            margin: 0 !important;
            padding-left: 1.5rem !important;
        }
        
        .tsd-panel {
            background-color: #1f2937 !important; /* gray-800 */
            border: 1px solid #374151 !important; /* gray-700 */
            box-shadow: none !important;
            margin-bottom: 2rem !important;
        }

        h1, h2, h3, h4, h5, h6 {
            color: #f3f4f6 !important; /* gray-100 */
        }

        a {
            color: #60a5fa !important; /* blue-400 */
            text-decoration: none !important;
        }
        a:hover {
            text-decoration: underline !important;
        }

        code, pre {
            background-color: #111827 !important; /* gray-900 */
            border: 1px solid #374151 !important;
            color: #e5e7eb !important;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
        }
        
        /* Table styles */
        .table-wrap {
            overflow-x: auto;
        }
        table {
            background-color: #1f2937 !important;
        }
        thead tr {
            background-color: #374151 !important;
        }
        tbody tr:nth-child(even) {
            background-color: #1f2937 !important;
        }
        tbody tr:nth-child(odd) {
            background-color: #111827 !important;
        }
        td, th {
            border-color: #4b5563 !important;
            color: #d1d5db !important;
        }
    `;
    doc.head.appendChild(style);

    // 3. Intercept Links for SPA Navigation
    doc.body.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).closest('a');
        if (target) {
            const href = target.getAttribute('href');
            
            // If it's an anchor link within the page
            if (href && href.startsWith('#')) {
                // Let default behavior happen (scroll)
                // Or implement smooth scroll if needed
                return;
            }

            // If it's a relative link to another doc
            if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
                e.preventDefault();
                
                // Parse the path
                // href might be "../classes/TileSystem.TileMap.html" or "TileSystem.TileMap.html"
                let targetPath = href;
                if (targetPath.startsWith('../')) {
                    targetPath = targetPath.substring(3);
                }
                
                const match = targetPath.match(/^([^/]+)\/(.+)\.html$/);
                if (match) {
                    const [, folder, filename] = match;
                    router.push(`/docs/${folder}/${filename}`);
                } else if (targetPath.endsWith('.html')) {
                    // Try to guess folder if missing
                    // Maybe we are in /classes/ and link is "Something.html"
                    const currentFolder = props.category === 'General' ? 'classes' : props.category; 
                    // Wait, props.category is the Module Name (e.g. TileSystem), NOT the folder (classes/interfaces)
                    // We don't strictly know the folder of the target file without checking the file structure.
                    // But usually TypeDoc generates links with full relative path "../classes/..."
                    
                    // If the link is just "Something.html", it might be in the same folder as current file.
                    // But we don't have the current file's physical folder passed in props (only category/file).
                    // Actually, useApiDocs knows the structure.
                    
                    // For now, let's assume if it has no folder prefix, we might fail or need a better heuristic.
                    // But based on file listing, most links likely have "../classes/" prefix.
                }
            }
        }
    });
};
</script>

<style scoped>
/* No scoped styles needed as we inject into iframe */
</style>
