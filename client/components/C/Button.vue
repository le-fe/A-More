<script setup lang="ts">
import { computed } from "vue";

const BUTTON = {
  typeClass: [
    "primary",
    "secondary",
    "accent",
    "ghost",
    "link",
    "info",
    "success",
    "warning",
    "error",
  ],
  sizeClass: ["lg", "sm", "xs"],
};

const props = defineProps<{
  type?: string;
  outlined?: boolean;
  active?: boolean;
  size?: string;
  wide?: boolean;
  disabled?: boolean;
  square?: boolean;
  circle?: boolean;
  loading?: boolean;
  noAnimation?: boolean;
}>();

const buttonClass = computed(() => {
  let cls = [];
  if (props.type && BUTTON.typeClass.includes(props.type)) cls.push(props.type);
  if (props.outlined) cls.push("btn-outline");
  if (props.active) cls.push("btn-active");
  if (props.size && BUTTON.sizeClass.includes(props.size)) cls.push(props.size);
  if (props.wide) cls.push("btn-wide");
  if (props.disabled) cls.push("btn-disabled");
  if (props.square) cls.push("btn-square");
  else if (props.circle) cls.push("btn-circle");
  if (props.loading) cls.push("loading");
  if (props.noAnimation) cls.push("no-animation");
  return cls;
});
</script>
<template>
  <button class="btn" :class="buttonClass"><slot /></button>
</template>
