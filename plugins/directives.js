import { defineNuxtPlugin } from "#app";
import { setDirectives } from "@gigads/style";

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  setDirectives(
    [
      "space",
      "pad",
      "lay",
      "grid",
      "cols",
      "visible",
      "ratio",
      "accordion",
      "swap",
    ],
    app
  );
});
