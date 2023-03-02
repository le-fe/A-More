<script setup lang="ts">
import { toRefs } from "vue";
import { set } from "lodash";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas, element, boardElements } = toRefs(useBoardStore());

function handleMoveEnd({ newIndex, oldIndex }) {
  console.log("index", newIndex, oldIndex);
}

function handleWidgetAdd(evt) {
  console.log("add", evt);
  console.log("end", evt);
  const newIndex = evt.newIndex;
  const to = evt.to;
  boardElements.value[0] = element.value.list[0];
  // set(boardElements, newIndex, element.value.list[0]);
}
</script>
<template>
  <draggable
    class="grid grid-cols-4 gap-4"
    :list="boardElements"
    item-key="id"
    tag="div"
    :group="{
      name: 'dragzone',
      animation: 200,
    }"
    ghost-class="bg-slate-100"
    @end="handleMoveEnd"
    @add="handleWidgetAdd"
  >
    <template #item="{ element }">
      <div
        class="aspect-square overflow-hidden p-4 cursor-pointer relative"
        :key="element.id"
        :class="{
          'bg-slate-300': canvas.elementFocused === element,
        }"
        @click="setCanvas('elementFocused', element)"
      >
        <div class="flex items-center justify-center">
          <img :src="element.element.full_src" />
        </div>
      </div>
    </template>
  </draggable>
</template>
