<script lang="ts" setup>
import { AppConfigInput } from "@nuxt/schema";
import { AppSetup } from "./utils/app";
import { ITheme } from "./utils/theme";
import { useAuthStore } from "./store/auth";
AppSetup();
const theme = useState<ITheme>("theme.current");
const locale = useState<string>("locale.setting");
const app = useAppConfig() as AppConfigInput;
const authStore = useAuthStore();

const isLoaded = ref<boolean>(false);

useHead({
  title: app.name,
  titleTemplate: "%s - Couple fairs",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: "Couple fairs",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

authStore.queryMe().finally(() => {
  isLoaded.value = true;
});
</script>

<template>
  <Html
    :class="`${theme === 'dark' ? 'dark' : ''}`"
    :lang="locale"
    data-theme="light"
  >
    <Body
      class="
        antialiased
        duration-300
        transition-colors
        text-gray-800
        dark:text-gray-200
        bg-white
        dark:bg-gray-900
      "
    >
      <NuxtLayout v-if="isLoaded">
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
