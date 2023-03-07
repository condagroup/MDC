<script>
export default {
  name: "FormPage",
};
</script>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const groups = computed(() => {
  const value = [[]];
  let currentGroup = 0;
  props.data.groups.forEach((field, index) => {
    if (field.type === "SECTION" && index > 0) {
      value.push([]);
      currentGroup += 1;
    }
    value[currentGroup].push(field);
  });
  return value;
});
</script>

<template>
  <div v-lay="{ gap: 'l' }">
    <FormsGroup
      v-for="(group, index) in groups"
      :key="index"
      :data="{ fields: group, formId: data.formId }"
    />
  </div>
</template>
