<script setup lang="ts">
import { IElement } from "../../../interfaces";

defineProps<{
  element: IElement;
}>();
</script>
<template>
  <div>
    <img :src="element.full_src" />
  </div>
</template>