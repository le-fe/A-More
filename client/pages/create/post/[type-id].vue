<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { IPostCategory } from "@/interfaces";

const route = useRoute();
const { $api } = useNuxtApp();
const { t } = useLang();

definePageMeta({
  layout: "full-page",
  title: null,
});

const tabs = [
  { name: t("core.element"), ic: "element", value: "element" },
  { name: t("core.image"), ic: "image", value: "image" },
  { name: t("core.text"), ic: "text", value: "text" },
  { name: t("core.comment"), ic: "quote", value: "comment" },
];

const activeTab = ref<string>(tabs[0].value);
const category = ref<IPostCategory>();
const pending = ref<boolean>(false);

fetchCategory();

async function fetchCategory() {
  pending.value = true;
  const res = await $api.postCategories.retrieve(route.params.typeid);
  console.log(res);
  pending.value = false;
}
</script>
<template>
  <div class="flex-grow lg:grid lg:grid-cols-10">
    <div
      class="
        col-span-0
        hidden
        lg:col-span-4 lg:flex
        border-light-border-primary
        dark:border-dark-border-primary
        divide-light-border-primary
        dark:divide-dark-border-primary
      "
    >
      <div
        class="
          right-0
          h-full
          top-[57px]
          fixed
          w-[400px]
          lg:pl-0 lg:rounded-none lg:relative lg:top-auto lg:w-full
          animate-slideInLeft
          lg:animate-none
          bg-light-bg-base
          dark:bg-dark-bg-base
          border-light-border-primary
          dark:border-dark-border-primary
          divide-light-border-primary
          dark:divide-dark-border-primary
        "
      >
        <div
          class="
            items-between
            absolute
            flex
            h-full
            w-full
            flex-col
            overflow-auto
            pb-md
            px-4
            py-4
          "
        >
          <div class="flex-grow">
            <div
              class="
                bg-light-bg-base
                dark:bg-dark-bg-base
                border-light-border-primary
                dark:border-dark-border-primary
                divide-light-border-primary
                dark:divide-dark-border-primary
              "
            >
              <div
                class="
                  sticky
                  top-0
                  z-header
                  px-sm
                  bg-light-bg-base
                  dark:bg-dark-bg-base
                  border-light-border-primary
                  dark:border-dark-border-primary
                  divide-light-border-primary
                  dark:divide-dark-border-primary
                "
              >
                <div class="tabs">
                  <template v-for="tab in tabs" :key="tab.value">
                    <a
                      class="
                        tab tab-lg tab-lifted
                        flex
                        items-center
                        justify-center
                        px-4
                      "
                      @click="activeTab = tab.value"
                      :class="{ 'tab-active': activeTab === tab.value }"
                    >
                      <Icon :name="tab.ic" />
                      <span class="ml-2">{{ tab.name }}</span>
                    </a>
                  </template>
                </div>
              </div>
              <div class="py-sm md:px-sm">
                <div
                  class="
                    z-header
                    sticky
                    md:py-sm md:-mt-sm md:px-0
                    top-[49px]
                    md:top-[65px]
                    bg-light-bg-base
                    dark:bg-dark-bg-base
                    border-light-border-primary
                    dark:border-dark-border-primary
                    divide-light-border-primary
                    dark:divide-dark-border-primary
                  "
                >
                  <div
                    class="
                      pl-md
                      py-sm
                      md:rounded-md
                      bg-light-bg-card
                      dark:bg-dark-bg-card
                      border-light-border-primary
                      dark:border-dark-border-primary
                      divide-light-border-primary
                      dark:divide-dark-border-primary
                    "
                  >
                    <div class="flex items-center pt-sm">
                      <div class="relative w-full">
                        <input
                          type="text"
                          placeholder="Search our library of products &amp; brands"
                          class="input w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-sm md:px-0">
                  <div class="flex flex-col gap-xs mt-sm">
                    <div
                      class="
                        grid grid-flow-row grid-cols-2
                        lg:grid-cols-2
                        xl:grid-cols-3
                        2xl:grid-cols-3
                        gap-sm
                        border-light-border-secondary
                        dark:border-dark-border-secondary
                        divide-light-border-secondary
                        dark:divide-dark-border-secondary
                      "
                    >
                      <div class="group relative">Item</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative h-full lg:col-span-6">
      <div
        class="
          flex
          h-full
          items-center
          overflow-hidden
          p-xs
          2xl:p-md
          bg-light-bg-base
          dark:bg-dark-bg-base
          border-light-border-primary
          dark:border-dark-border-primary
          divide-light-border-primary
          dark:divide-dark-border-primary
        "
      >
        <div
          class="
            my-auto
            flex
            h-full
            w-full
            flex-col
            md:mt-md md:px-sm
            justify-center
            md:justify-start md:pt-10 md:pl-10 md:pr-10
          "
        >
          <div
            class="aspect-[1/1] bg-white rounded-2xl overflow-hidden"
            style="height: 75vh"
          >
            <div class="h-full w-full flex items-center justify-center">
              <CreatePostCanvas />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>