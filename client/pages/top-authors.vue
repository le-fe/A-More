<script lang="ts" setup>
import { ref } from "vue";

const { $api } = useNuxtApp();
const { t } = useLang();

definePageMeta({
  layout: "page",
  title: "Top Authors",
});

const pg = ref({
  total: null,
  topAuthors: [],
});

fetchTopAuthors();

async function fetchTopAuthors() {
  const res = await $api.user.getTopAuthors();
  if (res.ok) {
    pg.value.total = res.total;
    pg.value.topAuthors = res.data;
  }
}
</script>
<template>
  <div class="px-4 py-2">
    <div class="mb-2">
      <span>{{ t("user.totalUsers") }}</span>
      <span class="font-semibold ml-1">{{ pg.total }}</span>
    </div>
    <div
      class="
        grid
        gap-4
        grid-cols-[repeat(auto-fill,minmax(185px,1fr))]
        md:gap-5
      "
    >
      <template v-for="user in pg.topAuthors" :key="user.id">
        <AuthorListItem :user="user" />
      </template>
    </div>
  </div>
</template>
