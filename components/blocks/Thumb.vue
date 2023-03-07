<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const route = useRoute();

const components = new Map([
  ['featured_default_Entry', resolveComponent('LazyThumbsFeatured')],
  ['shop_default_Entry', resolveComponent('LazyThumbsShop')],
]);

const item = props.data.children[0]
const thumb = item.entry[0]

</script>

<template>
  <div>
    <ElementsHeading :data="{ heading: `${item.label} ${thumb.title}` }" v-pad="{ bottom: 'xs' }" />
    <component :is="components.get(thumb.__typename)" :data="{ ...thumb, size: 'thumb' }" />
  </div>
</template>
