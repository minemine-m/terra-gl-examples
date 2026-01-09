export default {
  nav: {
    home: 'Home',
    examples: 'Examples'
  },
  home: {
    title: 'Terra-GL',
    subtitle: 'A powerful 3D map engine for the web',
    description: 'Build high-performance, immersive 3D geographic visualizations with ease. Terra-GL leverages WebGL to render massive terrain and map data directly in the browser.',
    getStarted: 'Get Started',
    examplesTitle: 'Explore Examples',
    examplesSubtitle: 'Explore the possibilities of Terra-GL with these interactive demos.',
    viewExample: 'View Example'
  },
  sidebar: {
    title: 'Terra-GL',
    subtitle: 'Examples',
    footer: "Powered by {'@'}terra.gl/core",
    backToHome: 'Back to Home'
  },
  examples: {
    terrain3d: {
      title: '3D Terrain',
      description: 'Rendering 3D terrain with elevation data. Use right-click or Ctrl+drag to tilt the camera.'
    },
    basicMap: {
      title: 'Basic Map',
      description: 'A simple 2D map using OpenStreetMap raster tiles.'
    },
    mapEvents: {
      title: 'Map Events',
      description: 'Listen to and handle map interaction events like click, zoom, and move.',
      panelTitle: 'Event Logs',
      placeholder: 'Interact with map to see events...'
    },
    tileLayer: {
      title: 'Tile Layer Switching',
      description: 'Switch between different basemap services (Dark, Light, Satellite).',
      panelTitle: 'Base Layer',
      layers: {
        dark: 'Carto Dark',
        light: 'Carto Light',
        osm: 'OpenStreetMap',
        satellite: 'ArcGIS Satellite'
      }
    },
    markerExample: {
      title: 'Markers & Popups',
      description: 'Add icon markers to the map and configure custom click popups.'
    },
    vectorShapes: {
      title: 'Vector Shapes',
      description: 'Draw polygons and lines to demonstrate basic vector layer usage.'
    },
    drawTool: {
      title: 'Draw Tool',
      description: 'Interactively draw points, lines, and polygons.',
      panelTitle: 'Draw Tool',
      mode: {
        polygon: 'Polygon',
        line: 'Line',
        point: 'Point'
      },
      clear: 'Clear All'
    }
  },
  viewer: {
    preview: 'Preview',
    code: 'Code',
    copy: 'Copy',
    copied: 'Copied!'
  }
}
