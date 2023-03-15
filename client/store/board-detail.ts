import { defineStore } from "pinia";
import shortid from "shortid";
import { IBoard, IBoardElement, IElement } from "~/interfaces";

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
          bg: {
            url: `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='540' height='560' preserveAspectRatio='none' viewBox='0 0 540 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1117%26quot%3b)' fill='none'%3e%3crect width='540' height='560' x='0' y='0' fill='%231e3266'%3e%3c/rect%3e%3cpath d='M558 560L0 560 L0 265.48Q15.7 254.19%2c 27 269.89Q72.29 270.18%2c 72 315.47Q57.79 256.26%2c 117 242.06Q188.42 268.48%2c 162 339.89Q146.65 279.54%2c 207 264.19Q231.68 261.87%2c 234 286.54Q277.08 302.62%2c 261 345.7Q250.78 308.48%2c 288 298.25Q302.38 267.63%2c 333 282Q336.37 240.37%2c 378 243.73Q407.42 228.15%2c 423 257.58Q450.89 258.47%2c 450 286.35Q478.47 287.82%2c 477 316.29Q505.99 318.28%2c 504 347.27Q496.39 312.66%2c 531 305.06Q528.31 275.37%2c 558 272.68z' fill='%23182f5d'%3e%3c/path%3e%3cpath d='M558 560L0 560 L0 400.93Q21.19 377.12%2c 45 398.3Q81.29 389.59%2c 90 425.87Q106.49 397.36%2c 135 413.84Q132.85 384.69%2c 162 382.54Q168.11 343.65%2c 207 349.76Q217.19 314.95%2c 252 325.15Q292.13 320.28%2c 297 360.41Q321.49 357.9%2c 324 382.4Q362.51 375.91%2c 369 414.42Q382.16 382.58%2c 414 395.74Q425.74 362.48%2c 459 374.21Q447.26 335.47%2c 486 323.72Q540.57 351.3%2c 513 405.87Q508.22 356.09%2c 558 351.31z' fill='%2325467d'%3e%3c/path%3e%3cpath d='M567 560L0 560 L0 483.2Q13.56 469.76%2c 27 483.33Q53.76 483.09%2c 54 509.85Q57.13 485.99%2c 81 489.12Q95.76 458.88%2c 126 473.64Q122.8 425.44%2c 171 422.24Q184.09 390.33%2c 216 403.42Q252.51 412.93%2c 243 449.44Q273.6 435.04%2c 288 465.64Q293.22 425.86%2c 333 431.08Q342.15 395.23%2c 378 404.37Q416.7 416.07%2c 405 454.77Q434.73 439.5%2c 450 469.23Q474.53 466.76%2c 477 491.29Q505.53 474.82%2c 522 503.35Q528.98 465.33%2c 567 472.31z' fill='%23356cb1'%3e%3c/path%3e%3cpath d='M549 560L0 560 L0 529.83Q3.41 506.24%2c 27 509.65Q37.99 475.64%2c 72 486.63Q100.96 488.59%2c 99 517.56Q158.15 531.71%2c 144 590.87Q117.67 519.54%2c 189 493.21Q234.06 493.26%2c 234 538.32Q230.75 508.07%2c 261 504.81Q266.47 483.28%2c 288 488.76Q344.88 518.63%2c 315 575.51Q300.59 534.1%2c 342 519.69Q353.88 486.57%2c 387 498.45Q400.43 466.88%2c 432 480.3Q483.69 486.99%2c 477 538.68Q470.92 505.6%2c 504 499.51Q520.99 471.5%2c 549 488.48z' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1117'%3e%3crect width='540' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e`,
            position: "center",
            size: "cover",
          },
        },
        zoom: 95,
        widgets: {
          "943z": {
            type: "text",
            top: 25,
            left: 44,
            content: "Title",
            styles: {
              textColor: "#FFF",
              bgColor: "#aeaeae",
              textAlign: "left",
              borderRadius: 0,
            },
            attributes: {},
          },
          22121: {
            type: "pic",
            top: 15,
            left: 185,
            href: "",
            width: 96,
            height: 96,
            content:
              "http://localhost:7654/file/e/sKWy6q-adidas-tennis-bermuda-mens-tennis-shoe.png",
            styles: {},
            attributes: {
              label: {
                text: "Adidas Tennis",
                fontSize: 12,
                fontFamily: "",
                bgColor: "#aeaeaeae",
                textColor: "#FFF",
              },
            },
          },
          423111: {
            type: "pic",
            top: 15,
            left: 0,
            href: "",
            width: 1628,
            height: 2048,
            content:
              "http://localhost:7654/file/e/3jwOZb-adidas-shoes-black-and-white-photo.png",
            styles: {},
            attributes: {
              label: {
                text: "Adidas Black",
                fontSize: 12,
                fontFamily: "",
                bgColor: "#aeaeaeae",
                textColor: "#FFF",
              },
            },
          },
          492821: {
            type: "pic",
            top: 15,
            left: 326,
            z: 0,
            href: "",
            width: 324,
            height: 518,
            content:
              "http://localhost:7654/file/e/MQFKhq-youth-adidas-mat-wizard-wrestling-shoes-free-shipping-march.png",
            styles: {},
            attributes: {
              label: {
                text: "Adidas Mat",
                fontSize: 12,
                fontFamily: "",
                bgColor: "#aeaeaeae",
                textColor: "#FFF",
              },
            },
          },
          z82t2: {
            top: 100,
            left: 100,
            type: "shape",
            with: 200,
            height: 200,
            content:
              '<svg t="1678603615056" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3141"><path d="M896 704c0 16.213333-8.96 30.293333-22.613333 37.546667l-337.066667 189.44c-6.826667 5.12-15.36 7.68-24.32 7.68-8.96 0-17.493333-2.56-24.32-7.68l-337.066667-189.44A42.282667 42.282667 0 0 1 128 704v-384c0-16.213333 8.96-30.293333 22.613333-37.546667l337.066667-189.44c6.826667-5.12 15.36-7.68 24.32-7.68 8.96 0 17.493333 2.56 24.32 7.68l337.066667 189.44c13.653333 7.253333 22.613333 21.333333 22.613333 37.546667v384z" fill="" p-id="3142" data-spm-anchor-id="a313x.7781069.0.i1"></path></svg>',
            styles: {
              fill: "#000",
            },
          },
        },
        selectedWidgetId: null,
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
      const newId = shortid.generate();
      const newWidget = {
        type: element,
        top: 15,
        left: 185,
        href: "",
        width: 96,
        height: 96,
        content: element.full_src,
      };
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
    addCustomElement(customElement: IBoardElement) {
      const newId = shortid.generate();
      this.details.widgets[newId] = customElement;
    },
    deleteSelectedElement() {
      delete this.details.widgets[this.details.selectedWidgetId];
      this.details.selectedWidgetId = null;
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
    selectedWidget: (state) =>
      state.details.selectedWidgetId
        ? state.details.widgets[state.details.selectedWidgetId]
        : null,
  },
});
