<script setup lang="ts">
import { ref } from "vue";
import { IElement } from "../../../interfaces";

const { $api } = useNuxtApp();
const { t } = useLang();

const tabs = [
  { name: t("core.element"), ic: "element", value: "element" },
  { name: t("core.image"), ic: "image", value: "image" },
  { name: t("core.text"), ic: "text", value: "text" },
];

const activeTab = ref<string>(tabs[0].value);
const elements = ref<IElement[]>([]);

loadElements();

async function loadElements() {
  const res = await $api.element.list();
  if (res.ok) {
    elements.value = res.data.data;
  }
}
</script>
<template>
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
            class="tab tab-lg tab-lifted flex items-center justify-center px-4"
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
            <template v-for="element in elements" :key="element.id">
              <div class="group relative">
                <BoardElementListItem :element="element" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>