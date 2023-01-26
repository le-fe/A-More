<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "default",
  },
});

const icon = defineAsyncComponent(() =>
  import(`../../assets/svg/${props.name}.svg`)
);

const sizeMapping = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  default: "w-5 h-5",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

function getClass() {
  return sizeMapping[props.size] || sizeMapping.default;
}
</script>

<template>
  <component :is="icon" class="fill-current" :class="getClass()" />
</template>
