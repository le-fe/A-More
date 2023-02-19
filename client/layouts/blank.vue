<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-gray-200">
    <slot />
  </div>
</template>
