<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "../../store/board-detail";
import { IElement } from "../../../interfaces";
import Sortable from "../../components/Sortable.vue";

const { t } = useLang();
const route = useRoute();
const { $api } = useNuxtApp();
const boardStore = useBoardStore();

definePageMeta({
  layout: "full-page",
  title: null,
});

const TABS = [
  { name: t("core.template"), ic: "image", value: "template" },
  { name: t("core.element"), ic: "element", value: "element" },
  { name: t("core.text"), ic: "text", value: "text" },
];

const activeTab = ref<string>(TABS[0].value);
const elements = ref<IElement[]>([]);
const isLoaded = computed(() => boardStore.isLoaded);

const currentShape = ref();
const sideMenu = ref();
const shapes = ref([]);
const canvas = ref();

loadElements();

async function loadElements() {
  const res = await $api.element.list();
  if (res.ok) {
    elements.value = res.data.data;
  }
}

boardStore.loadBoardData(route.params.id);

function handleDragStart(e) {
  const shapeType = e.target.getAttribute("data-shape");
  currentShape.value = shapeType;
  document.body.style.cursor = "move";
}

function handleDrop(e) {
  e.preventDefault();
  // Get the x and y coordinates of the mouse pointer
  const x = e.clientX;
  const y = e.clientY;
  // Get the boundaries of your side menu element
  const sideMenuRect = sideMenu.value.getBoundingClientRect();
  // Check if the drop location is within the side menu boundaries
  if (
    x >= sideMenuRect.left &&
    x <= sideMenuRect.right &&
    y >= sideMenuRect.top &&
    y <= sideMenuRect.bottom
  ) {
    // The drop location is within the side menu, so cancel the drop
    return;
  }
  const newShape = {
    name: Date.now().toString(),
    id: Date.now(),
    x: e.clientX,
    y: e.clientY,
    scaleX: 1,
    scaleY: 1,
    fill: "rgb(217, 193, 255)",
    type: currentShape.value,
    zIndex: 0,
  };
  shapes.value.push(newShape);
}

function handleDragOver(e) {
  e.preventDefault();
}
</script>
<template>
  <div class="flex h-[80vh]">
    <div class="w-1/3 px-6 py-2">
      <div class="">
        <div class="">
          <div class="tabs">
            <template v-for="tab in TABS" :key="tab.value">
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
          <div class="flex items-center">
            <div class="relative w-full">
              <input
                type="text"
                placeholder="Search our library of products &amp; brands"
                class="input w-full rounded-none"
              />
            </div>
          </div>
        </div>
        <div class="py-sm md:px-sm">
          <div class="px-sm md:px-0">
            <div class="flex flex-col gap-xs mt-sm" ref="sideMenu">
              <Sortable
                class="
                  grid grid-flow-row grid-cols-2
                  lg:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-3
                  gap-sm
                "
                :list="elements"
                item-key="id"
                tag="div"
                :options="{
                  group: 'shared',
                  animation: 150,
                  ghostClass: 'blue-background-class',
                }"
              >
                <template #item="{ element, index }">
                  <div class="group relative cursor-pointer">
                    <img
                      class=""
                      :id="element.id"
                      :src="element.full_src"
                      draggable="true"
                      data-shape="circle"
                      @dragstart="handleDragStart"
                      @dragend="handleDrop"
                    />
                    {{ element.name }}
                  </div>
                </template>
              </Sortable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative w-2/3">
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
                <div class="h-full w-full select-none">
                  <Sortable
                    class="grid grid-cols-8 gap-4"
                    :list="elements"
                    item-key="id"
                    tag="div"
                    :options="{
                      group: 'shared',
                      animation: 150,
                      ghostClass: 'blue-background-class',
                    }"
                  >
                    <template #item="{ element, index }">
                      <div
                        class="draggable p-4 bg-slate-500 cursor-pointer"
                        :key="element.id"
                      >
                        <img :src="element.full_src" />
                        {{ element.name }}
                      </div>
                    </template>
                  </Sortable>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
