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
    <ul v-if="details.widgets[details.selectedWidgetId]?.attributes?.label">
      <li class="flex items-center mb-2">
        <div class="w-24">{{ t("core.label") }}:</div>
        <div class="ml-4">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label.text
            "
          />
        </div>
      </li>
      <li class="flex items-center mb-2">
        <div class="w-24">{{ t("core.fontSize") }}:</div>
        <div class="ml-4">
          <input
            type="number"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label
                .fontSize
            "
          />
        </div>
      </li>
      <li class="flex items-center mb-2">
        <div class="w-24">{{ t("core.backgroundColor") }}:</div>
        <div class="ml-4">
          <ColorPickerDropdown
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label.bgColor
            "
          />
        </div>
      </li>
      <li class="flex items-center mb-2">
        <div class="w-24">{{ t("core.textColor") }}:</div>
        <div class="ml-4">
          <ColorPickerDropdown
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label
                .textColor
            "
          />
        </div>
      </li>
    </ul>
  </div>
</template>
