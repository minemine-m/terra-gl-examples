<script setup lang="ts">
import TileLayerExample from './TileLayerExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './TileLayerExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.tileLayer.title')"
    :description="t('examples.tileLayer.description')"
    :code="code"
  >
    <TileLayerExample />
  </ExampleViewer>
</template>
