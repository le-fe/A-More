<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="min-h-screen w-screen overflow-hidden">
    <PageHeader
      class="sticky top-0 left-0 right-0 w-screen overflow-hidden"
      :show-logo="true"
    />
    <div
      class="bg-gray-200 w-screen overflow-hidden"
      style="min-height: calc(100vh - 70px)"
    >
      <slot />
    </div>
  </div>
</template>
