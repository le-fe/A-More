<script setup lang="ts">
import { toRefs, computed } from "vue";
import { useBoardStore } from "@/store/board-detail";
import { IBoardElement } from "@/interfaces";
const { details, board, addCustomElement } = toRefs(useBoardStore());

const selectedTemplate = computed(() => board.value.template);
const TEMPLATE_LIST = [
  { name: "Grid", value: "GRID", ic: "grid" },
  { name: "List", value: "LIST", ic: "list" },
];

function addFreeText() {
  const newTextElement: IBoardElement = {
    top: 100,
    left: 100,
    type: "free-text",
    width: 200,
    height: 150,
    content: "Text",
  };
  addCustomElement.value(newTextElement);
}

function addShape() {
  const newShape = {
    top: 100,
    left: 100,
    type: "shape",
    with: 200,
    height: 200,
    content:
      '<svg t="1678603615056" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3141"><path d="M896 704c0 16.213333-8.96 30.293333-22.613333 37.546667l-337.066667 189.44c-6.826667 5.12-15.36 7.68-24.32 7.68-8.96 0-17.493333-2.56-24.32-7.68l-337.066667-189.44A42.282667 42.282667 0 0 1 128 704v-384c0-16.213333 8.96-30.293333 22.613333-37.546667l337.066667-189.44c6.826667-5.12 15.36-7.68 24.32-7.68 8.96 0 17.493333 2.56 24.32 7.68l337.066667 189.44c13.653333 7.253333 22.613333 21.333333 22.613333 37.546667v384z" fill="" p-id="3142" data-spm-anchor-id="a313x.7781069.0.i1"></path></svg>',
  };
  addCustomElement.value(newShape);
}
</script>
<template>
  <div class="grid grid-cols-4 gap-4 py-4">
    <div class="bg-slate-400 cursor-pointer" @click="addFreeText">
      Free Text
    </div>
    <div class="bg-slate-400 cursor-pointer" @click="addShape">Shape 1</div>
    <!--<template v-for="template in TEMPLATE_LIST" :key="template.value">
      <div
        class="
          aspect-square
          bg-white
          rounded-xl
          border
          flex flex-col
          items-center
          justify-center
          cursor-pointer
          transition-opacity
        "
        :class="
          selectedTemplate === template.value ? 'shadow-sm' : 'opacity-50'
        "
        @click="setBoard('template', template.value)"
      >
        <Icon :name="template.ic" class="w-[32px] h-[32px]" />
        <div class="text-lg">{{ template.name }}</div>
      </div>
    </template>-->
  </div>
</template>
