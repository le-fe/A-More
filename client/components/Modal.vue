<script setup lang="ts">
import { ref } from "vue";
import { useVModel, onClickOutside } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const isOpen = useVModel(props, "modelValue", emit);
const popup = ref();

onClickOutside(popup, () => {
  isOpen.value = false;
  emit("close");
});
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
      ref="popup"
      class="relative w-full h-full max-w-xl md:h-auto bg-white rounded-lg"
    >
      <!-- Modal content -->
      <slot />
    </div>
  </div>
</template>
