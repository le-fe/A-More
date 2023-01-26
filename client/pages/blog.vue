<script lang="ts" setup>
definePageMeta({
  layout: "page",
  title: "Blog",
});
</script>
<template>
  <div class="px-4 py-2">
    <template v-for="item in 6" :key="item">
      <BlogListItem />
    </template>
  </div>
</template>
