<script setup>
const components = new Map([
  ['sections_image_BlockType', resolveComponent('LazyElementsFigure')],
  ['sections_video_BlockType', resolveComponent('LazyElementsVideo')],
]);

const props = defineProps({
  data: {
    type: Object,
  },
});
</script>

<template>
  <div>
    <div v-for="item in data.children">
      <component :is="components.get(item.__typename)" :data="{ ...item, showCaption: data.showCaption }" />
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
