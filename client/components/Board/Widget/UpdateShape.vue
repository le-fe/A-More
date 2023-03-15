<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas, details, deleteSelectedElement } = toRefs(
  useBoardStore()
);
const { t } = useLang();
</script>
<template>
  <div>
    <ul>
      <li class="flex items-center mb-4">
        <div class="w-24">{{ t("core.backgroundColor") }}:</div>
        <div class="ml-4">
          <ColorPickerDropdown
            v-model="details.widgets[details.selectedWidgetId].styles.fill"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
