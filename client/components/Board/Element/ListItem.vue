<script setup lang="ts">
import { IElement } from "../../../interfaces";
import { useBoardStore } from "@/store/board-detail";
const boardStore = useBoardStore();

const props = defineProps<{
  element: IElement;
}>();

function handleAdd() {
  boardStore.addElement(props.element);
}
</script>
<template>
  <div
    class="group relative cursor-pointer flex flex-col bg-slate-50 p-2 rounded-lg"
  >
    <div class="flex-grow">
      <img class="select-none" :id="element.id" :src="element.full_src" />
      <div class="my-2 text-sm font-medium">
        {{ element.name }}
      </div>
    </div>
    <CButton size="sm" @click="handleAdd">Add</CButton>
  </div>
</template>
