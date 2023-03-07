import { mq } from '@gigads/style';

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;
  app.provide(
    'mq',
    process.client
      ? mq
      : ref({
          s: true,
          m: true,
          l: true,
        })
  );

  return {
    provide: {
      mq: process.client
        ? mq.value
        : {
            s: true,
            m: true,
            l: true,
          },
    },
  };
});
