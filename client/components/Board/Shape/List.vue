<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IShape } from "@/interfaces";

const { $api } = useNuxtApp();

const shapeList = ref<IShape[]>([]);
const isLoading = ref(false);
const isLoaded = ref(false);

onMounted(() => {
  fetchShapeList();
});

async function fetchShapeList() {
  isLoading.value = true;
  const res = await $api.shape.list({ take: 50 });
  if (res) {
    shapeList.value = res.items;
  }
  isLoading.value = false;
  isLoaded.value = true;
}
</script>
<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-2 mt-4">
    <template v-for="shape in shapeList" :key="shape.id">
      <div
        class="flex flex-col items-center justify-center px-3 py-2 cursor-pointer"
      >
        <div
          v-html="shape.content"
          class="w-full fill-slate-400 hover:fill-slate-500 transition-colors"
        ></div>
      </div>
    </template>
  </div>
</template>
