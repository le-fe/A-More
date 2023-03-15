<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "@/store/board-detail";
import { WIDGET_TYPE } from "@/constants";

const { setCanvas, canvas, details, deleteSelectedElement, selectedWidget } =
  toRefs(useBoardStore());
const { t } = useLang();
</script>

<template>
  <div>
    <h3 class="font-medium mb-2">{{ details.selectedWidgetId }}</h3>
    <div>
      <BoardWidgetUpdatePic v-if="selectedWidget.type === WIDGET_TYPE.PIC" />
      <BoardWidgetUpdateText
        v-else-if="selectedWidget.type === WIDGET_TYPE.TEXT"
      />
      <BoardWidgetUpdateShape
        v-else-if="selectedWidget.type === WIDGET_TYPE.SHAPE"
      />
      <div class="mt-6">
        <CButton size="sm" @click="deleteSelectedElement">
          {{ t("core.delete") }}
        </CButton>
        <CButton class="ml-2" size="sm" @click="deleteSelectedElement">
          {{ t("core.duplicate") }}
        </CButton>
      </div>
    </div>
  </div>
</template>
