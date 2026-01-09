<script setup lang="ts">
import ModelLayerExample from './ModelLayerExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './ModelLayerExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.modelLayer.title')"
    :description="t('examples.modelLayer.description')"
    :code="code"
  >
    <ModelLayerExample />
  </ExampleViewer>
</template>
