<script setup lang="ts">
import LayerPropertiesExample from './LayerPropertiesExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './LayerPropertiesExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.layerProperties.title')"
    :description="t('examples.layerProperties.description')"
    :code="code"
  >
    <LayerPropertiesExample />
  </ExampleViewer>
</template>
