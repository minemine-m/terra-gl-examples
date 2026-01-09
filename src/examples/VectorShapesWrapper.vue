<script setup lang="ts">
import VectorShapes from './VectorShapes.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './VectorShapes.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.vectorShapes.title')"
    :description="t('examples.vectorShapes.description')"
    :code="code"
  >
    <VectorShapes />
  </ExampleViewer>
</template>
