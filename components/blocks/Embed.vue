<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const mq = inject("mq");
const cols = computed(() => {
  let value = 8;

  if (mq.value.m) {
    value = "3 / span 4";
  }

  return value;
});
</script>

<template>
  <div>
    <ElementsEmbed v-cols="cols" :data="data" />
  </div>
</template>
