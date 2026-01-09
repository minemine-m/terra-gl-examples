import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import LandingPage from '../pages/LandingPage.vue'
import ExamplesGallery from '../pages/ExamplesGallery.vue'
import Terrain3DWrapper from '../examples/Terrain3DWrapper.vue'
import BasicMapWrapper from '../examples/BasicMapWrapper.vue'
import MapEventsWrapper from '../examples/MapEventsWrapper.vue'
import TileLayerExampleWrapper from '../examples/TileLayerExampleWrapper.vue'
import MarkerExampleWrapper from '../examples/MarkerExampleWrapper.vue'
import VectorShapesWrapper from '../examples/VectorShapesWrapper.vue'
import DrawToolExampleWrapper from '../examples/DrawToolExampleWrapper.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: ExamplesGallery
  },
  {
    path: '/examples',
    component: MainLayout,
    children: [
      {
        path: 'terrain-3d',
        name: 'terrain-3d',
        component: Terrain3DWrapper
      },
      {
        path: 'basic-map',
        name: 'basic-map',
        component: BasicMapWrapper
      },
      {
        path: 'map-events',
        name: 'map-events',
        component: MapEventsWrapper
      },
      {
        path: 'tile-layer',
        name: 'tile-layer',
        component: TileLayerExampleWrapper
      },
      {
        path: 'marker-example',
        name: 'marker-example',
        component: MarkerExampleWrapper
      },
      {
        path: 'vector-shapes',
        name: 'vector-shapes',
        component: VectorShapesWrapper
      },
      {
        path: 'draw-tool',
        name: 'draw-tool',
        component: DrawToolExampleWrapper
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
