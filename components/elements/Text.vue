<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const { typo, tag } = props.data;
</script>

<template>
  <component :key="data.text" :class="[
    'text',
    props.data.color,
    `typo--${typo || 'm'
    }`,
  ]" :is="tag || 'div'">
    <div v-swap="data.text" />
  </component>
</template>

<style lang="postcss" scoped>
.text {
}

.red {
  color: #ff1b1b
}

.orange {
  color: #FF901B
}

.gray {
  color: #A3A3A3;
}
</style>
