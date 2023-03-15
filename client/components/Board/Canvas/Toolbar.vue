<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas, removeElement, details, selectedWidget } = toRefs(
  useBoardStore()
);

const TABS = [{ name: "Information", value: "info" }];

const TOOLBAR = [
  {
    name: "Delete",
    value: "delete",
    icon: "x",
    showIfElementFocused: true,
    action: (element) => {
      removeElement.value(element);
      setCanvas.value("elementFocused", null);
    },
  },
];

const DIMENSIONS = [
  { title: "500x500", class: "aspect-square", value: { w: 500, h: 500 } },
  { title: "600x800", class: "aspect-[3/4]", value: { w: 600, h: 800 } },
];

function setDimension({ w, h }: { w: number; h: number }) {
  details.value.page.width = w;
  details.value.page.height = h;
}
</script>
<template>
  <div
    class="shadow bg-white rounded-xl px-6 py-4 h-full overflow-y-auto select-none"
  >
    <template v-if="selectedWidget">
      <BoardWidgetUpdate />
    </template>
    <div v-else>
      <section>
        <h3 class="font-medium mb-2">{{ `Board Information` }}</h3>
        <ul class="pl-4">
          <li class="flex items-center">
            <span class="w-24">Title:</span>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-sm"
              v-model="details.page.title"
            />
          </li>
          <li class="flex items-center mt-2">
            <span class="w-24">Description:</span>
            <textarea
              rows="2"
              type="text"
              placeholder="Type here"
              class="input input-bordered input-sm flex-1"
              v-model="details.page.description"
            />
          </li>
        </ul>
      </section>
      <section class="my-6">
        <h3 class="font-medium">{{ `Dimension` }}</h3>
        <ul class="pl-4">
          <li class="flex items-center mt-2">
            <span class="w-24">Height:</span>
            <input
              type="number"
              min="1"
              placeholder="Type here"
              class="input input-bordered input-sm"
              v-model="details.page.height"
            />
          </li>
          <li class="flex items-center mt-4">
            <div
              class="flex flex-col items-center mr-4"
              v-for="(dimension, index) in DIMENSIONS"
              :key="index"
            >
              <div
                class="bg-slate-300 hover:bg-slate-400 transition-colors h-12 cursor-pointer rounded-lg"
                :class="dimension.class"
                @click="setDimension(dimension.value)"
              ></div>
              <span class="text-xs">{{ dimension.title }}</span>
            </div>
          </li>
        </ul>
      </section>
      <div class="flex items-center mt-2">
        <span class="w-24">Color:</span>
        <ColorPickerDropdown v-model="details.page.bgColor" />
      </div>
    </div>
  </div>
</template>
