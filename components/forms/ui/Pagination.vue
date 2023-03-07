<script setup>
import useFormStore from "@/components/forms/store";

const props = defineProps({
  length: {
    type: Number,
    required: true,
  },
});

const { currentPage } = useFormStore(props.data.formId);

function setPage(next = true) {
  if (next) {
    currentPage.value += 1;
  } else currentPage.value -= 1;
}
</script>

<template>
  <div v-lay="{ dir: 'h', gap: 's' }">
    <button :disabled="currentPage === 0" @click.prevent="setPage(false)">
      {{ $t("previous") }}
    </button>
    <button :disabled="currentPage === length - 1" @click.prevent="setPage">
      {{ $t("next") }}
    </button>
  </div>
</template>
