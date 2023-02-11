<script setup lang="ts">
import { IBoard } from "../../interfaces";
import { timeagoText } from "../../utils/time";

defineProps<{
  board: IBoard;
}>();
</script>
<template>
  <NuxtLink
    :to="{ name: 'board-id', params: { id: board.id } }"
    class="border border-gray-300 rounded-md hover:shadow"
  >
    <div class="aspect-video bg-slate-200 w-full"></div>
    <div class="px-4 py-2">
      <div class="font-semibold text-lg">{{ board.name }}</div>
      <div class="text-gray-600 text-sm">{{ timeagoText(board.createAt) }}</div>
    </div>
  </NuxtLink>
</template>