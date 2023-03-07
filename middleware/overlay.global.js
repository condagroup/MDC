import { useStore } from '@/store';
export default defineNuxtRouteMiddleware((to, from) => {
  to.meta.fromPath = from.path;
  if (to.meta.overlay && from.path !== to.path) {
    const toRoute = to.matched[0];
    const fromRoute = from.matched[0];

    toRoute.components.default = fromRoute.components.default;
    toRoute.props.default = { slug: from.params.slug || 'shop' };
  }

  if (from.meta.overlay && !to.meta.overlay) {
    const { lockBody } = storeToRefs(useStore());
    lockBody.value.value = false;
  }
});
