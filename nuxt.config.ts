import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  nitro: {
    preset: 'node_cluster',
    compressPublicAssets: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      craftApi: process.env.NUXT_PUBLIC_CRAFT_API,
    },
  },
  modules: [
    ['./modules/labels/index.mjs'],
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
    '@vueuse/nuxt',
    'nuxt-swiper',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
  ],
  i18n: {
    locales: [
      {
        code: 'it',
        name: 'Ita',
      },
      {
        code: 'en',
        name: 'En',
      },
      {
        code: 'zh',
        name: 'ä¸­æ–‡',
      },
    ],
    defaultLocale: 'en',
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: { en: {}, it: {}, zh: {} },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
    },
  },
  app: {
    head: {
      script: [
        {
          innerHTML: `
          (function(d, w, c) {
              w.SibConversationsID = '63d8e508f6b5cd254d4cde67';
              window.SibConversationsSetup = { customWidgetButton: '.chatbot' };
              w[c] = w[c] || function() {
                  (w[c].q = w[c].q || []).push(arguments);
              };
              var s = d.createElement('script');
              s.async = true;
              s.src = 'https://conversations-widget.sendinblue.com/sib-conversations.js';
              if (d.head) d.head.appendChild(s);
          })(document, window, 'SibConversations');
      `,
        },
      ],
    },
  },
  apollo: {
    clients: {
      craft: './apollo/craft/config.js',
      shopify: './apollo/shopify/config.js',
    },
  },
  css: ['@/assets/css/index.css'],
  postcss: {
    plugins: {
      'postcss-each': {},
      'postcss-simple-vars': {
        silent: true,
        variables: function () {
          return require('./postcss.variables');
        },
      },
      'postcss-custom-media': {
        importFrom: './assets/css/media.css',
      },
      'postcss-preset-env': {
        stage: 0,
        features: {
          'nesting-rules': false,
          'custom-media-queries': false,
        },
      },
      'postcss-nested': {},
      'postcss-extend-rule': {},
    },
  },
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'raw',
      }),
    ],
  },
});
