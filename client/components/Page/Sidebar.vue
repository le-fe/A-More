<script lang="ts" setup>
import { AppConfigInput } from "@nuxt/schema";
import { useRoute } from "vue-router";
const app = useAppConfig() as AppConfigInput;
const route = useRoute();

const menuItems = [
  { title: "Dashboard", value: "dashboard", icon: "home", routeName: "index" },
  { title: "Explore", value: "explore", icon: "explore", routeName: "explore" },
  {
    title: "Recent Boards",
    value: "recent-board",
    icon: "board-color",
    routeName: "boards-recent",
  },
  { title: "Travel", value: "products", icon: "cart", routeName: "product" },
  { title: "Saved", value: "saved", icon: "bookmark", routeName: "saved" },
  {
    title: "Top Authors",
    value: "top-authors",
    icon: "user",
    routeName: "top-authors",
  },
  { title: "Products", value: "products", icon: "cart", routeName: "product" },
];
</script>
<template>
  <aside aria-label="Sidebar">
    <div
      class="
        px-3
        pb-4
        overflow-y-auto
        rounded
        bg-gray-50
        dark:bg-gray-800
        h-screen
        overflow-hidden
      "
    >
      <NuxtLink tag="a" class="py-4 block px-2" :to="{ name: 'index' }">
        <span class="sr-only">home</span>
        <span class="flex items-center">
          <Icon name="logo" size="xl" />
          <span class="text-lg font-semibold">{{ app.name }}</span>
        </span>
      </NuxtLink>
      <ul class="space-y-2">
        <template v-for="item in menuItems" :key="item.value">
          <li>
            <NuxtLink
              :to="{ name: item.routeName }"
              class="
                flex
                items-center
                p-2
                text-base
                font-normal
                text-gray-900
                rounded-lg
                dark:text-white
              "
              :class="
                route.name === item.routeName
                  ? 'bg-gray-200 dark:bg-dark-400 hover:bg-gray-300 hover:dark:bg-dark-500'
                  : 'hover:bg-gray-100 hover:dark:bg-dark-300'
              "
            >
              <Icon class="fill-gray-500" :name="item.icon" />
              <span class="ml-2">{{ item.title }}</span>
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>
