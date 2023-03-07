<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

let links = ref([]);
if (props.data.cta) {
  links.value.push(props.data);
} else links.value = props.data.children;

const url = (cta) => {
  let value = cta.url;
  if (cta.type === "entry") {
    value = useRelativeUrl(cta.url);
  }
  return value;
};

const mq = inject("mq");
const cols = computed(() => {
  let value = 8;
  if (props.data.section) {
    if (mq.value.m) {
      value = "3 / span 4";
    }
  }
  return value;
});
</script>

<template>
  <ElementsLink
    v-if="data.cta"
    :data="{
      url: url(data.cta),
      typo: data.typo,
      themes: [data.theme, ...(data.themes || [])],
      color: data.color,
    }"
  >
    {{ data.cta.text }}
  </ElementsLink>
  <div v-else class="links" v-grid="{ cols: 8, align: 'start' }">
    <div v-cols="cols" v-lay="{ dir: 'h', gap: 'm' }">
      <ElementsLink
        v-for="link in links"
        :data="{
          url: url(link.cta),
          typo: link.typo,
          themes: [data.theme, 'light-button'],
          arrow: link.cta.type !== 'entry',
          color: link.color,
        }"
      >
        {{ link.cta.text }}
      </ElementsLink>
    </div>
  </div>
</template>
