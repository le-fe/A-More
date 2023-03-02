<script setup lang="ts">
import { toRefs } from "vue";
import { ITexture } from "../../../interfaces";
import { useBoardStore } from "~/store/board-detail";

const { selectedTextureId, setBoard } = toRefs(useBoardStore());

const props = defineProps<{
  texture: ITexture;
}>();
const { t } = useLang();

function setBoardTexture() {
  setBoard.value("texture", props.texture);
}
</script>
<template>
  <div
    class="rounded-lg overflow-hidden cursor-pointer"
    :class="{
      'border-2 border-slate-900 p-0.5': texture.id === selectedTextureId,
    }"
    @click="setBoardTexture"
  >
    <div class="aspect-square rounded-lg overflow-hidden">
      <img class="w-full h-full object-cover" :src="texture.src" />
    </div>
  </div>
</template>
