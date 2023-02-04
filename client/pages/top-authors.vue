<script lang="ts" setup>
import { ref } from "vue";

const { $api } = useNuxtApp();
const { t } = useLang();

definePageMeta({
  layout: "page",
  title: "Top Authors",
});

const pg = ref({
  totalUsers: null,
  topAuthors: [],
});

fetchTotalUsers();
fetchTopAuthors();

async function fetchTotalUsers() {
  const res = await $api.user.getTotal();
  if (res.ok) {
    pg.value.totalUsers = res.data;
  }
}

async function fetchTopAuthors() {
  const res = await $api.user.getTopAuthors();
  if (res.ok) {
    pg.value.topAuthors = res.data;
  }
}
</script>
<template>
  <div class="px-4 py-2">
    <div>
      <span>{{ t("user.totalUsers") }}</span>
      <span class="font-semibold ml-1">{{ pg.totalUsers }}</span>
    </div>
    {{ pg.topAuthors }}
    <div
      class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(185px,1fr))] md:gap-5"
    >
      <template v-for="item in 10" :key="item">
        <AuthorListItem />
      </template>
    </div>
  </div>
</template>
