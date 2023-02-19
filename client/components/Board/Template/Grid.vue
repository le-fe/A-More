<script setup lang="ts">
import { toRefs } from "vue";
import Sortable from "../../Sortable.vue";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas } = toRefs(useBoardStore());
</script>
<template>
  <Sortable
    class="grid grid-cols-4 gap-4"
    :list="canvas.elements"
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
        class="aspect-square overflow-hidden p-4 cursor-pointer relative"
        :key="element.id"
        :class="{
          'bg-slate-300': canvas.elementFocused === element,
        }"
        @click="setCanvas('elementFocused', element)"
      >
        <div class="px-5">
          <img :src="element.full_src" />
        </div>
        <div class="text-sm text-center truncate">{{ element.name }}</div>
      </div>
    </template>
  </Sortable>
</template>