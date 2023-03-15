<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);

function handleColorChanged(color) {
  const { r, g, b, a } = color.rgba;
  data.value = `rgba(${r}, ${g}, ${b}, ${a})`;
}
</script>
<template>
  <div class="dropdown">
    <div
      tabindex="0"
      class="w-8 h-8 rounded-lg cursor-pointer border"
      :style="{ backgroundColor: data }"
    ></div>
    <div
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      <ColorPicker
        theme="light"
        :color="data"
        :sucker-hide="false"
        @changeColor="handleColorChanged"
      />
    </div>
  </div>
</template>
