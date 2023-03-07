import getCart, {
  create as createCart,
  add as addToCart,
  remove as removeFromCart,
  update,
} from '@/apollo/shopify/queries/cart';

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    cartOpen: false,
    id: null,
    lines: {
      nodes: [],
    },
    checkoutUrl: null,
    cost: {
      totalAmount: null,
      subtotalAmount: null,
    },
    totalQuantity: 0,
    loading: false,
    isAdded: false,
  }),
  getters: {
    cartOpened: (state) => state.cartOpen,
    items: (state) => {
      if (state && state.lineItems) {
        return state.lineItems.nodes;
      } else {
        return [];
      }
    },
    itemInCart: (state) => (itemId) => state.items.find((item) => item.merchandise.id === itemId),

    idFromCookie: (state) => {
      const cartIdFromCookie = useCookie('mdc-cart');

      return state.id ? state.id : cartIdFromCookie.value;
    },
    totalPrice: (state) => state.cost.subtotalAmount,
  },
  actions: {
    toggleCart() {
      this.cartOpen = !this.cartOpen;
    },
    setBase(response) {
      this.$patch(response);
    },
    setId(id) {
      const cookie = useCookie('mdc-cart');
      cookie.value = id;
      this.id = id;
    },
    async getRequest() {
      const { clients } = useApollo();
      const client = clients.shopify;
      const cartId = this.idFromCookie;

      if (cartId) {
        const { data } = await client.query({
          query: getCart,
          variables: {
            cartId: cartId,
            countryCode: useCountryCode(),
          },
        });

        await this.setRequest(data.cart);
      }

      return undefined;
    },
    async setRequest(data) {
      const cartId = this.idFromCookie;
      if (cartId) {
        if (data && data.cart) {
          this.$patch(data.cart);
        } else {
          this.setId(null);
        }

        return data?.cart;
      } else {
        this.setId(null);
      }

      return false;
    },
    async add({ itemId, quantity = 1 }) {
      // set loading true
      this.loading = true;

      const { clients } = useApollo();
      const client = clients.shopify;

      let response = null;
      const cartId = this.idFromCookie;
      if (cartId) {
        const variables = {
          cartId: cartId,
          lines: [
            {
              merchandiseId: itemId,
              quantity,
            },
          ],
          countryCode: useCountryCode(),
        };

        const { data } = await client.mutate({
          mutation: addToCart,
          variables,
        });

        response = data.cartLinesAdd.cart;
      } else {
        let variables = {
          input: {
            lines: [
              {
                merchandiseId: itemId,
                quantity,
              },
            ],
          },
          countryCode: useCountryCode(),
        };

        const { data } = await client.mutate({
          mutation: createCart,
          variables,
        });

        response = data.cartCreate.cart;
      }

      if (response) {
        this.setBase(response);
        this.setId(response.id);

        // set isAdded true and reset false after 1s
        this.isAdded = true;

        setTimeout(() => {
          this.isAdded = false;
        }, 1000);

        // const marketingLines = response.lineItems.nodes.map(
        //   (line) => ({
        //     merchandise: {
        //       product: {
        //         title: line.title,
        //       },
        //       sku: line.variant.sku,
        //       title: line.variant.title,
        //       price: line.variant.priceV2.amount,
        //       id: line.variant.id,
        //       type: 'B2C',
        //       quantity: line.quantity,
        //     },
        //   })
        // );

        // useMarketing(null, 'add_to_cart', {
        //   products: { nodes: marketingLines },
        //   itemIdAdded: [itemId],
        // });
      }

      // set loading false
      this.loading = false;
    },
    async remove(itemId) {
      const { clients } = useApollo();
      const client = clients.shopify;

      let response = null;
      const cartId = this.idFromCookie;
      if (cartId) {
        const variables = {
          cartId: cartId,
          lineIds: [itemId],
          countryCode: useCountryCode(),
        };
        const { data } = await client.mutate({
          mutation: removeFromCart,
          variables,
        });

        response = data.cartLinesRemove.cart;
      }

      if (response) {
        this.setBase(response);
      }
    },
    async empty() {
      const { clients } = useApollo();
      const client = clients.shopify;

      let response = null;
      const cartId = this.idFromCookie;
      if (cartId) {
        const variables = {
          cartId: cartId,
          lineIds: this.lines.nodes.map((line) => line.id),
          countryCode: useCountryCode(),
        };
        const { data } = await client.mutate({
          mutation: removeFromCart,
          variables,
        });

        response = data.cartLinesRemove.cart;
      }

      if (response) {
        this.setBase(response);
      }
    },
    async updateQty({ itemId, quantity, snackbar = true }) {
      const { clients } = useApollo();
      const client = clients.shopify;

      let response = null;
      const cartId = this.idFromCookie;

      if (cartId) {
        const variables = {
          cartId: cartId,
          lines: {
            id: itemId,
            quantity,
          },
          countryCode: useCountryCode(),
        };
        const { data } = await client.mutate({
          mutation: update,
          variables,
        });

        response = data.cartLinesUpdate.cart;
      }

      if (response) {
        this.setBase(response);
      }
    },
    // async updateUser() {
    //   const user = useUserStore();
    //   const { logged, token, customer } = storeToRefs(user);

    //   const { clients } = useApollo();
    //   const client = clients.shopify;

    //   let response = null;

    //   if (logged.value) {
    //     const { data: dataCheckoutBuyer } = await client.mutate({
    //       mutation: associateBuyer,
    //       variables: {
    //         checkoutId: this.id,
    //         customerAccessToken: token.value,
    //         countryCode: useCountryCode(),
    //       },
    //     });

    //     response =
    //       dataCheckoutBuyer.checkoutCustomerAssociateV2.checkout;
    //   }

    //   if (logged.value && !this.shippingAddress) {
    //     const variables = {
    //       checkoutId: this.id,
    //       shippingAddress: {
    //         address1: customer.value.defaultAddress?.address1,
    //         city: customer.value.defaultAddress?.city,
    //         country: customer.value.defaultAddress?.country,
    //         firstName: customer.value.defaultAddress?.firstName,
    //         lastName: customer.value.defaultAddress?.lastName,
    //         phone: customer.value.defaultAddress?.phone,
    //         province: customer.value.defaultAddress?.province,
    //         zip: customer.value.defaultAddress?.zip,
    //       },
    //       countryCode: useCountryCode(),
    //     };

    //     const { data } = await client.mutate({
    //       mutation: updateShipping,
    //       variables,
    //     });

    //     response = data.checkoutShippingAddressUpdateV2.checkout;
    //   }

    //   if (response) {
    //     this.setBase(response);
    //     this.setId(response.id);
    //   }
    // },
  },
});
