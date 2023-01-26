<script lang="ts" setup>
definePageMeta({
  layout: "page",
  title: "Explore",
});
</script>
<template>
  <div class="px-4 py-2">
    <div class="w-1/2">
      <div class="px-4 py-2">
        <template v-for="item in 10" :key="item">
          <GroupListItem class="mb-3" />
        </template>
      </div>
    </div>
  </div>
</template>
