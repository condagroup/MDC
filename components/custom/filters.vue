<script setup>
import entriesQuery from "@/apollo/craft/queries/entries/entries";
import { useStore } from "@/store";
import vSelect from "vue-select";
import { createPopper } from '@popperjs/core'
import 'vue-select/dist/vue-select.css';
import DropSVG from "@/assets/svg/icons/stroke.svg?component";

const store = useStore();
const { isFiltered } = storeToRefs(store);
const props = defineProps({
  data: {
    type: Object,
  },
  typo: {
    type: String,
  }
});
const router = useRouter();
const route = useRoute();
const { locale } = useI18n();
const { data: dataArtists } = await useAsyncQuery({
  query: entriesQuery,
  variables: {
    site: locale.value,
    section: "artist",
    limit: null,
    relatedToEntries: [
      {
        section: "shop",
        relatedToCategories: props.data.shopTypology
          ? [
            {
              slug: props.data.shopTypology.map((typology) => typology.slug),
              group: "shopTypology",
            },
          ]
          : [{}],
      },
    ],
    orderBy: "artistLastName ASC",
  },
});

const { data: dataTypology } = await useAsyncQuery({
  query: entriesQuery,
  variables: {
    site: locale.value,
    section: "page",
    descendantOf: 341,
  },
});

const currentTypology = ref(route.params.slug || "shop");
const typologies = dataTypology.value.entries;
const artists = dataArtists.value.entries;
const currentArtist = ref(route.query.artist || "all");

const setCurrentTypology = (ct) => {
  currentTypology.value = ct;
}

const setCurrentArtist = (ct) => {
  currentArtist.value = ct;
}

const firstUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

watch(currentArtist, (value) => {
  isFiltered.value = value.slug !== "all" && currentTypology.value?.slug === "shop";

  if (value !== "all") {
    router.replace({
      query: {
        artist: value.slug,
      },
    });
  } else {
    router.replace({
      query: {
        artist: undefined,
      },
    });
  }
});

watch(currentTypology, (value) => {
  router.push({
    path: `/${value.slug}`,
    params: {
      slug: value.slug,
    },
  });
});

let placement = "top";

const withPopper = (dropdownList, component, { width }) => {
  dropdownList.style.width = width
  const popper = createPopper(component.$refs.toggle, dropdownList, {
    placement: placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -1],
        },
      },
      {
        name: 'toggleClass',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          component.$el.classList.toggle(
            'drop-up',
            state.placement === 'top'
          )
        },
      },
    ],
  })
  return () => popper.destroy()
}

</script>
<template>
  <ClientOnly>
    <Teleport to="#filters">
      <div class="filter-pad" v-lay="{ dir: 'h' }" :class="['filters', 'typo--' + (typo || 'm')]">
        <ElementsSelectDrop :currentValue="currentTypology" :options="typologies" label="title" placeholder="All products" :data="'shop'" :setCurrentTypology="setCurrentTypology" dropType="typo" >
          <DropSVG />
          <div v-if="currentTypology != 'shop'">{{ currentTypology.title ? firstUpperCase(currentTypology.title) : firstUpperCase(currentTypology) }}</div>
          <div v-else>{{ "All products" }}</div>
        </ElementsSelectDrop>
        <ElementsSelectDrop :currentValue="currentArtist" :options="artists" label="title" placeholder="All artists" :setCurrentArtist="setCurrentArtist" dropType="artist">
          <DropSVG />
          <div v-if="currentArtist != 'all'">{{ currentArtist.title ? firstUpperCase(currentArtist.title) : firstUpperCase(currentArtist) }}</div>
          <div v-else>{{ "All artists" }}</div>
        </ElementsSelectDrop>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style lang="postcss">
.filters {
  .v-select {
    width: 200px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    .dropdown-toggle {
      border: none;
      background-color: transparent;
      color: #000;
    }

    .dropdown-menu {
      max-height: 200px;
      overflow-y: auto;
    }

    .vs__dropdown-toggle {
      border: 0;
    }

    .vs__clear {
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  #filters {
    width: 100%;
    .layout {
      gap: 0px!important;
    }
  }
  .filter-pad {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid black;
  }
  
}
</style>
