# Terra-GL 3D Terrain Example

This project demonstrates how to use `@terra.gl/core` to render a 3D terrain map with Vue 3 and TypeScript.

## Features
- **3D Terrain**: Visualizes terrain elevation using MapLibre demo terrain tiles (Terrain-RGB).
- **Interactive Controls**: Adjust Pitch and Bearing (Rotation) via UI controls.
- **Map Navigation**: Full standard map controls (Zoom, Pan, Tilt, Rotate).
- **Tech Stack**: Vue 3, TypeScript, Vite, Tailwind CSS, @terra.gl/core.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open your browser at the provided URL (usually `http://localhost:5173`).

## Project Structure

- `src/components/MapContainer.vue`: Main component initializing `terra.Map` and configuring the terrain source.
- `src/components/ControlPanel.vue`: UI for camera controls.
- `src/pages/HomePage.vue`: Page layout integrating map and controls.

## Note on Terrain Source
This example uses the MapLibre demo terrain tiles (`https://demotiles.maplibre.org/terrain-tiles/`) which are in Mapbox Terrain-RGB format. This demonstrates the compatibility of `@terra.gl/core` with standard terrain formats.
