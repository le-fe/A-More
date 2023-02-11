<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "../../store/board-detail";

const route = useRoute();
const { $api } = useNuxtApp();
const { t } = useLang();
const boardStore = useBoardStore();

definePageMeta({
  layout: "full-page",
  title: null,
});

boardStore.loadBoardData(route.params.id);

const isLoaded = computed(() => boardStore.isLoaded);
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
            <BoardElementList />
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
              <ClientOnly>
                <BoardCanvas v-if="isLoaded" />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>