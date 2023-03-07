<script setup>
import entriesQuery from "@/apollo/craft/queries/entries/entries";

const components = new Map([
  ['featured_default_Entry', resolveComponent('LazyThumbsFeatured')],
  ['shop_default_Entry', resolveComponent('LazyThumbsShop')],
]);


const props = defineProps({
  data: {
    type: Object,
  },
});

const route = useRoute();
const limit = isNaN(props.data.limit) ? 24 : props.data.limit
const offset = ref(0)
const loadMore = ref(0)
const entryCount = ref(0)

const { locale } = useI18n();
const archive = ref([]);

const artists = ref(props.data.artists || route.query.artist)
const featured = ref(props.data.entriesType === 'featuredShop' ? route.params.slug : undefined)

const queryArchive = async () => {
  const { data } = await useAsyncQuery({
    query: entriesQuery,
    variables: {
      offset: offset.value,
      site: locale.value,
      section: props.data.entriesType === 'featuredShop' ? 'shop' : props.data.entriesType,
      limit,
      orderBy: "postDate DESC",
      excludeIds: (props.data.shopTypology && props.data.shopTypology.length) || artists.value ? undefined : ["not", ...props.data.thumbsExcluded],
      relatedToCategories: props.data.shopTypology ? [{ slug: props.data.shopTypology.map((typology) => typology.slug), group: 'shopTypology' }] : [{}],
      relatedToEntries: featured.value ? [{ slug: [featured.value], section: 'featured' }] : artists.value ? [{ slug: [artists.value], section: 'artist' }] : [{}]
    },
  });

  entryCount.value = data.value.entryCount;
  archive.value.push(...data.value.entries);
}

await queryArchive();

// const { stop } = useIntersectionObserver(
//   loadMore,
//   ([{ isIntersecting }]) => {
//     if (isIntersecting) {
//       offset.value += limit
//       if (offset.value >= entryCount.value) {
//         stop();
//       } else {
//         queryArchive();
//       }
//     }
//   },
// )

watch(() => route.query?.artist, (artist) => {
  artists.value = artist;
  offset.value = 0;
  archive.value = [];
  queryArchive();
})

</script>

<template>
  <div class="archive">
    <CustomFilters :data="{ shopTypology: data.shopTypology }"
      v-if="!route.meta.overlay && data.entriesType === 'shop'" />


    <div v-lay="{ align: ['even'] }">
      <ElementsHeading :data="{ heading: data.heading }" v-if="data.heading" v-pad="{ top: 'xs', bottom: 'xs' }" class="heading" />
      <ElementsLink v-if="data.cta.url" :data="{ url: data.cta.url }">{{
        data.cta.text
      }}
      </ElementsLink>
    </div>
    <div v-grid="$mq.m ? 4 : 2">
      <component :is="components.get(thumb.__typename)" :data="{ ...thumb, size: 'stack' }" v-for="thumb in archive" />
    </div>
    <!-- <div ref="loadMore" class="load-more"></div> -->
  </div>
</template>

<style lang="postcss" scoped>
.heading {
  border-top: 1px solid;
}

.archive {
  position: relative;
}

.load-more {
  position: absolute;
  width: 100%;
  height: 50vh;
  bottom: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
</style>