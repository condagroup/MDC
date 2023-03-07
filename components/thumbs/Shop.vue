<script setup>
const props = defineProps({
  data: {
    type: Object
  }
})
const route = useRoute();
</script>

<template>
  <div v-if="route.query?.word == undefined || data.title.toLowerCase().includes(route.query?.word.toLowerCase()) || data.artists.toLowerCase().includes(route.query?.word.toLowerCase())">
    <ElementsLink :data="{ url: data.url }">
      <div v-ratio="[5, 7]">
        <ElementsFigure :data="{ image: data.images, theme: 'cover' }" v-if="data.images.length" />
      </div>
      <div v-grid="{ cols: '2', gap: '0', dir: 'o', align: ['start', 'even'] }" v-pad="{ top: 'xs', bottom: 'l' }">
        <div class="title-artist">
          <ElementsText :data="{ text: data.title }" class="title" v-cols="3" />
          <ElementsText :data="{ text: data.artists }" />
        </div>
        <ElementsText :data="{ text: `${data.price} €` }" class="price" v-lay="{ align: 'end' }" />
      </div>
    </ElementsLink>
  </div>
</template>

<style lang="postcss" scoped>
.title {
}
.title-artist {
  display: flex;
  flex-direction: column;
}
</style>