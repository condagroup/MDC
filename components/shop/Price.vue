<script setup>
const props = defineProps({
  min: {
    type: Object,
    required: true,
  },
  max: {
    type: Object,
    default: () => { },
  },
  available: {
    type: Boolean,
    default: true,
  },
  typo: {
    type: String,
    default: "l",
  },
});

const mq = inject("mq");

const price = computed(() => {
  let amount = "";
  const min = Number(props.min.amount).toFixed(2);
  const separator = "—";
  const currencies = new Map([
    ["EUR", "€"],
    ["USD", "$"],
  ]);
  const currency = props.min.currencyCode;

  const availableLabel = !props.available
    ? `${separator} ${props.$labels.out_of_stock.toUpperCase()}`
    : "";

  if (Number(props.min.amount).toFixed(0).toString() === "0") {
    return availableLabel.replace(`${separator} `, "");
  }

  if (props.max && props.min.amount !== props.max.amount) {
    const max = Number(props.max.amount).toFixed(2);
    amount = `${min} ${separator} ${max}`;
  } else amount = min;

  const currencyString = currencies.get(currency)
    ? currencies.get(currency)
    : currency;

  return `${currencyString}${amount} ${availableLabel}`;
});
</script>

<template>
  <div :class="`typo--${typo}`">{{ price }}</div>
</template>

<style lang="postcss" scoped>
.typo--m {
  color: var(--color-grey2);
}
</style>
