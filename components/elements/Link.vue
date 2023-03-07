<script setup>
import { NuxtLink } from "#components";

const props = defineProps({
  data: {
    type: Object,
  },
});

const { themes, typo, url, color } = props.data || {};

const tag = computed(() => {
  let value = "button";
  if (url) {
    value = NuxtLink;
  }
  return value;
});

const parsedUrl = url ? useRelativeUrl(url) : undefined

const target = computed(() => props.data?.target || (parsedUrl?.startsWith("http") ? "_blank" : "_self"));
</script>

<template>
  <component :class="[
    'link',
    ...(themes || ['default', 'typo--m']),
    `typo--${typo || '4'}`,
    color,
    { disabled: data?.disabled },
    { active: data?.active },
  ]" :is="tag" :to="parsedUrl" :target="target">
    <slot />
  </component>
</template>

<style lang="postcss" scoped>
.link {
  height: inherit;
}

.disabled {
  opacity: 0.5;
  cursor: default;
}

.default {}

.button {}
</style>