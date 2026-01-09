<script setup lang="ts">
import CameraControl from './CameraControl.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './CameraControl.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.cameraControl.title')"
    :description="t('examples.cameraControl.description')"
    :code="code"
  >
    <CameraControl />
  </ExampleViewer>
</template>
