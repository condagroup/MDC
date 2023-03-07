<script setup>
import useFormStore from "@/components/forms/store";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const id = props.data.id;
const { initRequest, updateRequest } = useFormStore(props.data.formId);
initRequest(id, { type: props.data.type });

function model(input) {
  updateRequest(id, "value", input.files[0]);
}
</script>

<template>
  <div v-lay="{ gap: 's', align: ['start'] }">
    <FormsUiHeader
      v-if="data.label"
      :data="{
        key: data.key,
        label: data.label,
        description: data.description,
        required: data.required,
      }"
    />
    <div>
      <input
        :type="data.type"
        :id="data.key"
        :name="data.id"
        :required="data.required"
        :accept="data.accept"
        :multiple="data.multiple"
        size="1"
        @input="model($event.target)"
      />
      <FormsUiFooter :error="data.error" />
    </div>
  </div>
</template>
