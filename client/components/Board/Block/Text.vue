<script setup lang="ts">
import { toRefs, computed } from "vue";
import { IBoardElement } from "@/interfaces/IBoard";
import { useBoardStore } from "@/store/board-detail";

const props = defineProps<{
  uid: string;
  block: IBoardElement;
}>();

const { details } = toRefs(useBoardStore());
const wStyles = computed(() => {
  const { textColor, bgColor } = details.value.widgets[props.uid].styles || {};
  return {
    color: textColor,
    backgroundColor: bgColor,
  };
});
</script>

<template>
  <div class="px-4 py-2 cursor-pointer">
    <div :style="wStyles">{{ block.content }}</div>
    <!--<input class="bg-transparent outline-none" :src="w.content" />-->
  </div>
</template>
