<script setup lang="ts">
import BasicMap from './BasicMap.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './BasicMap.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.basicMap.title')"
    :description="t('examples.basicMap.description')"
    :code="code"
  >
    <BasicMap />
  </ExampleViewer>
</template>
