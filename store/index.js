export const useStore = defineStore('store', () => {
  const route = useRoute();
  const isFiltered = ref(route.query.artist);
  const overlayReady = ref(false);
  const lockBody = ref();
  const modal = ref(false);

  return { isFiltered, overlayReady, lockBody, modal };
});
