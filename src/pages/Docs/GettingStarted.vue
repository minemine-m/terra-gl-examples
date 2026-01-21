<template>
  <div class="prose prose-blue dark:prose-invert max-w-none">
    <h1>Getting Started</h1>
    <p class="lead">
      Learn how to install Terra-GL and create your first 3D map application.
    </p>

    <h2>Installation</h2>
    <div class="not-prose bg-gray-900 rounded-lg overflow-hidden my-6">
        <div class="flex items-center px-4 py-2 bg-gray-800/50 border-b border-gray-700">
            <span class="text-xs text-gray-400 font-mono">Terminal</span>
        </div>
        <pre class="p-4 overflow-x-auto text-sm text-gray-300 font-mono"><code>npm install @terra.gl/core</code></pre>
    </div>

    <h2>Basic Usage</h2>
    <p>Here is a simple example to initialize a map:</p>
    
    <div class="not-prose bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden my-6">
        <pre class="p-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-300"><code>import { Viewer } from '@terra.gl/core';

const viewer = new Viewer('container', {
  terrain: {
    enabled: true
  }
});</code></pre>
    </div>
  </div>
</template>
