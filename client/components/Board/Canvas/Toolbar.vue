<script setup lang="ts">
import { ref } from "vue";
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas, removeElement, details } = toRefs(useBoardStore());

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

function changeColor(color) {
  const { r, g, b, a } = color.rgba;
  details.value.page.bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}
</script>
<template>
  <div
    class="shadow bg-white rounded-xl px-6 py-4 h-full overflow-y-auto select-none"
  >
    <div>
      <div class="flex items-center">
        <span class="w-24">Title:</span>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered input-sm"
          v-model="details.page.title"
        />
      </div>
      <div class="flex items-center mt-2">
        <span class="w-24">Width:</span>
        <input
          type="number"
          min="1"
          placeholder="Type here"
          class="input input-bordered input-sm"
          v-model="details.page.width"
        />
      </div>
      <div class="flex items-center mt-2">
        <span class="w-24">Height:</span>
        <input
          type="number"
          min="1"
          placeholder="Type here"
          class="input input-bordered input-sm"
          v-model="details.page.height"
        />
      </div>
      <div class="flex items-center mt-2">
        <span class="w-24">Description:</span>
        <textarea
          rows="2"
          type="text"
          placeholder="Type here"
          class="input input-bordered input-sm flex-1"
          v-model="details.page.description"
        />
      </div>
      <div class="flex items-center mt-2">
        <span class="w-24">Color:</span>
        <div class="dropdown">
          <div
            tabindex="0"
            class="w-8 h-8 rounded-lg cursor-pointer border"
            :style="{ backgroundColor: details.page.bgColor }"
          ></div>
          <div
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <ColorPicker
              theme="light"
              :color="details.page.bgColor"
              :sucker-hide="false"
              @changeColor="changeColor"
            />
          </div>
        </div>
      </div>
    </div>
    <pre>{{ details }}</pre>
    <div>
      <template v-for="toolbar in TOOLBAR" :key="toolbar.value">
        <div
          v-if="toolbar.showIfElementFocused && canvas.elementFocused"
          class="flex items-center cursor-pointer hover:bg-slate-50 px-4 py-2 rounded-lg"
          @click="() => toolbar.action(canvas.elementFocused)"
        >
          <Icon :name="toolbar.icon" />
          <div class="ml-1 text-sm font-medium">{{ toolbar.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>
