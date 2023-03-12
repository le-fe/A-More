<script setup lang="ts">
import { onMounted, computed, toRefs } from "vue";
import interact from "interactjs";
import { useBoardStore } from "@/store/board-detail";

definePageMeta({ layout: "full-page", title: null });

const { details } = toRefs(useBoardStore());

const wrapperStyles = computed(() => {
  const { page, zoom } = details.value;
  return {
    backgroundColor: page.bgColor,
    width: page.width + "px",
    height: page.height + "px",
    transform: `scale(${zoom / 100})`,
  };
});

onMounted(() => {
  listenDragComponents();
});

function listenDragComponents() {
  interact(".resize-drag")
    .draggable({
      listeners: {
        move(event) {
          const el = event.target;
          const {
            x: dataX = el.getAttribute("data-x"),
            y: dataY = el.getAttribute("data-y"),
          } = el.dataset;
          const x = (parseFloat(dataX) || 0) + event.delta.x;
          const y = (parseFloat(dataY) || 0) + event.delta.y;

          el.style.transform = `translate(${x}px, ${y}px)`;
          Object.assign(el.dataset, { x, y });
        },
        end(event) {
          const el = event.target;
          const id = el.getAttribute("data-id");
          const {
            x: dataX = el.getAttribute("data-x"),
            y: dataY = el.getAttribute("data-y"),
          } = el.dataset;
          const x = (parseFloat(dataX) || 0) + event.delta.x;
          const y = (parseFloat(dataY) || 0) + event.delta.y;
          details.value.widgets[id].top = y;
          details.value.widgets[id].left = x;
        },
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
    })
    .resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      listeners: {
        move: function (event) {
          let { x, y } = event.target.dataset;

          x = (parseFloat(x) || 0) + event.deltaRect.left;
          y = (parseFloat(y) || 0) + event.deltaRect.top;

          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          });

          Object.assign(event.target.dataset, { x, y });
        },
      },
    });
}
</script>
<template>
  <div class="holder" id="viewport">
    <div id="wrapper" :style="wrapperStyles">
      <template v-for="(w, uid) in details.widgets" :key="uid">
        <div
          class="resize-drag"
          :style="`transform: translate(${w.left}px, ${w.top}px); width: 100px; height: 105px`"
          :data-id="uid"
          :data-x="w.left"
          :data-y="w.top"
        >
          <img :src="w.url" />
        </div>
      </template>
    </div>

    <div class="absolute bottom-4 right-8 z-10 w-[120px]">
      <div class="absolute top-0 -left-[36px]">{{ `${details.zoom}%` }}</div>
      <div>
        <input
          type="range"
          v-model="details.zoom"
          class="w-full h-2 relative rounded-lg appearance-none cursor-pointer bg-gray-400 dark:bg-gray-700"
        />
      </div>
    </div>
  </div>
</template>
<style>
.holder {
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
  background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
}
.resize-drag {
  position: absolute;
}
</style>
