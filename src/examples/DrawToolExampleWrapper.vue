<script setup lang="ts">
import DrawToolExample from './DrawToolExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './DrawToolExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.drawTool.title')"
    :description="t('examples.drawTool.description')"
    :code="code"
  >
    <DrawToolExample />
  </ExampleViewer>
</template>
