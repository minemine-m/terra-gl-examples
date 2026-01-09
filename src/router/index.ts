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
import CameraControlWrapper from '../examples/CameraControlWrapper.vue'
import LayerManagementWrapper from '../examples/LayerManagementWrapper.vue'
import UIComponentsWrapper from '../examples/UIComponentsWrapper.vue'
import PipelineNetworkWrapper from '../examples/PipelineNetworkWrapper.vue'
import RealisticWaterWrapper from '../examples/RealisticWaterWrapper.vue'
import VolumetricCloudsWrapper from '../examples/VolumetricCloudsWrapper.vue'
import MarkerStylesExampleWrapper from '../examples/MarkerStylesExampleWrapper.vue'
import GeometryStylesExampleWrapper from '../examples/GeometryStylesExampleWrapper.vue'
import ModelLayerExampleWrapper from '../examples/ModelLayerExampleWrapper.vue'
import LayerOperationsExampleWrapper from '../examples/LayerOperationsExampleWrapper.vue'
import LayerPropertiesExampleWrapper from '../examples/LayerPropertiesExampleWrapper.vue'
import LabelExampleWrapper from '../examples/LabelExampleWrapper.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/gallery',
    name: 'gallery',
    redirect: '/examples/basic-map'
    // component: ExamplesGallery
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
      },
      {
        path: 'camera-control',
        name: 'camera-control',
        component: CameraControlWrapper
      },
      {
        path: 'layer-management',
        name: 'layer-management',
        component: LayerManagementWrapper
      },
      {
        path: 'ui-components',
        name: 'ui-components',
        component: UIComponentsWrapper
      },
      {
        path: 'pipeline-network',
        name: 'pipeline-network',
        component: PipelineNetworkWrapper
      },
      {
        path: 'realistic-water',
        name: 'realistic-water',
        component: RealisticWaterWrapper
      },
      {
        path: 'volumetric-clouds',
        name: 'volumetric-clouds',
        component: VolumetricCloudsWrapper
      },
      {
        path: 'marker-styles',
        name: 'marker-styles',
        component: MarkerStylesExampleWrapper
      },
      {
        path: 'geometry-styles',
        name: 'geometry-styles',
        component: GeometryStylesExampleWrapper
      },
      {
        path: 'model-layer',
        name: 'model-layer',
        component: ModelLayerExampleWrapper
      },
      {
        path: 'layer-operations',
        name: 'layer-operations',
        component: LayerOperationsExampleWrapper
      },
      {
        path: 'layer-properties',
        name: 'layer-properties',
        component: LayerPropertiesExampleWrapper
      },
      {
        path: 'label-example',
        name: 'label-example',
        component: LabelExampleWrapper
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
