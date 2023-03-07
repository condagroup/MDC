<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const typo = props.data.headingTypo;
</script>

<template>
  <div>
    <div v-lay="{ dir: $mq.m ? 'h' : 'v' }">
      <ElementsHeading
        :data="{
          ...data,
          typo,
        }"
        :class="[
          `typo--${
            typo ? (typo === 'default' ? 'l' : typo) : $mq.m ? 'xl' : 'l'
          }`,
        ]"
      />

      <ElementsHeading
        v-if="data.heading2"
        :data="{
          ...data,
          heading: data.heading2,
          typo,
        }"
        :class="[
          `typo--${
            typo ? (typo === 'default' ? 'l' : typo) : $mq.m ? 'xl' : 'l'
          }`,
        ]"
      />
    </div>
  </div>
</template>
