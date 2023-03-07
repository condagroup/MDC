<script setup>
import { setViewport } from '@gigads/style';
import variables from '@/assets/css/variables.json';
import { useCheckoutStore } from './store/checkout';
const { getRequest } = useCheckoutStore();


onMounted(() => {
  setViewport(variables.breakpoint);

  getRequest();
});

const router = useRouter();

router.afterEach((to) => {
  const body = document.querySelector('body');
  if (to.meta.overlay) {
    body.classList.add('overlay-open');
  } else {
    body.classList.remove('overlay-open');
  }
});
</script>

<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<style>
.overlay-open {
  overflow: hidden;
}
</style>
