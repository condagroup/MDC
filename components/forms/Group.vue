<script>
export default {
  name: "FormGroup",
};
</script>

<script setup>
import {
  FormsElementsChoices as Choices,
  FormsElementsFiles as Files,
  FormsElementsInput as Input,
} from "#components";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const types = new Map([
  ["checkbox", "checkbox"],
  ["date", "date"],
  ["email", "email"],
  ["fileupload", "file"],
  ["multiselect", "select"],
  ["number", "number"],
  ["password", "password"],
  ["phone", "tel"],
  ["radio", "radio"],
  ["select", "select"],
  ["text", "text"],
  ["textarea", "textarea"],
  ["time", "time"],
  ["website", "url"],
]);

const elements = new Map([
  ["checkbox", Choices],
  ["date", Input],
  ["email", Input],
  ["file", Files],
  ["number", Input],
  ["password", Input],
  ["radio", Choices],
  ["select", Choices],
  ["tel", Input],
  ["text", Input],
  ["textarea", Input],
  ["time", Input],
  ["url", Input],
]);

const group = computed(() => {
  const value = props.data.fields.find((field) => field.type === "section");
  if (value) {
    return value;
  }
  return false;
});

const fields = computed(() => {
  const value = props.data.fields.map((field) => {
    const parsed = {
      accept: field.allowedExtensions,
      choices: field.choices,
      cols: field.layoutGridColumnSpan,
      description: field.description,
      error: field.errorMessage,
      formId: props.data.formId,
      id: field.id,
      key: `${props.data.formId}-${field.id}-${field.label
        .split(" ")
        .join("")
        .toLowerCase()}`,
      label: field.label,
      max: field.rangeMax,
      maxFileSize: field.maxFileSize,
      maxFiles: field.maxFiles,
      maxLength: field.maxLength,
      min: field.rangeMin,
      minLength: field.minLength,
      placeholder: field.placeholder,
      required: field.isRequired,
      type: types.get(field.type),
      value: field.defaultValue,
    };

    if (field.type === "checkbox" || field.type === "multiselect") {
      parsed.multiple = true;
    }

    if (field.type === "fileupload") {
      if (field.multipleFiles) {
        parsed.multiple = true;
      }
    }

    if (field.phoneFormat) {
      if (field.phoneFormat === "standard") {
        parsed.pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}";
      }
    }

    return parsed;
  });

  return value;
});
</script>

<template>
  <fieldset>
    <FormsUiHeader
      v-if="group.label"
      v-pad="{ all: '0', bottom: 's' }"
      :data="{
        label: group.label,
        description: group.description,
        tag: 'legend',
      }"
    />
    <div>
      <div v-grid="{ cols: 12, gap: ['m', '0'] }">
        <component
          v-cols="field.cols || 12"
          v-for="field in fields"
          :key="field.key"
          :is="elements.get(field.type)"
          :data="field"
        />
      </div>
    </div>
  </fieldset>
</template>
