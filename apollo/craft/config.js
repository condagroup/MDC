import { defineApolloClient } from '@nuxtjs/apollo';
// import schema from './craft.json';

// const possibleTypes = [];

// schema.__schema.types.forEach((supertype) => {
//   if (supertype.possibleTypes) {
//     possibleTypes[supertype.name] = supertype.possibleTypes.map(
//       (subtype) => subtype.name
//     );
//   }
// });

export default defineApolloClient({
  httpEndpoint: process.env.NUXT_PUBLIC_CRAFT_API,
  // inMemoryCacheOptions: {
  //   possibleTypes,
  // },
});
