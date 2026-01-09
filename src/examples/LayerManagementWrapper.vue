<script setup lang="ts">
import LayerManagement from './LayerManagement.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './LayerManagement.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.layerManagement.title')"
    :description="t('examples.layerManagement.description')"
    :code="code"
  >
    <LayerManagement />
  </ExampleViewer>
</template>
