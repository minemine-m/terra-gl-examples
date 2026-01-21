<template>
  <span class="font-mono text-sm inline-block">
    <template v-if="!type">
      <span class="text-gray-400">void</span>
    </template>
    <template v-else-if="type.type === 'intrinsic'">
      <span class="text-blue-400">{{ type.name }}</span>
    </template>
    <template v-else-if="type.type === 'reference'">
      <span 
        class="text-teal-400 cursor-pointer hover:underline" 
        @click.stop="$emit('navigate', type.name)"
      >{{ type.name }}</span>
      <template v-if="type.typeArguments">
        <span class="text-gray-500">&lt;</span>
        <span v-for="(arg, idx) in type.typeArguments" :key="idx">
          <TypeRenderer :type="arg" @navigate="$emit('navigate', $event)" />
          <span v-if="idx < type.typeArguments.length - 1" class="text-gray-500">, </span>
        </span>
        <span class="text-gray-500">&gt;</span>
      </template>
    </template>
    <template v-else-if="type.type === 'union'">
      <span v-for="(t, idx) in type.types" :key="idx">
        <TypeRenderer :type="t" @navigate="$emit('navigate', $event)" />
        <span v-if="idx < type.types.length - 1" class="text-gray-500"> | </span>
      </span>
    </template>
    <template v-else-if="type.type === 'array'">
      <TypeRenderer :type="type.elementType" @navigate="$emit('navigate', $event)" /><span class="text-gray-500">[]</span>
    </template>
    <template v-else-if="type.type === 'reflection'">
      <span class="text-gray-400">{ </span>
      <template v-if="type.declaration?.children">
        <span v-for="(child, idx) in type.declaration.children" :key="child.id">
           <span class="text-gray-200">{{ child.name }}</span>: <TypeRenderer v-if="child.type" :type="child.type" @navigate="$emit('navigate', $event)" />
           <span v-if="idx < type.declaration.children.length - 1">; </span>
        </span>
      </template>
      <span class="text-gray-400"> }</span>
    </template>
    <template v-else-if="type.type === 'literal'">
       <span class="text-green-400">"{{ type.value }}"</span>
    </template>
    <template v-else>
      <span class="text-gray-400">{{ type.name || 'any' }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import type { DocType } from '../../composables/useApiDocs';

defineProps<{
  type?: DocType;
}>();

defineEmits<{
  (e: 'navigate', name: string): void;
}>();
</script>
