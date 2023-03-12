<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "~/store/board-detail";

const { loadTexture, texture } = toRefs(useBoardStore());
const { t } = useLang();
loadTexture.value();

function setBackground() {}
</script>
<template>
  <div class="grid grid-cols-4 md:grid-cols-6 gap-4">
    <div class="cursor-pointer px-4 py-2 bg-slate-300" @click="setBackground">
      Background 1
    </div>
    <template v-for="textureItem in texture.list" :key="textureItem.id">
      <BoardTextureListItem :texture="textureItem" />
    </template>
  </div>
</template>
