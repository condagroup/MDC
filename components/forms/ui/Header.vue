<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="header">
    <component
      class="typo--p--trimmed"
      :is="data.tag || 'label'"
      :for="data.label"
      v-visible="data.label"
      >{{ data.label }}
      <span v-if="data.required">*</span>
    </component>
    <div v-visible="data.description">
      {{ data.description }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
span {
  color: var(--color-invalid);
}
</style>
