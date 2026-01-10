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
    backToHome: 'Back to Home',
    categories: {
      mapControl: 'Map Control',
      layers: 'Layers',
      geometryInteraction: 'Geometry & Interaction',
      advancedVisuals: 'Advanced Visuals'
    }
  },
  examples: {
    terrain3d: {
      title: '3D Terrain',
      description: 'Rendering 3D terrain with elevation data. Use right-click or Ctrl+drag to tilt the camera.'
    },
    cameraControl: {
      title: 'Camera Control',
      description: 'Control camera flight, rotation, and perspective switching.'
    },
    layerManagement: {
      title: 'Layer Management',
      description: 'Add, remove layers, and control layer visibility.'
    },
    uiComponents: {
      title: 'UI Components',
      description: 'InfoWindows and custom HTML Markers (UIMarker).'
    },
    pipelineNetwork: {
      title: 'Pipeline Network',
      description: 'Load and visualize underground pipeline GeoJSON data with valves.'
    },
    realisticWater: {
      title: 'Realistic Water',
      description: 'Render realistic water surfaces with normal maps and reflections.'
    },
    volumetricClouds: {
      title: 'Volumetric Clouds',
      description: 'Generate dynamic volumetric cloud layers in the sky.'
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
    },
    labelExample: {
      title: 'Text Labels',
      description: 'Display and customize text labels on the map.',
      panelTitle: 'Label Controls',
      content: 'Content',
      size: 'Size',
      textColor: 'Text Color',
      bgColor: 'Bg Color',
      rotation: 'Rotation',
      background: 'Background'
    },
    markerStyles: {
      title: 'Marker Styles',
      description: 'Showcase different marker styles like icons and basic points.',
      panelTitle: 'Marker Controls',
      flyTo: 'Fly To',
      resize: 'Resize',
      color: 'Color',
      iconMarker: 'Icon Marker',
      redCircle: 'Red Circle',
      blueDot: 'Blue Dot',
      clickTip: '* Click "Fly To" to navigate and open popup'
    },
    geometryStyles: {
      title: 'Geometry Styles',
      description: 'Demonstrate various styles for lines and polygons.',
      panelTitle: 'Style Controls',
      cyanLine: 'Cyan Line',
      greenPolygon: 'Green Polygon',
      width: 'Width',
      color: 'Color',
      opacity: 'Opacity',
      borderWidth: 'Border Width'
    },
    modelLayer: {
      title: '3D Models',
      description: 'Load and render 3D GLTF models on the map.',
      panelTitle: 'Model Controls',
      duckModel: 'Duck Model',
      cesiumMan: 'Cesium Man',
      scale: 'Scale',
      rotation: 'Rotation'
    },
    layerOperations: {
      title: 'Layer Operations',
      description: 'Dynamically add, remove, and toggle layers by ID.',
      panelTitle: 'Layer Operations',
      addRandomLayer: 'Add Random Layer',
      toggleLast: 'Toggle Last',
      removeLast: 'Remove Last',
      operationLogs: 'Operation Logs',
      noOperationsYet: 'No operations yet'
    },
    layerProperties: {
      title: 'Layer Properties',
      description: 'Adjust layer opacity and altitude in real-time.',
      panelTitle: 'Layer Properties',
      opacity: 'Opacity',
      altitude: 'Altitude'
    },
    zhengzhouNight: {
      title: 'Zhengzhou Night',
      description: 'A comprehensive demo of Zhengzhou city night scene with pipelines, models and lighting.'
    }
  },
  viewer: {
    preview: 'Preview',
    code: 'Code',
    copy: 'Copy',
    copied: 'Copied!'
  }
}
