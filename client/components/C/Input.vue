<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  ghost?: boolean;
}>();

const className = computed(() => {
  let cls = [];
  if (props.ghost) cls.push("input-ghost");
  else cls.push("input-bordered");
  return cls;
});
</script>
<template>
  <input type="text" placeholder="Type here" class="input" :class="className" />
</template>