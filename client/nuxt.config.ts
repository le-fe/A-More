import UnpluginComponentsVite from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  ssr: true,
  // typescripts
  typescript: {
    strict: false,
    typeCheck: false,
  },
  buildModules: ["@nuxt/postcss8", "@nuxt/typescript-build"],
  modules: [
    "unplugin-icons/nuxt",
    "@intlify/nuxt3",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
  ],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        daisyui: {},
      },
    },
  },
  // auto import components
  css: ["@/assets/styles/app.scss"], // vite plugins
  components: true,
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      svgLoader(),
    ],
  },
  // localization - i18n config
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "id", "ja", "ko"],
    },
  },
  // vueuse
  vueuse: {
    ssrHandlers: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      mediaBase: process.env.MEDIA_BASE_URL,
    },
  },
});
