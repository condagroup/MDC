import { defineNuxtModule } from '@nuxt/kit';
import labelsQuery from './queries/index.mjs';
import pkg from '@apollo/client/core/core.cjs';
const { ApolloClient, InMemoryCache } = pkg;

export default defineNuxtModule({
  meta: {
    name: '@gigads/labels',
  },
  setup(options, nuxt) {
    const craft = new ApolloClient({
      uri: process.env.NUXT_PUBLIC_CRAFT_API,
      cache: new InMemoryCache(),
    });

    nuxt.hook('i18n:extend-messages', async (additionalMessages, localeCodes) => {
      const promises = localeCodes.map((locale) =>
        craft.query({
          query: labelsQuery,
          variables: {
            site: locale,
          },
        })
      );

      const data = await Promise.all(promises);
      if (data) {
        const labels = data.reduce(
          (
            reducer,
            {
              data: {
                entry: { siteHandle, labels },
              },
            }
          ) => ({
            ...reducer,
            [siteHandle]: labels.reduce(
              (reducer, { key, value }) => ({
                ...reducer,
                [key]: value,
              }),
              {}
            ),
          }),
          {}
        );

        additionalMessages.push(labels);
      }
    });
  },
});
