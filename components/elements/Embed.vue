<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const { embed } = props.data;
const el = ref();
const x = ref(16);
const y = ref(9);

onMounted(() => {
  const iframe = el.value.querySelector("iframe");
  if (iframe) {
    x.value = iframe.getAttribute("width");
    y.value = iframe.getAttribute("height");
  }
});
</script>

<template>
  <div v-ratio="[x, y]" class="embed" ref="el" v-html="embed" />
</template>

<style lang="postcss">
.embed {
  width: 100%;

  * {
    width: inherit;
    height: 100%;
  }
}
</style>
