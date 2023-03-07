<script setup>
import { useCheckoutStore } from '@/store/checkout';

const checkoutStore = useCheckoutStore();
const { id: cartId, items } = storeToRefs(checkoutStore)
</script>
<template>
  <div v-if="cartId">
    <ul>
      <li v-for="item in items">
        <pre>{{ item }}</pre>
      </li>
    </ul>
  </div>
</template>