<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBoardStore } from "../../store/board-detail";
import Konva from "konva";

const boardStore = useBoardStore();

const container = ref();
const wrapper = ref();
const stage = ref();

const board = computed(() => boardStore.data);

onMounted(() => {
  stage.value = new Konva.Stage({
    container: container.value, // id of container <div>
    width: wrapper.value.clientWidth,
    height: wrapper.value.clientHeight,
  });
  addBackgroundLayer();
});

function addBackgroundLayer() {
  if (!board.value?.texture?.src) return;
  var layer = new Konva.Layer();
  stage.value.add(layer);

  // main API:
  var imageObj = new Image();
  imageObj.onload = function () {
    var bgImg = new Konva.Image({
      x: 0,
      y: 0,
      image: imageObj,
      width: stage.value.width(),
      height: stage.value.height(),
    });

    // add the shape to the layer
    layer.add(bgImg);
  };
  imageObj.src = board.value.texture.src;
}
</script>
<template>
  <div ref="wrapper" class="w-full h-full">
    <!-- {{ board }} -->
    <div ref="container"></div>
  </div>
</template>