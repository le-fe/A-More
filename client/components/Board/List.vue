<script setup lang="ts">
import { ref } from "vue";
import { IBoard } from "@/interfaces";

const { $api } = useNuxtApp();

const boardList = ref<IBoard[]>([]);

fetchBoardList();

async function fetchBoardList() {
  const res = await $api.board.list({});
  if (res.ok) {
    boardList.value = res.data.data;
  }
}
</script>
<template>
  <div
    class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] md:gap-5"
  >
    <template v-for="board in boardList" :key="board.id">
      <BoardListItem :board="board" />
    </template>
  </div>
</template>