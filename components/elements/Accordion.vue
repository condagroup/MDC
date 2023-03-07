<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  theme: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  group: {
    type: String,
  },
});

const trigger = ref();

if (props.group) {
  onKeyStroke("Escape", () => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent(`accordion:${props.group}`));
    });
  });
}
</script>

<template>
  <div
    v-accordion="{ group: group, multiple: multiple }"
    :class="[
      'accordion',
      {
        'accordion-disabled': disabled,
        [`accordion--${theme}`]: theme,
        [`accordion--${group}`]: group,
      },
    ]"
  >
    <div
      v-lay="{
        align: [group === 'my-request' ? 'start' : 'center', 'start'],
        dir: 'h',
        fluid: true,
      }"
      v-pad="{
        x: theme === 'filter' ? '0' : '0',
        y: theme === 'filter' ? '0' : '0',
      }"
      ref="trigger"
    >
      <ClientOnly v-if="group === 'my-request'">
        <ElementsLink
          v-show="!disabled"
          class="edit"
          :data="{ fn: () => {}, text: 'Edit' }"
          theme="underline"
        />
      </ClientOnly>
      <ClientOnly v-else>
        <ElementsIcon
          :data="{
            name: 'minus',
          }"
        />
        <ElementsIcon
          :data="{
            name: 'add',
          }"
        />
      </ClientOnly>
      <div :class="theme === 'filter' ? 'typo--xxs--trimmed' : 'typo--xs'">
        <ElementsText :data="{text: label}" />
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.accordion {
  &.open {
    .icon--add {
      display: none;
    }
    .edit {
      display: none;
    }
  }

  &--my-request.open {
    .trigger {
      pointer-events: none;
    }
  }

  &:not(.open) {
    .icon--minus {
      display: none;
    }
  }

  &-disabled {
    pointer-events: none !important;
    .trigger {
      color: var(--color-grey2);
    }
  }

  &--filter {
    background: var(--color-white);
    border-radius: var(--radius);
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 4;
    .trigger {
      border: none;
      min-height: var(--boxed-height);

      @media (--hover) {
        &:hover {
          color: var(--color-accent);
        }
      }
    }

    .content {
      max-height: 300px;
    }
  }
}

.ready {
  .content {
    overflow-y: auto;
  }
}
.trigger {
  border-top: 1px solid var(--color-grey1);
}
</style>
