<script setup>
defineProps({
  data: {
    type: Object
  },
  active: {
    type: Number
  }
})

const el = ref();

const { width } = useElementBounding(el);
</script>

<template>
  <div :class="{ 'step': true, 'step-active': data.index === active, 'step-inactive': data.index > active }">
    <div class="marker typo--s">
      {{ data.index }}
    </div>
    <div :class="['title', 'width-transition', 'typo--m', { active: data.index === active }]" v-show="$mq.m"
      :style="{ width: data.index === active ? `${width}px` : '0px' }">
      <div ref="el">
        {{ data.title }}
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.step {
  display: flex;
  align-items: center;
  margin-right: var(--spacer-xs);
  cursor: pointer;
  overflow: hidden;

  .marker {
    background: var(--color-black);
    color: var(--color-white);
    width: 14px;
    height: 14px;
    border-radius: 100%;
    text-align: center;
    line-height: 14px;
    margin-right: var(--spacer-xxs);
  }

  &-active {
    cursor: default;
  }

  &-inactive {
    cursor: default;
    opacity: 0.5;
  }
}
</style>