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
        texture: "",
      },
      details: {
        page: {
          title: "测试页面",
          description: "SS",
          width: 700,
          height: 1500,
          bgColor: "rgba(238, 238, 238, 1)",
        },
        top: 0,
        zoom: 64,
        type: "page",
        index: -1,
        uuid: -1,
        counter: 0,
        originX: 0,
        originY: 0,
        startX: 685,
        startY: 202,
        moving: false,
        animation: [],
        playState: false,
        activeElement: {
          page: true,
          title: "测试页面",
          height: 1500,
          endTime: "2023-02-27T19:21:42.484Z",
          backgroundColor: "#653434",
        },
        widgets: [
          {
            type: "braid-pic",
            isContainer: false,
            isUpload: true,
            hasGuide: true,
            isChild: true,
            dragable: true,
            resizable: true,
            left: 185,
            z: 0,
            href: "",
            belong: "page",
            animationName: "",
            width: 96,
            height: 96,
            top: 264,
            url: "blob:https://fireyy.github.io/a551bf20-3ec1-4544-9200-4361f838f3c3",
            src: "images/1064023.jpg",
            uuid: "488b0e6e59",
          },
          {
            type: "braid-bg",
            isContainer: false,
            hasGuide: false,
            isUpload: true,
            isChild: false,
            dragable: false,
            resizable: false,
            href: "",
            belong: "page",
            width: 1628,
            height: 2048,
            top: 0,
            url: "blob:https://fireyy.github.io/995ce1e0-1d17-49a4-b1e4-2d23e08ad388",
            src: "images/274842564_3046790442226979_6938009528578686494_n.jpg",
            uuid: "203d07e9e0",
          },
          {
            type: "braid-pic",
            isContainer: false,
            isUpload: true,
            hasGuide: true,
            isChild: true,
            dragable: true,
            resizable: true,
            left: 143,
            z: 0,
            href: "",
            belong: "page",
            animationName: "",
            width: 324,
            height: 518,
            top: 100,
            url: "blob:https://fireyy.github.io/e12092ff-be67-4cab-b641-da3402c52726",
            src: "images/2023-02-28_224257.jpg",
            uuid: "85cd163630",
          },
        ],
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
