<script setup>
import variables from "@/assets/css/variables.json";

const props = defineProps({
    data: {
        type: Object
    }
})

const { breakpoint: breakpoints } = variables;
const figure = ref();
const { width: figureWidth } = useElementBounding(figure);
const { width: windowWidth } = useWindowSize();
const mq = inject("mq");

const images = computed(() => {
    let value = props.data.images[0];
    if (!mq.value.s && value.mobileImage[0]) {
        value = value.mobileImage[0];
    }
    return value;
})
</script>

<template>
    <Swiper
        class="swiper-cards"
        :modules="[]"
        :slides-per-view="1"
        :loop="true"
        :effect="'creative'"
    >
        <template v-for="[key] in Object.entries(breakpoints).reverse()" :key="key">
            <SwiperSlide v-for="format in ['webp', 'jpeg']" :key="format">
                <img :src="images[`${format}${key}`]" :alt="format" />
            </SwiperSlide>
        </template>
    </Swiper>
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

.source {
    width: 500px;
    height: 500px;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    height: 100%;
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
}

.swiper-wrapper {
    min-width: 100vh;
    width: 100vh;
}
.swiper-cards {
    width: 100%;
    height: 100%;
}
</style>