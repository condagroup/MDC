export default defineNuxtRouteMiddleware((to) => {
  if (to.params.slug === 'shop') {
    return navigateTo('/');
  }
});
