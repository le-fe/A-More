<script setup lang="ts">
import { computed } from "vue";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue?: string | number;
  ghost?: boolean;
  size?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const className = computed(() => {
  let cls = ["input-bordered"];
  if (props.ghost) cls.push("input-ghost");
  if (props.size) cls.push(`input-${props.size}`);
  return cls;
});
const data = useVModel(props, "modelValue", emit);
</script>
<template>
  <input
    v-model="data"
    type="text"
    placeholder="Type here"
    class="input"
    :class="className"
    spellcheck="false"
  />
</template>
