<script setup lang="ts">
import { toRefs, computed } from "vue";
import { useBoardStore } from "@/store/board-detail";
const { setCanvas, canvas } = toRefs(useBoardStore());

const selectedTemplate = computed(() => canvas.value.template);
const TEMPLATE_LIST = [
  { name: "Grid", value: "grid", ic: "grid" },
  { name: "List", value: "list", ic: "list" },
];
</script>
<template>
  <div class="grid grid-cols-4 gap-4 py-4">
    <template v-for="template in TEMPLATE_LIST" :key="template.value">
      <div
        class="
          aspect-square
          bg-white
          rounded-xl
          border
          flex flex-col
          items-center
          justify-center
          cursor-pointer
          transition-opacity
        "
        :class="
          selectedTemplate === template.value ? 'shadow-sm' : 'opacity-50'
        "
        @click="setCanvas('template', template.value)"
      >
        <Icon :name="template.ic" class="w-[32px] h-[32px]" />
        <div class="text-lg">{{ template.name }}</div>
      </div>
    </template>
  </div>
</template>