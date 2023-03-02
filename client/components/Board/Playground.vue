<script setup lang="ts">
import { onMounted, computed, toRefs } from "vue";
import interact from "interactjs";
import { useBoardStore } from "@/store/board-detail";

definePageMeta({
  layout: "full-page",
  title: null,
});

const { details } = toRefs(useBoardStore());

const wrapperStyles = computed(() => {
  return {
    backgroundColor: details.value.page.bgColor,
  };
});

onMounted(() => {
  interact(".resize-drag")
    .draggable({
      listeners: {
        start(event) {
          console.log(event.type, event.target);
        },
        move: dragMoveListener,
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
    })
    .on("resizemove", function (event) {
      var target = event.target,
        x = parseFloat(target.getAttribute("data-x")) || 0,
        y = parseFloat(target.getAttribute("data-y")) || 0;

      // update the element's style
      target.style.width = event.rect.width + "px";
      target.style.height = event.rect.height + "px";

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px," + y + "px)";

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
      target.textContent = event.rect.width + "×" + event.rect.height;
    });
});

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
</script>
<template>
  <div class="h-full" :style="wrapperStyles">
    <div
      class="resize-drag"
      style="transform: translate(173px, 2px); width: 100px; height: 105px"
      data-x="173"
      data-y="2"
    >
      100×105
    </div>
    <div
      class="resize-drag"
      style="transform: translate(43px, 135px)"
      data-x="43"
      data-y="135"
    >
      Resize from any edge or corner 2
    </div>
  </div>
</template>
<style>
.resize-drag {
  background-color: #29e;
  color: white;
  font-size: 20px;
  font-family: sans-serif;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 20px;
  position: absolute;
  width: 120px;
  top: 150px;

  /* This makes things *much* easier */
  box-sizing: border-box;
}

.resize-container {
  width: 100%;
  height: 360px;
  background-color: #e8e9e8;
  position: relative;
}
</style>
