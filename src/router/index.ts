import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import LandingPage from '../pages/LandingPage.vue'
import ExamplesGallery from '../pages/ExamplesGallery.vue'
import Terrain3DWrapper from '../examples/Terrain3DWrapper.vue'
import BasicMapWrapper from '../examples/BasicMapWrapper.vue'

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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
