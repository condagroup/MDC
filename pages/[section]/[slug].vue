<script setup>
import entryQuery from "@/apollo/craft/queries/entries/entry";
const { locale } = useI18n();
const route = useRoute();

const props = defineProps({
  params: {
    type: Object,
  },
});

const { data } = await useAsyncQuery({
  query: entryQuery,
  variables: {
    site: locale.value,
    slug: route.params.slug,
    section: route.params.section,
  },
});

const { entry } = data.value;
</script>

<template>
  <main>
    <BlocksSections :data="{ sections: entry.sections }" v-if="entry.sections.length" />
  </main>
</template>

<style lang="postcss" scoped></style>
