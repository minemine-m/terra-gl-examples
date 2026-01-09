<script setup lang="ts">
import MarkerExample from './MarkerExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './MarkerExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.markerExample.title')"
    :description="t('examples.markerExample.description')"
    :code="code"
  >
    <MarkerExample />
  </ExampleViewer>
</template>
