<script>
export default {
  name: "Form",
};
</script>

<script setup>
import useFormStore from "@/components/forms/store";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const store = useFormStore(props.data.formId);
const { request, currentPage } = storeToRefs(store);

const pages = computed(() => {
  const value = [[]];
  let currentPage = 1;
  props.data.fields.forEach((field) => {
    const page = field.page || 1;
    if (page > currentPage) {
      value.push([]);
      currentPage += 1;
      return;
    }
    value[page - 1].push(field);
  });
  return value;
});

const submit = computed(() => {
  return {
    text: props.data.submitButton.text,
  };
});
</script>

<template>
  <form v-lay="{ gap: 'l' }" @submit.prevent="$emit('submit-form', request)">
    <FormsPage
      v-for="(page, index) in pages"
      v-show="currentPage === index"
      :data="{ groups: page, formId: data.formId }"
    />
    <div v-lay="{ align: 'center' }">
      <ElementsLink>
        {{ submit.text }}
      </ElementsLink>
    </div>
    <FormsUiPagination v-if="pages.length > 1" :length="pages.length" />
  </form>
</template>

<style lang="postcss">
form {
  --color-invalid: rgb(255, 0, 0);
  --color-valid: rgb(0, 255, 0);

  input:invalid:not(:focus):not(:placeholder-shown):not([type="date"]):not(
      [type="file"]
    ) {
    border-color: var(--color-invalid);
    color: var(--color-invalid);

    & + .error {
      visibility: visible;
    }
  }
}
input {
  width: 100%;
}
::placeholder {
  color: var(--color-grey1);
}
</style>
