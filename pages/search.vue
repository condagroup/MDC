<script setup>
import searchQuery from "@/apollo/craft/queries/entries/search";

const { locale } = useI18n();
const route = useRoute();
const searchWord = computed(() => decodeURIComponent(route.query.s));
const { data } = await useAsyncQuery({
  query: searchQuery,
  variables: {
    site: locale.value,
    section: ['not', 'page', 'artist'],
    search: searchWord.value
  },
});

const { entries } = data.value
</script>

<template>
  <main>
    <div class="search-info">
      <div class="search-word">
        {{ searchWord }}
      </div>
      <div class="clear">Clear</div>
    </div>
    <div class="result-title">
      <ElementsText :data="{ text: 'Results for “' + searchWord + '”' }" />
    </div>
    <BlocksStack :data="{ children: [{ entries: entries }] }" v-if="entries" />
  </main>
</template>

<style scoped>
.search-info {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;
}

.search-word {
  font-size: 32px;
  line-height: 36px;
}

.clear {
  cursor: pointer;
  font-size: 32px;
  line-height: 36px;
}

.result-title {
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid black;
}
</style>