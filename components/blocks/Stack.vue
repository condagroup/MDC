<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

const props = defineProps({
  data: {
    type: Object,
  },
});

const components = new Map([
  ['featured_default_Entry', resolveComponent('LazyThumbsFeatured')],
  ['shop_default_Entry', resolveComponent('LazyThumbsShop')],
]);

const route = useRoute();

const stack = computed(() => {
  let result = props.data.children[0];
  if (route.query?.word) {
    result = result.entries.filter((item) => {
      if (item.title.toLowerCase().includes(route.query.word.toLowerCase())) return true;
      return false;
    });
  }
  return result;
});
const grid = stack.value.layout === 'small' ? 4 : stack.value.layout === 'large' ? 2 : stack.value.layout === 'slider' ? false : undefined

</script>

<template>
  <div>
    <div v-grid="{ cols: stack.cta?.url ? '2' : '1', gap: '0', dir: 'o', align: ['start', 'even'] }">
      <ElementsHeading class="heading" :data="{ heading: stack.heading }" v-if="stack.heading" v-pad="{ top: 'xs', bottom: 'xs' }" />
      <ElementsLink v-if="stack.cta?.element" :data="{ url: stack.cta.url }" class="cta" v-pad="{ top: 'xs', bottom: 'xs' }">{{ stack.cta.text }}</ElementsLink>
    </div>
    <swiper
      :slides-per-view="$mq.m ? 4.5: 1.5"
      :space-between="10"
      v-if="grid === false"
      class="zIndex0"
    >
      <swiper-slide v-for="thumb in stack.entries">
        <component :is="components.get(thumb.__typename)" :data="{ ...thumb, size: 'stack' }" />
      </swiper-slide>
    </swiper>
    <div v-grid="grid" v-else>
      <component :is="components.get(thumb.__typename)" :data="{ ...thumb, size: 'stack' }"
        v-for="thumb in stack.entries" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.heading {
  border-top: 1px solid;
}
.zIndex0 {
  z-index: 0;
}

.cta {
  border-top: 1px solid;
  text-align: right;
}
</style>