<script setup lang="ts">
import PipelineNetwork from './PipelineNetwork.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './PipelineNetwork.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.pipelineNetwork.title')"
    :description="t('examples.pipelineNetwork.description')"
    :code="code"
  >
    <PipelineNetwork />
  </ExampleViewer>
</template>
