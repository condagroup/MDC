<script setup>
import navQuery from "@/apollo/craft/queries/singles/navigation";

import LogoDx from '@/assets/svg/logo/logoDx.svg?component';
import LogoSx from '@/assets/svg/logo/logoSx.svg?component';
import { useCheckoutStore } from "~~/store/checkout";

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const dialog = ref(false);
const { toggleCart } = useCheckoutStore();

function handleClick() {
  dialog.value = false;
  toggleCart();
}
const { data } = await useAsyncQuery({
  query: navQuery,
  variables: {
    section: 'navigation',
    site: locale.value,
  },
});

const searchWord = ref('');
const router = useRouter();

const onEnterPress = (e) => {
  if (e.key === 'Enter') {
    dialog.value = false;
    if (searchWord.value == '') router.push('/');
    else router.push(`/search?s=${encodeURIComponent(searchWord.value)}`);
  }
}

const onLanguage = (str) => {
  dialog.value = false;
  // setLocale(str); 
}

</script>

<template>
  <header class="header" v-grid="{ cols: '4', dir: 'h', align: ['center', 'even'] }" v-show="$mq.s">
    <div class="logoSx logo_desktop" v-cols="2">
      <NuxtLink :to="'/'">
        <LogoSx />
      </NuxtLink>
    </div>
    <div class="menu" v-lay="{ dir: 'v', gap: 'xxs', align: 'left' }">
      <LayoutNav :data="data.entry.navigation" />
    </div>
    <div class="logoDx" v-lay="{ align: 'end' }">
      <LogoDx />
    </div>
  </header>
  <ClientOnly>
    <!-- <header :class="dialog ? 'header_mobile_open' : 'header_mobile'" v-else> -->
    <header :class="dialog ? 'header_mobile_open' : ''" v-lay="{ cols: '2', dir: 'v', align: ['even'] }" v-if="!$mq.s">
      <div class="logo_mobile" v-grid="{ cols: '2', dir: 'h', align: ['center', 'even'] }"
        @click="dialog = (dialog ? false : true)">
        <LogoSx />
        <div v-lay="{ align: 'end' }">
          <LogoDx />
        </div>
      </div>
      <div class="dialog_mobile" v-if="dialog">
        <div class="menu" v-lay="{ cols: $mq.m ? '4' : '1', gap: '0', dir: 'h', align: ['start', 'even'] }">
          <!-- <LayoutNav :data="data.entry.navigation" /> -->
          <div v-for="(column, index) in data.entry.navigation" :key="index">
            <ul>
              <li>
                <button class="text typo--m" @click="dialog = false">Shop</button>
              </li>
              <li v-for="(item, index) in column.children" :key="index">
                <template v-if="item.cta.customText === 'Cart'">
                  <button @click="handleClick">
                    <ElementsText
                      :data="{ text: `${item.cta.customText} ${totalQuantity ? ('[' + totalQuantity + ']') : ''}` }" />
                  </button>
                </template>

                <div v-else-if="item.cta.customText == 'Search...'">
                  <input v-model="searchWord" placeholder="Search..." class="search-input"
                    @keydown="(e) => onEnterPress(e)" />
                </div>

                <ElementsLink v-else :data="{ url: item.cta.url, }" @click="dialog = false">
                  {{ item.cta.customText || item.cta.element.title }}
                </ElementsLink>
              </li>
              <li>
                <div class="text typo--m i18n_mobile" v-grid="{ cols: '3', dir: 'h', align: ['center', 'even'] }">
                  <button @click="onLanguage('en')">En</button>
                  <button @click="onLanguage('it')">Ita</button>
                  <button @click="onLanguage('zh')">中文</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </ClientOnly>
</template>


<style lang="postcss" scoped>
header {
  position: sticky;
  top: 10px;
  left: 0;
  width: 100%;
  z-index: 2;
  background: transparent;
}

.header_mobile_open {
  min-height: 100vh;
  background-color: white;
  margin: 0;
  width: 100vw;
  left: 0;
  position: fixed;
  z-index: 2;
  top: 0;
  opacity: 1;
  padding: 10px;
}
</style>
