<script setup lang="ts">
import { ref, defineAsyncComponent, toRefs } from "vue";
import { useRoute } from "vue-router";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
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
  { name: t("core.background"), ic: "background", value: "background" },
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

function publishBoard() {
  htmlToImage
    .toPng(document.querySelector("#capture"))
    .then(function (dataUrl) {
      var image = new Image();
      image.src = dataUrl;

      var w = window.open("");
      w.document.write(image.outerHTML);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}
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
            <CButton
              v-if="board.isPublished === false"
              icon="publish"
              @click="publishBoard"
            >
              {{ `Publish your Board` }}
            </CButton>
          </div>
        </div>
      </div>
    </div>
    <div class="flex h-[80vh] container mx-auto">
      <div class="w-1/3 py-8">
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
          <BoardTextureList v-if="activeTab === 'background'" class="mt-4" />
        </div>
      </div>
      <div class="relative w-1/3 px-4">
        <BoardPlayground id="capture" />
      </div>
      <div class="w-1/3">
        <BoardCanvasToolbar />
      </div>
    </div>
  </div>
</template>
