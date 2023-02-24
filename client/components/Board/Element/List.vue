<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "~/store/board-detail";

const { loadElements, element } = toRefs(useBoardStore());
const { t } = useLang();
loadElements.value();

function handleMoveEnd(evt) {
  console.log("end", evt);
}
function handleMoveStart({ oldIndex }) {
  console.log("start", oldIndex);
}
function handleMove() {
  return true;
}
</script>
<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex items-center sticky top-1 bg-white z-10">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search our library of products &amp; brands"
          class="input w-full rounded-none"
        />
      </div>
    </div>
    <div class="py-4 flex-grow overflow-y-auto pr-2">
      <draggable
        class="grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] gap-4"
        :group="{ name: 'dragzone', pull: 'clone', put: false }"
        ghost-class="ghost"
        item-key="id"
        :list="element.list"
        :sort="false"
        :move="handleMove"
        @end="handleMoveEnd"
        @start="handleMoveStart"
      >
        <template #item="{ element }">
          <BoardElementListItem :element="element" />
        </template>
      </draggable>
    </div>
  </div>
</template>
