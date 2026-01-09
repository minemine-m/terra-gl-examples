<script setup lang="ts">
import MapEvents from './MapEvents.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './MapEvents.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.mapEvents.title')"
    :description="t('examples.mapEvents.description')"
    :code="code"
  >
    <MapEvents />
  </ExampleViewer>
</template>
