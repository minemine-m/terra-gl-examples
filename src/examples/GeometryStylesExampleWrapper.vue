<script setup lang="ts">
import GeometryStylesExample from './GeometryStylesExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './GeometryStylesExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.geometryStyles.title')"
    :description="t('examples.geometryStyles.description')"
    :code="code"
  >
    <GeometryStylesExample />
  </ExampleViewer>
</template>
