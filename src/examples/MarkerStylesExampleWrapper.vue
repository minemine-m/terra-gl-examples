<script setup lang="ts">
import MarkerStylesExample from './MarkerStylesExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './MarkerStylesExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.markerStyles.title')"
    :description="t('examples.markerStyles.description')"
    :code="code"
  >
    <MarkerStylesExample />
  </ExampleViewer>
</template>
