<script setup>
import { useStore } from "@/store";

const components = new Map([
  ["sections_archive_BlockType", resolveComponent("LazyBlocksArchive")],
  ["sections_ctas_BlockType", resolveComponent("LazyBlocksLinks")],
  ["sections_thumb_BlockType", resolveComponent("LazyBlocksThumb")],
  ["sections_stack_BlockType", resolveComponent("LazyBlocksStack")],
  ["sections_media_BlockType", resolveComponent("LazyBlocksMedia")],
  ["sections_heading_BlockType", resolveComponent("LazyBlocksHeading")],
  ["sections_text_BlockType", resolveComponent("LazyBlocksText")],
  ["sections_embed_BlockType", resolveComponent("LazyBlocksEmbed")],
  ["sections_image_BlockType", resolveComponent("LazyElementsFigure")],
  ["sections_video_BlockType", resolveComponent("LazyElementsVideo")],
]);

const store = useStore();
const { isFiltered } = storeToRefs(store);

const props = defineProps({
  data: {
    type: Object,
  },
});

const { sections, searchWord } = props.data;
const thumbsExcluded = sections
  .map((section) =>
    section.children.filter((block) =>
      ["sections_thumb_BlockType", "sections_stack_BlockType"].includes(
        block.__typename
      )
    )
  )
  .flat()
  .map((block) =>
    block.children[0][
      block.__typename === "sections_thumb_BlockType" ? "entry" : "entries"
    ].map((entry) => entry.id)
  )
  .flat(2);
</script>

<template>
  <div>
    <section v-for="section in sections" :class="[section.theme]" v-pad="{ top: 'xs', bottom: 'xl' }" v-show="
      !isFiltered ||
      section.children.find(
        (block) => block.__typename === 'sections_archive_BlockType'
      )
    ">
      <component v-for="block in section.children" :is="components.get(block.__typename)" :data="{
        ...block,
        section: true,
        sectionTheme: section.theme,
        thumbsExcluded:
          block.__typename === 'sections_archive_BlockType'
            ? thumbsExcluded
            : undefined,
      }" v-show="
  !isFiltered || block.__typename === 'sections_archive_BlockType'
" />
    </section>
  </div>
</template>

<style lang="postcss" scoped></style>
