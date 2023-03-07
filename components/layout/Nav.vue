<script setup>
import { useCheckoutStore } from '@/store/checkout';

const checkoutStore = useCheckoutStore();
const { toggleCart } = useCheckoutStore();
const searchWord = ref('');
const router = useRouter();
const { locale, locales, setLocale } = useI18n();

const { items, totalQuantity } = storeToRefs(checkoutStore)

const props = defineProps({
  data: {
    type: Object
  }
})

const onEnterPress = (e) => {
  if (e.key === 'Enter') {
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
  <div v-for="(column, index) in data" :key="index">
    <ul>
      <li v-for="(item, index) in column.children" :key="index">
        <template v-if="item.cta.customText === 'Cart'">
          <button @click="toggleCart">
            <ElementsText
              :data="{ text: `${item.cta.customText} ${totalQuantity ? ('[' + totalQuantity + ']') : ''}` }" />
          </button>
        </template>

        <div v-else-if="item.cta.customText == 'Search...'">
          <input v-model="searchWord" placeholder="Search..." class="search-input" @keydown="(e) => onEnterPress(e)" />
        </div>

        <ElementsLink v-else :data="{ url: item.cta.url, }">
          {{ item.cta.customText || item.cta.element.title }}
        </ElementsLink>
      </li>
    </ul>
  </div>
  <div v-if="data.length > 1"></div>
  <div v-if="data.length > 1"></div>
  <div v-if="data.length > 1">
    <ul>
      <li v-grid="{cols: '7', dir: 'h' }">
        <div style="text-align: left;" ><button @click="onLanguage('en')" :class="locale === 'en' ? 'active_lang' : 'disable_lang'">En</button></div>
        <div style="text-align: center;"><button @click="onLanguage('it')" :class="locale === 'it' ? 'active_lang' : 'disable_lang'">Ita</button></div>
        <div style="text-align: right;"><button @click="onLanguage('zh')" :class="locale === 'zh' ? 'active_lang' : 'disable_lang'">中文</button></div>
      </li>
      <li>
        <input v-model="searchWord" placeholder="Search..." class="search-input" @keydown="(e) => onEnterPress(e)" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.disable_lang{
  color: gray;
}
</style>