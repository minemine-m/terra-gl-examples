<script setup lang="ts">
import VolumetricClouds from './VolumetricClouds.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './VolumetricClouds.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.volumetricClouds.title')"
    :description="t('examples.volumetricClouds.description')"
    :code="code"
  >
    <VolumetricClouds />
  </ExampleViewer>
</template>
