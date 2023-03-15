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
  const { textColor, bgColor, textAlign, borderRadius } =
    details.value.widgets[props.uid].styles || {};
  return {
    color: textColor,
    backgroundColor: bgColor,
    textAlign: textAlign,
    borderRadius: borderRadius + "px",
  };
});
</script>

<template>
  <div class="cursor-pointer text-white">
    <div :style="wStyles">{{ block.content }}</div>
  </div>
</template>
