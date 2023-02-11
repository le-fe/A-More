import { defineStore } from "pinia";

export const useBoardStore = defineStore({
  id: "board",
  state: () => {
    return {
      data: null,
      isLoaded: false,
    };
  },
  actions: {
    async loadBoardData(id: string) {
      const { $api } = useNuxtApp();
      const res = await $api.board.retrieve(id);
      if (res.ok) {
        this.data = res.data;
        this.isLoaded = true;
      }
    },
  },
  getters: {
    boardData: (state) => state.data,
  },
});
