<script setup lang="ts">
import LayerOperationsExample from './LayerOperationsExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './LayerOperationsExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.layerOperations.title')"
    :description="t('examples.layerOperations.description')"
    :code="code"
  >
    <LayerOperationsExample />
  </ExampleViewer>
</template>
