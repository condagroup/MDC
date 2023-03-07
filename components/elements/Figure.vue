<script setup>
import variables from "@/assets/css/variables.json";

const props = defineProps({
  data: {
    type: Object,
  },
});

const { breakpoint: breakpoints } = variables;
const figure = ref();
const { width: figureWidth } = useElementBounding(figure);
const { width: windowWidth } = useWindowSize();
const mq = inject("mq");
const image = computed(() => {
  let value = props.data.image[0];
  // if (!mq.value.s && value?.mobileImage[0]) {
  //   value = value.mobileImage[0];
  // }
  return value;
});

const ratio = props.data.ratio
const { theme } = props.data;
</script>

<template>
  <figure :class="[theme]" ref="figure">
    <picture>
      <template v-for="[key, value] in Object.entries(breakpoints).reverse()">
        <source v-for="format in ['webp', 'jpeg']" :media="`(min-width: ${(parseInt(value) * windowWidth) / figureWidth
        }px)`" :srcset="image[`${format}${key}`]" :type="`image/${format}`" />
      </template>
      <img src="" :alt="image.alt" v-ratio="ratio" />
    </picture>
    <ElementsText v-show="data.showCaption" v-if="data.caption || image.caption" :data="{
      text: data.caption || image.caption,
      tag: 'figcaption',
      typo: '4',
    }" />
  </figure>
</template>

<style lang="postcss" scoped>
figure {
  &.cover {
    height: 100%;

    picture,
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}

.poster {
  height: 100%;

  picture,
  img {
    height: 100%;
    object-fit: cover;
  }
}
</style>
