<script setup lang="ts">
import Terrain3D from './Terrain3D.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './Terrain3D.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.terrain3d.title')"
    :description="t('examples.terrain3d.description')"
    :code="code"
  >
    <Terrain3D />
  </ExampleViewer>
</template>
