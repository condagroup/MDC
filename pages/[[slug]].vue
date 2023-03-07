<script setup>
import entryQuery from "@/apollo/craft/queries/entries/entry";

const { locale } = useI18n();
const route = useRoute();
const {
  meta: { overlay },
} = route;

const props = defineProps({
  params: {
    type: Object,
  },
});

const { data } = await useAsyncQuery({
  query: entryQuery,
  variables: {
    site: locale.value,
    slug: overlay ? props?.slug || "shop" : route.params.slug || "shop",
    section: "page",
  },
});

const { entry } = data.value

console.log('render');
</script>

<template>
  <main>
    <BlocksSections :data="{ sections: entry.sections }" v-if="entry.sections.length" />
  </main>
</template>
