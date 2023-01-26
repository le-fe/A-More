<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const isOpen = useVModel(props, "modelValue", emit);

function handleClickoutside() {
  isOpen.value = false;
  emit("close");
}
</script>

<template>
  <div
    v-if="isOpen"
    id="defaultModal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex bg-[#0000008c]"
    aria-modal="true"
    role="dialog"
  >
    <div
      v-click-outside="handleClickoutside"
      class="relative w-full h-full max-w-2xl md:h-auto bg-white"
    >
      <!-- Modal content -->
      <slot />
    </div>
  </div>
</template>
