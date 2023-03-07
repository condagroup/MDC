<script setup>
defineProps({
  error: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="error">{{ error || $t('form_error') }}</div>
</template>

<style lang="postcss" scoped>
.error {
  color: var(--color-invalid);
  visibility: hidden;
}
</style>
