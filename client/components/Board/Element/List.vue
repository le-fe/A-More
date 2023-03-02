<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "~/store/board-detail";

const { loadElements, element } = toRefs(useBoardStore());
const { t } = useLang();
loadElements.value();
</script>
<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex items-center sticky top-1 bg-white z-10">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search our library of products &amp; brands"
          class="input w-full rounded-none"
        />
      </div>
    </div>
    <div class="py-4 flex-grow overflow-y-auto pr-2">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
        <template v-for="element in element.list" :key="element.id">
          <BoardElementListItem :element="element" />
        </template>
      </div>
    </div>
  </div>
</template>
