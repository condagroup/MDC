export const useProductsStore = defineStore('products', {
    state: () => ({
        product: null,
    }),
    getters: {
        selectedProduct: (state) => {
          return state.product
    }},
    actions: {
        selectProduct(product) {
            this.product = product;
        },
    }
})