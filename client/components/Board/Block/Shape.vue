<template>
  <div>
    <div v-html="block.content" />
  </div>
</template>

<script setup lang="ts">
import { IBoardElement } from "@/interfaces/IBoard";

defineProps<{
  block: IBoardElement;
}>();
</script>
