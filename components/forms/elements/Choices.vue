<script setup>
import useFormStore from "@/components/forms/store";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const form = props.data.formId;

let request = ref();
let store = null;
const id = props.data.id;

const choices = computed(() => {
  const value = props.data.choices.map((choice, index) => {
    return {
      key: `${id}-${index}-${choice.text
        .toString()
        .split(" ")
        .join("")
        .toLowerCase()}`,
      label: choice.text,
      selected: choice.isSelected || choice.selected,
      value: choice.value,
      hue: choice.hue,
    };
  });
  return value;
});

const selected = choices.value
  .filter((choice) => choice.selected)
  .map((choice) => choice.value);

const multiple = props.data.multiple || props.data.type === "checkbox";

if (form) {
  store = useFormStore(form);
  request = store.request;
  store.initRequest(id, { type: props.data.type });

  if (multiple) {
    store.updateRequest(id, "value", [...selected]);
  } else if (selected.length) {
    store.updateRequest(id, "value", selected[0]);
  }
} else {
  if (multiple) {
    request.value = [...selected];
  } else if (selected.length) {
    request.value = selected[0];
  }
}

function required(type, required, id, index) {
  if (type === "checkbox") {
    if (required && !request[id].value.length) {
      return true;
    }
  }
  if (type === "radio") {
    if (required && index === 0) {
      return true;
    }
  }
  return false;
}

const value = computed({
  get() {
    if (form) {
      return request[id].value;
    }
    return request.value;
  },
  set(value) {
    if (form) {
      store.updateRequest(id, "value", value);
    } else {
      request.value = value;
      emit("update", value);
    }
  },
});
</script>

<template>
  <div v-lay="{ gap: 's', align: ['start'] }" v-if="data.type === 'select'">
    <FormsUiHeader
      :data="{
        key: data.key,
        label: data.label,
        description: data.description,
        required: data.required,
      }"
    />
    <div>
      <select
        :id="data.key"
        :name="data.id"
        :multiple="data.multiple"
        v-model="value"
        :size="data.multiple ? 2 : 1"
      >
        <option
          v-for="choice in choices"
          :key="choice.value"
          :value="choice.value"
        >
          {{ choice.label }}
        </option>
      </select>
      <FormsUiFooter :error="data.error" />
    </div>
  </div>
  <fieldset v-space v-lay="{ gap: 'xl', align: ['start'] }" v-else>
    <FormsUiHeader
      v-if="data.label"
      :data="{
        label: data.label,
        description: data.description,
        required: data.required,
        tag: 'legend',
      }"
    />
    <div v-lay="{ dir: 'h', fluid: true }">
      <div
        v-lay="{ dir: 'h', gap: 's', fluid: true }"
        v-for="(choice, index) in choices"
        :key="choice.value"
        :class="[
          'choice',
          {
            active:
              value === choice.value ||
              (multiple && value.includes(choice.value)),
          },
        ]"
        :style="{
          borderColor: choice.hue
            ? `hsl(${choice.hue}, 100%, 80%)`
            : 'transparent',
        }"
      >
        <input
          :type="data.type"
          :id="choice.key"
          :name="data.id || 'default'"
          :required="required(data.type, data.required, data.id, index)"
          :value="choice.value"
          v-model="value"
          size="1"
        />
        <label v-pad="'s'" class="typo--p--trimmed" :for="choice.key">{{
          choice.label
        }}</label>
      </div>
      <FormsUiFooter v-if="false" :error="data.error" />
    </div>
  </fieldset>
</template>

<style lang="postcss" scoped>
.choice {
  > * {
    cursor: pointer;
  }
}

input[type="radio"],
input[type="checkbox"] {
  display: none;
}

.choice {
  background: var(--color-grey);
  border: solid var(--line) transparent;

  @media (--hover) {
    &:hover {
      background: var(--color-darkgrey);
    }
  }
}

.active {
  background: var(--color-darkgrey);
}

label {
  text-align: center;
}
</style>
