<script setup lang="ts">
import UIComponents from './UIComponents.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './UIComponents.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.uiComponents.title')"
    :description="t('examples.uiComponents.description')"
    :code="code"
  >
    <UIComponents />
  </ExampleViewer>
</template>
