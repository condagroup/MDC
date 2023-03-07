<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const { color, typo, tag } = props.data;
</script>

<template>
  <component :key="data.heading" :class="[
    'text',
    color,
    `typo--${typo || 'm'
    }`,
  ]" :is="tag || 'div'">
    <div v-swap="data.heading" />
  </component>
</template>

<style lang="postcss" scoped>
.text {}
</style>
