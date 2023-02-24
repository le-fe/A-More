<script setup lang="ts">
import { ref, defineAsyncComponent, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "../../store/board-detail";
import { IElement } from "../../../interfaces";

definePageMeta({
  layout: "blank",
  title: null,
});

const { t } = useLang();
const route = useRoute();
const { $api } = useNuxtApp();
const { loadBoardData, saveBoardData, board, isLoaded } = toRefs(
  useBoardStore()
);

const TABS = [
  { name: t("core.element"), ic: "element", value: "element" },
  { name: t("core.template"), ic: "image", value: "template" },
  // { name: t("core.text"), ic: "text", value: "text" },
];
const activeTab = ref<string>(TABS[0].value);

const isUpdatingTitle = ref(false);

const TEMPLATE_COMPONENT = {
  GRID: defineAsyncComponent(
    () => import("~/components/Board/Template/Grid.vue")
  ),
  LIST: defineAsyncComponent(
    () => import("~/components/Board/Template/List.vue")
  ),
};

loadBoardData.value(route.params.id);
</script>
<template>
  <div class="h-screen w-screen overflow-hidden">
    <div class="h-[65px] flex items-center justify-center">
      <div class="container mx-auto">
        <div class="flex justify-between">
          <div class="flex items-center">
            <CButton icon="back" @click="$router.go(-1)">{{ `Back` }}</CButton>
            <template v-if="isLoaded">
              <div class="ml-4">
                <template v-if="isUpdatingTitle">
                  <input
                    class="text-2xl font-semibold border-transparent focus:border-transparent outline-none focus:outline-none bg-transparent focus:bg-slate-300 px-4 py-2 rounded-lg"
                    spellcheck="false"
                    v-model="board.name"
                    @blur="saveBoardData"
                  />
                </template>
                <template v-else>
                  <h1
                    class="text-2xl font-semibold px-4 py-2"
                    @click="isUpdatingTitle = true"
                  >
                    {{ board.name }}
                  </h1>
                </template>
              </div>
            </template>
          </div>
          <div>
            <CButton icon="publish" @click="saveBoardData">
              {{ `Publish your Board` }}
            </CButton>
          </div>
        </div>
      </div>
    </div>
    <div class="flex h-[80vh] container mx-auto">
      <div class="w-1/2 py-8">
        <div class="h-full overflow-hidden flex flex-col">
          <div class="">
            <div class="tabs">
              <template v-for="tab in TABS" :key="tab.value">
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
          <BoardElementList v-if="activeTab === 'element'" />
          <BoardTemplates v-if="activeTab === 'template'" />
        </div>
      </div>
      <div class="relative w-1/2 pl-10">
        <BoardCanvasToolbar />
        <div class="w-full aspect-square bg-white rounded-2xl overflow-hidden">
          <div class="h-full w-full flex items-center justify-center">
            <ClientOnly>
              <div class="h-full w-full select-none">
                <template v-if="TEMPLATE_COMPONENT[board.template]">
                  <component :is="TEMPLATE_COMPONENT[board.template]" />
                </template>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
