import { defineStore } from "pinia";
import { IBoard, IElement } from "~/interfaces";

export const useBoardStore = defineStore({
  id: "board",
  state: () => {
    return {
      board: {
        id: "",
        name: "",
        template: "",
      },
      boardElements: [],
      isLoaded: false,
      element: {
        list: [],
      },
      canvas: {
        elementFocused: null,
      },
    };
  },
  actions: {
    async loadBoardData(id: string) {
      const { $api } = useNuxtApp();
      const res = await $api.board.retrieve(id);
      if (res.ok) {
        Object.assign(this.board, res.data);
        const elementRes = await $api.boardElements.list(id);
        this.boardElements = elementRes || [];
        this.isLoaded = true;
      }
    },
    async saveBoardData() {
      if (!this.board) return;
      const { $api } = useNuxtApp();
      const res = await $api.board.update(this.board.id, this.board);
      console.clear();
      console.log(res);
    },
    async addElement(element: IElement) {
      const { $api } = useNuxtApp();
      this.element.list = this.element.list.filter(
        (ele) => !(ele.id === element.id)
      );
      const elementRes = await $api.boardElements.create({
        board: this.board.id,
        element: element.id,
      });
      this.boardElements.push(elementRes);
      console.clear();
      console.log(elementRes);
    },
    async removeElement(element: any) {
      this.element.list.push(element.element);
      this.boardElements = this.boardElements.filter(
        (ele) => !(ele.id === element.id)
      );
      const { $api } = useNuxtApp();
      await $api.boardElements.delete(element.id);
    },
    setBoard(field: string, value: any) {
      this.board[field] = value;
      this.saveBoardData();
    },
    setCanvas(field: string, value: any) {
      this.canvas[field] = value;
    },
    // Elements
    async loadElements() {
      const { $api } = useNuxtApp();
      const res = await $api.element.list();
      if (res.ok) {
        this.element.list = res.data.data;
      }
    },
  },
  getters: {
    listElements: (state) => state.elements,
  },
});
