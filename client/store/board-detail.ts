import { defineStore } from "pinia";
import { IBoard, IElement } from "~/interfaces";

export const useBoardStore = defineStore({
  id: "board",
  state: () => {
    return {
      board: {},
      isLoaded: false,
      canvas: {
        elements: [],
        template: "grid",
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
    addElement(element: IElement) {
      this.canvas.elements.push(element);
    },
    removeElement(element: IElement) {
      this.canvas.elements.splice(this.canvas.elements.indexOf(element), 1);
    },
    setCanvas(field: string, value: any) {
      this.canvas[field] = value;
    },
  },
  getters: {
    listElements: (state) => state.elements,
  },
});
