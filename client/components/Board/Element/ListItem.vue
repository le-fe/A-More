<script setup lang="ts">
import { IElement } from "../../../interfaces";

defineProps<{
  element: IElement;
}>();

const emit = defineEmits(["add"]);
</script>
<template>
  <div>
    <img :src="element.full_src" />
    <CButton size="sm" @click="emit('add')">Add</CButton>
  </div>
</template>