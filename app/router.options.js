export default {
  routes: (routes) => {
    return routes.map((route) => {
      if (route.meta.overlay) {
        return {
          ...route,
          component: undefined,
          components: {
            default: () => import('~/pages/[[slug]].vue'),
            overlay: () => import('~/pages/shop/[slug].vue'),
          },
          props: { slug: 'shop' },
        };
      } else {
        return route;
      }
    });
  },
  scrollBehavior: (to, from) => {
    if (!to.meta.overlay && !from.meta.overlay) {
      return {
        top: 0,
        behavior: 'smooth',
      };
    }
  },
};
