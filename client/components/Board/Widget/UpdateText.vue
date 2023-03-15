<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas, details, deleteSelectedElement } = toRefs(
  useBoardStore()
);
const { t } = useLang();

const textAlignOptions = [
  { name: t("core.left"), value: "left" },
  { name: t("core.center"), value: "center" },
  { name: t("core.right"), value: "right" },
];
</script>
<template>
  <div>
    <ul>
      <li class="flex items-center mb-4">
        <div class="w-24">{{ t("core.content") }}:</div>
        <div class="ml-4">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="details.widgets[details.selectedWidgetId].content"
          />
        </div>
      </li>
      <li class="flex items-center mb-4">
        <div class="w-24">{{ t("core.textColor") }}:</div>
        <div class="ml-4">
          <ColorPickerDropdown
            v-model="details.widgets[details.selectedWidgetId].styles.textColor"
          />
        </div>
      </li>
      <li class="flex items-center mb-4">
        <div class="w-24">{{ t("core.backgroundColor") }}:</div>
        <div class="ml-4">
          <ColorPickerDropdown
            v-model="details.widgets[details.selectedWidgetId].styles.bgColor"
          />
        </div>
      </li>
      <li class="flex items-center mb-4">
        <div class="w-24">{{ t("core.textAlign") }}:</div>
        <div class="ml-4">
          <CSelect
            size="sm"
            v-model="details.widgets[details.selectedWidgetId].styles.textAlign"
            :options="textAlignOptions"
          />
        </div>
      </li>
      <li class="flex items-center mb-4">
        <div class="w-24">{{ t("core.borderRadius") }}:</div>
        <div class="ml-4">
          <CInput
            type="number"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="
              details.widgets[details.selectedWidgetId].styles.borderRadius
            "
          />
        </div>
      </li>
    </ul>
  </div>
</template>
