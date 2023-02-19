<script setup lang="ts">
import { ref } from "vue";
import { IElement } from "../../../interfaces";

const { $api } = useNuxtApp();
const { t } = useLang();

const elements = ref<IElement[]>([]);

loadElements();

async function loadElements() {
  const res = await $api.element.list();
  if (res.ok) {
    elements.value = res.data.data;
  }
}
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
      <div class="grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] gap-4">
        <template v-for="element in elements" :key="element.id">
          <BoardElementListItem :element="element" />
        </template>
      </div>
    </div>
  </div>
</template>