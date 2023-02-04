<script lang="ts" setup>
import { AppConfigInput } from "@nuxt/schema";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../store/auth";

export interface IMenuItem {
  type: "link" | "button";
  text: string;
  href?: any;
  route?: any;
}

const { t } = useLang();
const route = useRoute();
const app = useAppConfig() as AppConfigInput;
const auth = useAuthStore();

const menus = computed((): IMenuItem[] => [
  //{
  //  type: "link",
  //  text: "pages.getting-started.nav",
  //  route: { name: "getting-started" },
  //},
  //{ type: "link", text: "pages.blank.nav", route: { name: "blank" } },
  //{ type: "link", text: "pages.test.nav", route: { name: "test" } },
  //{ type: "link", text: "pages.post.nav", route: { name: "post" } },
  //{ type: "link", text: "pages.setting.nav", route: { name: "setting" } },
  //{
  //  type: "button",
  //  text: "pages.dashboard.nav",
  //  route: { name: "dashboard" },
  //},
]);

function handleLogout() {
  auth.logout();
}
</script>

<template>
  <header
    class="app-header sticky top-0 bg-white z-30 flex h-16 w-full items-center justify-between border-b border-light-300 bg-light py-1 ltr:left-0 rtl:right-0 dark:border-dark-300 dark:bg-dark-250 sm:h-[70px]"
  >
    <div class="navbar px-6">
      <div class="flex-1 px-2 lg:flex-none">
        <div class="flex items-center gap-4">
          <div v-if="route.meta.title" class="font-semibold text-2xl">
            {{ route.meta.title }}
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end flex-1">
        <div class="flex items-stretch">
          <a class="btn btn-ghost rounded-btn mr-4">Button</a>
          <template v-if="auth.authUser">
            <div class="dropdown dropdown-end">
              <label
                tabindex="0"
                class="ml-1 h-full flex items-center cursor-pointer btn"
              >
                <div class="avatar">
                  <div class="w-8 mask mask-hexagon">
                    <img :src="auth.authUser.imgUrl" />
                  </div>
                </div>
                <div class="font-semibold ml-2">
                  {{ auth.authUser.fullName }}
                </div>
              </label>
              <ul
                tabindex="0"
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>{{ t("core.profile") }}</a>
                </li>
                <li><a @click="handleLogout">Log out</a></li>
              </ul>
            </div>
          </template>
          <template v-else>
            <NuxtLink :to="{ name: 'auth' }">
              <CButton>
                {{ t("core.login") }} / {{ t("core.register") }}
              </CButton>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
