<script setup>
definePageMeta({
  layout: "page",
  title: "Recent boards",
});
</script>
<template>
  <div class="px-6 py-4">
    <BoardList :queries="{ isMine: true }" />
  </div>
</template>