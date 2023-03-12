import { defineStore } from "pinia";
import shortid from "shortid";
import { IBoard, IElement } from "~/interfaces";

export const useBoardStore = defineStore({
  id: "board",
  state: () => {
    return {
      board: {
        id: "",
        name: "",
        template: "",
        texture: "",
      },
      details: {
        page: {
          title: "测试页面",
          description: "SS",
          width: 500,
          height: 700,
          top: 0,
          left: 0,
          bgColor: "rgba(238, 238, 238, 1)",
        },
        zoom: 95,
        widgets: {
          22121: {
            type: "pic",
            top: 15,
            left: 185,
            href: "",
            width: 96,
            height: 96,
            url: "http://localhost:7654/file/e/sKWy6q-adidas-tennis-bermuda-mens-tennis-shoe.png",
          },
          423111: {
            type: "pic",
            top: 15,
            left: 0,
            href: "",
            width: 1628,
            height: 2048,
            url: "http://localhost:7654/file/e/3jwOZb-adidas-shoes-black-and-white-photo.png",
          },
          492821: {
            type: "pic",
            top: 15,
            left: 326,
            z: 0,
            href: "",
            width: 324,
            height: 518,
            url: "http://localhost:7654/file/e/MQFKhq-youth-adidas-mat-wizard-wrestling-shoes-free-shipping-march.png",
          },
        },
      },
      boardElements: [],
      isLoaded: false,
      element: {
        list: [],
      },
      texture: {
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
      console.clear();
      console.log(element);
      const newId = shortid.generate();
      const newWidget = {
        type: "pic",
        top: 15,
        left: 185,
        href: "",
        width: 96,
        height: 96,
        url: element.full_src,
      };
      console.log(newWidget);
      this.details.widgets[newId] = newWidget;
      // const { $api } = useNuxtApp();
      // this.element.list = this.element.list.filter(
      //   (ele) => !(ele.id === element.id)
      // );
      // const elementRes = await $api.boardElements.create({
      //   board: this.board.id,
      //   element: element.id,
      // });
      // this.boardElements.push(elementRes);
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
    // Texture (Template)
    async loadTexture() {
      const { $api } = useNuxtApp();
      const res = await $api.texture.list();
      if (res.ok) {
        this.texture.list = res.data;
      }
    },
  },
  getters: {
    listElements: (state) => state.elements,
    selectedTextureId: (state) => state.board?.texture?.id,
  },
});
