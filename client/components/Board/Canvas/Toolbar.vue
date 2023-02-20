<script setup lang="ts">
import { useBoardStore } from "@/store/board-detail";
const { setCanvas, canvas, removeElement } = toRefs(useBoardStore());

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
</script>
<template>
  <div
    class="
      shadow
      bg-white
      rounded-xl
      px-6
      py-4
      h-[64px]
      overflow-hidden
      my-4
      select-none
    "
  >
    <div class="flex items-center">
      <div class="flex-grow">
        <template v-if="canvas.elementFocused">
          {{ canvas.elementFocused.name }}
        </template>
      </div>
      <div>
        <template v-for="toolbar in TOOLBAR" :key="toolbar.value">
          <div
            v-if="toolbar.showIfElementFocused && canvas.elementFocused"
            class="
              flex
              items-center
              cursor-pointer
              hover:bg-slate-50
              px-4
              py-2
              rounded-lg
            "
            @click="() => toolbar.action(canvas.elementFocused)"
          >
            <Icon :name="toolbar.icon" />
            <div class="ml-1 text-sm font-medium">{{ toolbar.name }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>