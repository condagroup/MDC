import { defineApolloClient } from '@nuxtjs/apollo';
// import schema from './shopify.json';

// const possibleTypes = [];

// schema.__schema.types.forEach((supertype) => {
//   if (supertype.possibleTypes) {
//     possibleTypes[supertype.name] = supertype.possibleTypes.map(
//       (subtype) => subtype.name
//     );
//   }
// });

export default defineApolloClient({
  httpEndpoint: process.env.NUXT_PUBLIC_SHOPIFY_API,
  httpLinkOptions: {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NUXT_PUBLIC_SHOPIFY_TOKEN,
    },
  },
  // inMemoryCacheOptions: {
  //   possibleTypes,
  // },
});
