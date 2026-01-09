<script setup lang="ts">
import LabelExample from './LabelExample.vue';
import ExampleViewer from '../components/ExampleViewer.vue';
import { code } from './LabelExample.source';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <ExampleViewer 
    :title="t('examples.labelExample.title')"
    :description="t('examples.labelExample.description')"
    :code="code"
  >
    <LabelExample />
  </ExampleViewer>
</template>
