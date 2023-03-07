<script setup>
const props = defineProps({
  error: Object,
})
</script>

<template>
  <NuxtLayout>
    {{ error }}
  </NuxtLayout>
</template>
