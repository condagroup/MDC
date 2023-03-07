<script setup>
import IconWishlist from "@/assets/svg/icons/wishlistG.svg?component";
import IconPreview from "@/assets/svg/icons/preview.svg?component";
import IconSelect from "@/assets/svg/icons/select.svg?component";
import IconAdd from "@/assets/svg/icons/add.svg?component";
import IconMinus from "@/assets/svg/icons/minus.svg?component";
import IconClose from "@/assets/svg/icons/close.svg?component";
import IconLoading from "@/assets/svg/icons/loading.svg?component";
import IconCheckbox from "@/assets/svg/icons/checkbox.svg?component";
import IconCheckboxEnabled from "@/assets/svg/icons/checkboxEnabled.svg?component";
const props = defineProps({
  data: {
    type: Object,
  },
});

const icons = new Map([
  ["wishlist", IconWishlist],
  ["preview", IconPreview],
  ["select", IconSelect],
  ["add", IconAdd],
  ["minus", IconMinus],
  ["close", IconClose],
  ["loading", IconLoading],
  ["checkbox", IconCheckbox],
  ["checkboxenabled", IconCheckboxEnabled]
]);

</script>

<template>
  <div :class="['icon', `icon--${data.name}`, data.size, data.color]">
    <component :is="icons.get(data.name)" />
  </div>
</template>

<style lang="postcss" scoped>
.icon {
  --size: 12px;
  --color: var(--color-black);

  &.orange {
    --color: var(--color-accent)
  }

  &.gray {
    --color: var(--color-gray)
  }
}

.icon--loading {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotation 2s linear infinite;
}

.icon--add {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon--minus {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon--close {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
