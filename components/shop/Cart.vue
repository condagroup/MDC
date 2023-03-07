<script setup>
import { useCheckoutStore } from '@/store/checkout';

const checkoutStore = useCheckoutStore();
const { toggleCart, updateQty, remove } = useCheckoutStore();
const { lines, cartOpened, totalQuantity, totalPrice, checkoutUrl } = storeToRefs(checkoutStore)
const inputtag = ref(false);

const update = async (itemId, currentQty, add = true) => {
  await updateQty({
    itemId: itemId,
    quantity: currentQty + (add ? 1 : -1),
  });
}

const items = computed(() => {
  return lines.value?.nodes
})

const curSymbols = {
  'EUR': '€'
}

</script>
<template>
  <div :class="['cart', $mq.s ? 'desktop' : 'mobile']" v-if="cartOpened">
    <aside class="cart-header" v-pad="{ left: 'xs', right: 'xs' }"
      v-grid="{ cols: '2', dir: 'h', align: ['center', 'even'] }">
      <button class="cart-title" @click="toggleCart">
        <ElementsIcon :data="{ name: 'close' }" />
        <ElementsText :data="{ text: 'Your cart', typo: 'm' }" />
      </button>

      <div v-lay="{ align: 'start', dir: 'h', fluid: true }" class="total-items">
        <div id="filters"></div>
        <ElementsText v-if="totalQuantity" :data="{ text: `[ ${totalQuantity} item/s ]`, typo: 'm', color: 'gray' }"
          class="packing" />
        <div v-else>
          <ElementsText :data="{ text: 'Your cart is empty' }" />
          <div :style="{ marginTop: '10px' }">
            <ElementsText :data="{ text: 'Continue shopping' }" />
          </div>
        </div>
      </div>
    </aside>

    <div v-lay="{ align: 'start', dir: 'h', fluid: true }" class="total-items-mobile">
      <div id="filters"></div>
      <ElementsText v-if="totalQuantity" :data="{ text: `[ ${totalQuantity} item/s ]`, typo: 'm', color: 'gray' }"
        class="packing" />
      <div v-else :style="{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }">
        <ElementsText :data="{ text: 'Your cart is empty' }" />
        <div>
          <ElementsText :data="{ text: 'Continue shopping' }" />
        </div>
      </div>
    </div>

    <div class="cart-body">
      <main class="cart-main" v-pad="{ left: 'xs', right: 'xs' }" v-grid="{ cols: $mq.s ? 12 : 1 }">
        <section v-cols="6" :style="{ display: $mq.s ? 'block' : 'none' }" >
          <div @click="inputtag ? inputtag=false : inputtag=true" :class="inputtag ? 'input_title_on' : 'input_title'" v-if="totalQuantity" :style="{ display: 'flex', gap: '5px' }">
            <ElementsIcon :data="{ name: inputtag ? 'checkbox' : 'checkboxenabled' }" />
            <ElementsText :data="{ text: 'Insert notes for the order', typo: 'm' }" />
          </div>
          <div>
            <textarea placeholder="Insert notes here..." class="cart_textarea" v-if="inputtag"/>
          </div>
        </section>
        <section class="cart-left" v-cols="$mq.s ? 6 : 1" v-lay="{ gap: 's' }"
          :style="{ height: $mq.s ? 'calc(50vh - 30px)' : 'auto' }">
          <div class="cart-main-inner">
            <table class="cart-table">
              <tbody class="cart-tbody">
                <tr class="cart-tr" v-for="(item, index) in items" :key="index">
                  <td class="cart-img">
                    <div v-ratio="[5, 7]">
                      <ElementsFigure :data="{ image: [item.merchandise.image] }" />
                    </div>
                  </td>
                  <td class="card-title-quantity"
                    :style="{ flexDirection: $mq.m ? 'row' : 'column', display: $mq.m ? 'flex' : 'none' }">
                    <span class="cart-item-title" :style="{ width: $mq.m ? '250px' : '150px' }">{{
                      item.merchandise.product.title
                    }}</span>
                    <span class="card-quantity">{{ item.quantity }}</span>
                  </td>
                  <td class="card-actions-price"
                    :style="{ flexDirection: $mq.m ? 'row' : 'column', marginLeft: $mq.s ? '50px' : '0', display: $mq.m ? 'flex' : 'none' }">
                    <div class="cart-actions">
                      <button class="cart-actionButton" @click="update(item.id, item.quantity, true)">
                        <ElementsIcon :data="{ name: 'add', size: 's', color: 'gray' }" />
                      </button>
                      <button class="cart-actionButton" @click="update(item.id, item.quantity, false)">
                        <ElementsIcon :data="{ name: 'minus', size: 's' }" />
                      </button>
                      <button @click="remove(item.id)">
                        <ElementsText :data="{ text: 'Remove', color: 'gray' }" />
                      </button>
                    </div>

                    <ShopPrice :min="item.cost.totalAmount" typo="m" />
                  </td>
                  <td class="card-info-mobile"
                    :style="{ display: $mq.m ? 'none' : 'flex', flex: 1, flexDirection: 'column', gap: '10px' }">
                    <div class="card-name-price">
                      <div class="cart-item-title" :style="{ maxWidth: '150px', wordWrap: 'break-word' }">{{
                        item.merchandise.title }}
                      </div>
                      <ShopPrice :min="item.cost.totalAmount" typo="m" />
                    </div>
                    <div class="card-quantity-action">
                      <ElementsText :data="{ text: item.quantity }" />
                      <div class="cart-actions">
                        <button class="cart-actionButton" @click="update(item.id, item.quantity, true)">
                          <ElementsIcon :data="{ name: 'add', size: 's', color: 'gray' }" />
                        </button>
                        <button class="cart-actionButton" @click="update(item.id, item.quantity, false)">
                          <ElementsIcon :data="{ name: 'minus', size: 's' }" />
                        </button>
                        <button @click="remove(item.id)">
                          <ElementsText :data="{ text: 'Remove', color: 'gray' }" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- summary -->
          <div class="cart-summary">
            <ElementsLink :data="{ url: checkoutUrl, target: '_self' }" v-if="checkoutUrl" v-lay="{ align: 'center' }">
              Proceed to checkout
            </ElementsLink>
            <ShopPrice :min="totalPrice" v-if="totalPrice" />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.cart {
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);

  &.desktop {
    height: 50vh;
  }

  &.mobile {
    height: 100vh;
  }

  .hidden {
    display: none;
  }

  .cart-body {
    height: calc(100% - 100px);
  }

  .cart-main {
    height: 100%;
  }

  .cart-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .cart-main-inner {
    display: flex;
    overflow-y: auto;
  }

  .cart-table {
    flex-grow: 1;
  }

  .cart-summary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    border-top: 1px solid #000;
  }

  .cart-summary::before {
    content: 'Shipping and taxes calculated at checkout.';
    position: absolute;
    left: 0;
    top: -20px;
    color: var(--color-gray);
    font-size: 12px;
    line-height: 15px;
  }

  .cart-tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .cart-tbody tr:not(:first-child) {
    border-top: 1px solid #000;
  }

  .cart-img {
    gap: 10px;
    width: 100px;

    figure {
      width: 100%;
    }
  }

  .card-title-quantity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }

  .cart-item-title {
    width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cart-header {
    padding: 5px 0;
    border-top: 1px solid;
    align-items: self-start;
  }

  .cart-title {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .input_title_on {
    margin-top: 40px;
  }

  .input_title {
    color: gray;
    margin-top: 40px;
  }

  table {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .cart-image {
    width: 58px;
  }

  .card-actions-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }

  .cart-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .cart-actionButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
}

.cart_textarea {
  max-width: 400px;
  width: 100%;
  height:200px;
  border: none;
  margin-top: 10px;
}

.cart_textarea:focus {
  outline: none !important;
  border: none;
}

.cart_textarea::placeholder {
  color: gray;
}
.total-items {
  display: block;
}

.total-items-mobile {
  display: none;
}

@media screen and (max-width: 768px) {
  .total-items {
    display: none;
  }

  .cart-body {
    flex: 1;
  }

  .total-items-mobile {
    display: block;
    margin-top: 30px;
  }

  .cart-tr {
    gap: 10px;
  }

  .card-name-price {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .card-quantity-action {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .cart-actions {
    gap: 2px;
  }

  .cart-actionButton {
    width: auto !important;
  }
}
</style>