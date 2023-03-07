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

if (form) {
  store = useFormStore(form);
  request = store.request;
  store.initRequest(id, { type: props.data.type });
  if (props.data.value) {
    store.updateRequest(id, "value", props.data.value);
  }
} else {
  if (props.data.value) {
    request.value = props.data.value;
  }
}

const value = computed(() => {
  if (form) {
    return request[id].value;
  }
  return request.value;
});

function updateValue(value) {
  if (form) {
    store.updateRequest(id, "value", value);
  } else {
    request.value = value;
    emit("update", value);
  }
}

const { theme, plain } = props.data;
</script>

<template>
  <div :class="['typo--4', theme]" v-lay="{ gap: 's', align: ['start'] }">
    <FormsUiHeader v-show="!plain" :data="{
      key: data.key,
      label: data.label,
      description: data.description,
      required: data.required,
    }" />
    <div>
      <div v-lay="'o'">
        <component v-pad="'s'" :is="data.type === 'textarea' ? 'textarea' : 'input'" :type="data.type" :id="data.key"
          :name="data.id" :required="data.required" :placeholder="data.placeholder" :minlength="data.minLength"
          :maxlength="data.maxLength" :min="data.min" :max="data.max" :multiple="data.multiple" :pattern="data.pattern"
          :rows="data.rows || 2" size="1" cols="1" :value="value" @input="updateValue($event.target.value)" />
        <ElementsLink @click="updateValue(null)" :data="{ themes: ['button', 'icon', 'plain'] }">
          <ElementsIcon :data="{ name: 'cross', size: 's', color: 'white' }" />
        </ElementsLink>
      </div>
      <FormsUiFooter v-show="!plain" :error="data.error" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.dark {
  input {
    background: var(--color-alpha3);
    color: var(--color-white);
    border-radius: var(--radius);
    border: var(--line) transparent solid;
    transition: border-color 0.3s;

    &:focus {
      border-color: var(--color-alpha2);
    }
  }
}

input:placeholder-shown+.button.icon {
  opacity: 0;
}

.button.icon {
  justify-self: end;
  transition: opacity 0.3s;
}
</style>
