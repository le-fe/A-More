<script setup lang="ts">
import { toRefs } from "vue";
import Sortable from "../../Sortable.vue";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas } = toRefs(useBoardStore());
</script>
<template>
  <div class="h-full overflow-y-auto">
    <Sortable
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
          class="overflow-hidden px-6 py-2 cursor-pointer flex items-center"
          :key="element.id"
          :class="{
            'bg-slate-300': canvas.elementFocused === element,
          }"
          @click="setCanvas('elementFocused', element)"
        >
          <div class="w-[80px] h-[80px]">
            <img class="w-full h-full object-cover" :src="element.full_src" />
          </div>
          <div class="ml-4 text-lg truncate font-semibold">
            {{ element.name }}
          </div>
        </div>
      </template>
    </Sortable>
  </div>
</template>