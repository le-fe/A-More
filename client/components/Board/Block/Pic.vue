<script setup lang="ts">
import { toRefs, computed } from "vue";
import { IBoardElement } from "@/interfaces/IBoard";
import { useBoardStore } from "@/store/board-detail";

const props = defineProps<{
  uid: string;
  block: IBoardElement;
}>();

const { details } = toRefs(useBoardStore());

const labelStyles = computed(() => {
  const labelDetails = details.value.widgets?.[props.uid]?.attributes?.label;
  if (!labelDetails) return {};
  return {
    fontSize: labelDetails.fontSize + "px",
    backgroundColor: labelDetails.bgColor,
    color: labelDetails.textColor,
  };
});
</script>

<template>
  <div>
    <img :src="block.content" />
    <div
      v-if="block.attributes?.label"
      class="px-2 rounded-md text-center"
      :style="labelStyles"
    >
      {{ block.attributes.label.text }}
    </div>
  </div>
</template>
