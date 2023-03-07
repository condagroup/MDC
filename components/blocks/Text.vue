<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});
</script>

<template>
  <div>
    <ElementsText
      :data="data"
      :class="['text', `typo--m`]"
      v-pad="{ bottom: 'm' }"
    />
  </div>
</template>
