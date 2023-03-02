<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  ghost?: boolean;
  size?: string;
}>();

const className = computed(() => {
  let cls = ["input-bordered"];
  if (props.ghost) cls.push("input-ghost");
  if (props.size) cls.push(`input-${props.size}`);
  return cls;
});
</script>
<template>
  <input type="text" placeholder="Type here" class="input" :class="className" />
</template>
