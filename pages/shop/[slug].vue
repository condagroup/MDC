<script setup>
import { useStore } from "@/store";
import { ref } from "vue";
import entryQuery from "@/apollo/craft/queries/entries/entry";
import { productById } from "@/apollo/shopify/queries/product";

import { useCheckoutStore } from "@/store/checkout";

const store = useStore();
const { modal } = storeToRefs(store);
const checkout = useCheckoutStore();
const { add } = checkout;
const { locale, t } = useI18n();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  params: {
    type: Object,
  },
});

let scrollPosition;
let statusindex = ref(0);
let addToCartText = computed(() => {
  if (entry.status === "soldOut") {
    statusindex.value = 2;
    return "Sold Out"
  }

  if (entry.status === "outOfStock") {
    statusindex.value = 3;
    return "Out Of Stock"
  }

  if (entry.status === "upcoming") {
    statusindex.value = 4;
    return "Upcoming"
  }
  if (checkout.loading && entry.status === "available") {
    statusindex.value = 0;
    return "Adding to cart";
  }

  if (checkout.isAdded && entry.status === "available") {
    statusindex.value = 1;
    return "Added to cart";
  }
  statusindex.value = 0;
  return "Add to cart";
});

let addToCartColor = computed(() => {
  if (checkout.loading || checkout.isAdded) {
    return "orange";
  }

  if (statusindex.value === 2 || statusindex.value === 3) {
    return "red"
  }

  return "";
});

const saveScrollPosition = () => {
  scrollPosition = window.pageYOffset;
};

const restoreScrollPosition = () => {
  window.scrollTo(0, scrollPosition);
};

const { data } = await useAsyncQuery({
  query: entryQuery,
  variables: {
    site: locale.value,
    slug: route.params.slug,
    section: "shop",
  },
});

const { entry } = data.value;

if (entry.shopifyId) {
  const { data: dataShopify } = await useAsyncQuery({
    query: productById,
    variables: {
      id: entry.shopifyId,
      countryCode: useCountryCode(),
    },
    clientId: "shopify",
  });
  data.value.product = dataShopify.value.node;
}

const { product } = data.value;

const addToCart = async () => {
  await add({
    itemId: product.variants.nodes[0].id,
    quantity: 1,
  });
};

const isPreviewed = entry.typology?.[0].slug === 'artworks' && entry.dimensions?.[0].width


const closeOverlay = () => {
  restoreScrollPosition();
  router.go(-1);
};

onMounted(() => {
  saveScrollPosition();
});

onBeforeUnmount(() => {
  restoreScrollPosition();
});

definePageMeta({ overlay: true });
</script>

<template>
  <div>
    <main v-pad="{ left: 'xs', right: 'xs' }" v-grid="{ cols: $mq.s ? 24 : 1 }">
      <section class="productInfo" v-cols="$mq.s ? 12 : 1" v-lay="{ gap: 's', align: ['initial'] }">
        <div class="">
          <ElementsHeading :data="{ heading: entry.title, typo: 'l' }" class="title" />
          <ElementsHeading :data="{ heading: entry.artists, typo: 'l' }" class="artist" />
          <ShopPrice :min="product.priceRange.minVariantPrice" />
          <!-- <div class="wishlist" v-pad="{ top: 'xs', bottom: 'xs' }">
                <ElementsIcon :data="{ name: 'wishlist' }" v-lay="{ dir: 'h', gap: 'xxl', align: 'left' }" />
                <ElementsText :data="{ text: 'Add to wishlist' }" />
              </div> -->
          <div v-if="isPreviewed">
            <ElementsLink @click="modal = { component: 'preview', data: entry }">
              <div v-lay="{ dir: 'h', fluid: true, gap: 'xs' }" v-pad="{ top: 's', bottom: 's' }">
                <ElementsIcon :data="{ name: 'preview' }" />
                {{ t('preview') }}
              </div>
            </ElementsLink>
          </div>
        </div>
        <div class="">
          <div class="product_infos" v-pad="{ bottom: 'm'}">
          <div v-if="entry.isbn">
            <ElementsText :data="{ text: entry.isbn || t('isbn_text') }" />
          </div>
          <div v-if="entry.edition">
            <ElementsText :data="{ text: entry.edition || t('edition_text') }" />
          </div>
          <div v-if="entry.packing">
            <ElementsText :data="{ text: entry.packing || t('packing_text') }" />
          </div>
          <div v-if="entry.technique">
            <ElementsText :data="{ text: entry.technique || t('technique_text') }" />
          </div>
          <!-- <div v-if="entry.sizes">
            <div v-for="(value, key) in entry.sizes" :key="key">
              <div v-for="(propertyValue, propertyKey) in value" :key="propertyKey">
                <ElementsText :data="{ text: `${propertyKey}: ${propertyValue}` }" />
              </div>
            </div>
          </div> -->
        </div>
          <ElementsAccordion :label="t('details')" group="info" v-if="entry.text">
            <div v-lay="{ gap: '0' }" v-pad="{ top: 'xs', bottom: 'xs' }" class="accordion_content">
              <ElementsText :data="{ text: entry.text }" />
            </div>
          </ElementsAccordion>
          <ElementsAccordion :label="t('payment')" group="info">
            <div v-lay="{ gap: '0' }" v-pad="{ top: 'xs', bottom: 'xs' }" class="accordion_content">
              <ElementsText :data="{ text: entry.payment || t('payment_text') }" />
            </div>
          </ElementsAccordion>
          <ElementsAccordion :label="t('shipping')" group="info">
            <div v-lay="{ gap: '0' }" v-pad="{ top: 'xs', bottom: 'xs' }" class="accordion_content">
              <ElementsText :data="{ text: entry.shipping || t('shipping_text') }" />
            </div>
          </ElementsAccordion>
        </div>
      </section>
      <section class="productGallery" v-cols="$mq.s ? 12 : 1" v-lay="{ gap: 's', align: ['center'] }"
        :style="{ order: !$mq.s ? '-9999' : 0 }">
        <ElementsSwiperFigure :data="{ images: entry.images }" />
      </section>
    </main>

    <aside class="singleAside"
      v-grid="{ cols: '2', dir: 'h', align: ['center', 'even'] }">
      <button @click="closeOverlay" class="productClose">
        <ElementsIcon :data="{ name: 'close' }" size="24" />
        <ElementsText :data="{ text: entry.title, typo: 'm' }" class="packing" />
      </button>
      <div class="left-wrapper">
        <button :class="['addToCartButton']" @click="addToCart" v-if="statusindex < 2">
          <ElementsText :data="{ text: addToCartText, typo: 'm', color: addToCartColor }" />
          <ElementsIcon :data="{ name: 'loading', color: 'orange' }" v-if="checkout.loading" />
          <!-- <ElementsText :data="{
                text: `[ ${Number(
                  product.priceRange.minVariantPrice.amount
                ).toFixed(2)} € ]`,
                type: 'm',
                color: 'gray',
              }" v-if="!checkout.loading && !checkout.isAdded" /> -->
        </button>
        <ElementsText :data="{ text: addToCartText, typo: 'm', color: addToCartColor }" v-else
          class="['addToCartStatus']" />

        <button class="support">
          <ElementsText :data="{ text: 'Support', typo: 'm', color: 'orange' }"
            onclick="SibConversations('openChat', true)" class="chatbot" />
        </button>
      </div>
    </aside>

    <BlocksSections :data="{ sections: entry.sections }" v-if="entry.sections.length" />
  </div>
</template>

<style lang="postcss" scoped>
main {
  margin-top: 74px;
  min-height: calc(var(--vh) * 100 - 74px - 38px);

  .productGallery {
    height: calc(100vh - 74px - 38px);
    background: #ebebeb;
    align-self: start;
    overflow: hidden;

    :deep(img) {
      max-height: calc(100vh - 74px - 38px);
      object-fit: contain;
    }
  }

  .productInfo {
    height: calc(100vh - 74px - 38px);

    .wishlist {
      display: flex;
      align-items: center;
    }
  }
}

.accordion_content {
  width: 50%;
}

.productClose {
  display: flex;
  align-items: center;
}

.singleAside {
  position: sticky;
  bottom: 0;
  left: 0;
  margin: 0 10px;
  height: 38px;
  background-color: var(--color-white);
  z-index: 2;
  border-top: 1px solid;
}

.addToCartButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.addToCartStatus {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.support {
  display: flex;
  justify-content: flex-end;
}

.left-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .support {
    display: none;
  }

  .singleAside {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
