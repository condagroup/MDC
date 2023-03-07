import { createHttpLink } from '@apollo/client/core';

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query['x-craft-live-preview'] && to.query.token) {
    const config = useRuntimeConfig();
    const { $apollo } = useNuxtApp();

    const httpLink = createHttpLink({
      uri: `${config.public.craftApi}?token=${to.query.token}`,
    });

    $apollo.clients.default.setLink(httpLink);
  }
});
