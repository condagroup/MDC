<script setup>
const props = defineProps({
  data: {
    type: Object
  }
})
const route = useRoute();
</script>

<template>
  <template v-if="data.size === 'thumb' && ( route.query?.word == undefined || data.excerpt.toLowerCase().includes(route.query?.word.toLowerCase()) )">
    <ElementsLink :data="{ url: data.url }" v-lay>
      <ElementsText :data="{ text: data.excerpt }" class="typo--l" />
      <ElementsFigure :data="{ image: data.images, ratio: [7, 5] }" />
    </ElementsLink>
  </template>
  <template v-if="data.size === 'stack' && ( route.query?.word == undefined || data.title.toLowerCase().includes(route.query?.word.toLowerCase()) )">
    <ElementsLink :data="{ url: data.url }" v-cols="$mq.m ? 1 : 4">
      <div v-lay="{ dir: 'o' }" v-ratio="[5, 7]">
        <ElementsFigure :data="{ image: data.images, theme: 'cover', ratio: [5, 7] }" v-if="data.images.length" />
        <ElementsText :data="{ text: data.title }" class="title" v-pad="'xs'" />
      </div>
    </ElementsLink>
  </template>
</template>

<style lang="postcss" scoped>
.title {
  align-self: end;
}
</style>