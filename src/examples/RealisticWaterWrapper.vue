<script setup lang="ts">
import RealisticWater from './RealisticWater.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './RealisticWater.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.realisticWater.title')"
    :description="t('examples.realisticWater.description')"
    :code="code"
  >
    <RealisticWater />
  </ExampleViewer>
</template>
