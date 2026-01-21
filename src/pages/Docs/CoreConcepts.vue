<template>
  <div class="prose prose-blue dark:prose-invert max-w-none">
    <h1>Core Concepts</h1>
    <p class="lead">
      Understand the fundamental concepts behind Terra-GL architecture.
    </p>

    <h2>Viewer</h2>
    <p>
      The <code>Viewer</code> is the main entry point for your application. It manages the WebGL context, the scene graph, and the render loop.
    </p>

    <h2>Layers</h2>
    <p>
      Everything you see on the map is a layer. Terra-GL supports various layer types:
    </p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>TileLayer:</strong> For raster basemaps.</li>
      <li><strong>VectorLayer:</strong> For rendering points, lines, and polygons.</li>
      <li><strong>ModelLayer:</strong> For loading 3D models (glTF/GLB).</li>
    </ul>
  </div>
</template>
