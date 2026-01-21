import { ref, computed } from 'vue';

// Define the structure of our documentation tree
export interface DocFile {
  name: string; // Display name (e.g., TileMap)
  path: string; // Routing path (e.g., classes/TileSystem.TileMap)
  fullPath: string; // full import path
  category: string; // Group name (e.g., TileSystem)
  kind: string; // 'class', 'interface', 'function', 'module', etc. (derived from folder)
  load: () => Promise<string>;
}

export interface DocGroup {
  name: string;
  items: DocFile[];
}

// We keep the glob to scan the file structure, but we will load content from static /reference folder
// const htmlModules = import.meta.glob('/src/docs/**/*.html', { query: '?url', import: 'default' });
import rawDocsList from '../docs-list.json';

// Normalize paths to ensure they start with /src/docs/ to match existing logic if needed
const docsPaths = rawDocsList.map(p => p.startsWith('/') ? p : '/' + p);

// Helper to convert src path to static public path
const getStaticUrl = (srcPath: string) => {
    // /src/docs/classes/Name.html -> /reference/classes/Name.html
    const relative = srcPath.replace(/^\/?src\/docs\//, '');
    // Handle base URL if app is deployed in subdirectory
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    return `${base}reference/${relative}`;
};

export function useApiDocs() {
  const docs = ref<DocGroup[]>([]);
  const loading = ref(true);

  // Initialize the documentation structure
  const initDocs = async () => {
    const groups: Record<string, DocFile[]> = {};

    for (const path of docsPaths) {
      // path example: /src/docs/classes/TileSystem.TileMap.html
      
      const match = path.match(/\/src\/docs\/([^/]+)\/(.+)\.html$/);
      if (match) {
        const [, folder, filename] = match;
        
        // Skip specific index files
        if (filename === 'index' || filename === 'hierarchy' || filename === 'modules') {
           continue; 
        }

        // Determine Category (Module) and Name
        let category = 'General';
        let name = filename;
        
        // Check if filename contains a dot (indicating Module.Member)
        const dotIndex = filename.indexOf('.');
        if (dotIndex > 0) {
            category = filename.substring(0, dotIndex);
            name = filename.substring(dotIndex + 1);
        } else if (folder === 'modules') {
            category = filename;
            name = 'Overview'; 
        }

        const fileInfo: DocFile = {
          name,
          path: `${folder}/${filename}`, // Keep original path for loading
          fullPath: path,
          category,
          kind: folder, // classes, interfaces, functions, etc.
          load: async () => {
             return getStaticUrl(path);
          }
        };

        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(fileInfo);
      }
    }

    // Sort groups and items
    docs.value = Object.keys(groups)
      .sort()
      .map(category => {
        // Sort items: Overview first, then alphabetical
        const items = groups[category].sort((a, b) => {
            if (a.name === 'Overview') return -1;
            if (b.name === 'Overview') return 1;
            return a.name.localeCompare(b.name);
        });
        return {
            name: category,
            items
        };
      });
      
    loading.value = false;
  };

  // Call init immediately
  initDocs();

  const getDocContent = async (folder: string, file: string) => {
    // Note: here 'file' is the filename without extension, e.g. TileSystem.TileMap
    // 'folder' is the physical folder, e.g. classes
    const path = `/src/docs/${folder}/${file}.html`;
    if (docsPaths.includes(path)) {
      return getStaticUrl(path);
    }
    throw new Error(`Document not found: ${path}`);
  };

  const getIntroductionUrl = async () => {
      const path = '/src/docs/index.html';
      if (docsPaths.includes(path)) {
          return getStaticUrl(path);
      }
      return null;
  };

  return {
    docs,
    loading,
    getDocContent,
    getIntroductionUrl
  };
}
