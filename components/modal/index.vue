<script setup>
import { useStore } from "@/store";

const store = useStore();
const { modal, lockBody } = storeToRefs(store);

const modalComponents = new Map([
  ["preview", resolveComponent("LazyModalPreview")],
]);


watch(modal, (val) => {
  if (val.component && !lockBody.value.value) {
    lockBody.value.value = true;
  } if (lockBody.value.value) {
    lockBody.value.value = false;
  }
})

const close = () => {
  if (modal.value.component) {
    modal.value = false;
  }
}

onKeyStroke("Escape", close);

</script>

<template>
  <Transition name="vertical-slide">
    <div v-if="modal.component" :class="['modal', modal.component && 'modal--' + modal.component]">
      <component :data="modal.data" :is="modalComponents.get(modal.component)" @close-modal="close" />
    </div>
  </Transition>
</template>

<style lang="postcss" scoped>
.modal {
  position: fixed;
  height: calc(var(--vh) * 100);
  width: 100%;
  z-index: 6;
  top: 0;
  overflow: auto;
  overscroll-behavior: contain;
  background: var(--color-white-bg);
  backdrop-filter: blur(40px);
}
</style>