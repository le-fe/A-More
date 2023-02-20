import { defineStore } from "pinia";
import { IBoard, IElement } from "~/interfaces";

export const useBoardStore = defineStore({
  id: "board",
  state: () => {
    return {
      board: {},
      isLoaded: false,
      element: {
        list: [],
      },
      canvas: {
        elements: [],
        elementFocused: null,
      },
    };
  },
  actions: {
    async loadBoardData(id: string) {
      const { $api } = useNuxtApp();
      const res = await $api.board.retrieve(id);
      if (res.ok) {
        this.board = res.data;
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
    addElement(element: IElement) {
      this.canvas.elements.push(element);
      this.element.list = this.element.list.filter(
        (ele) => !(ele.id === element.id)
      );
    },
    removeElement(element: IElement) {
      this.element.list.push(element);
      this.canvas.elements = this.canvas.elements.filter(
        (ele) => !(ele.id === element.id)
      );
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
