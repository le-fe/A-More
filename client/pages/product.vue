<script lang="ts" setup>
definePageMeta({
  layout: "page",
  title: "Products",
});
</script>
<template>
  <Head><Title>Products</Title></Head>
  <div class="px-4 py-2">
    <div
      class="grid grid-cols-2 gap-4 grid-cols-[repeat(auto-fill,minmax(185px,1fr))] md:gap-5"
    >
      <template v-for="item in 10" :key="item">
        <ProductListItem />
      </template>
    </div>
  </div>
</template>
