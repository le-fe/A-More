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
  const { fill } = details.value.widgets[props.uid].styles || {};
  return {
    fill: fill,
  };
});
</script>
<template>
  <div :style="wStyles">
    <div v-html="block.content"></div>
  </div>
</template>
