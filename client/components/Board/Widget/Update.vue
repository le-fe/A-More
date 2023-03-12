<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useBoardStore } from "@/store/board-detail";

const { setCanvas, canvas, details, selectedWidget } = toRefs(useBoardStore());
</script>

<template>
  <div>
    {{ details.selectedWidgetId }}
    <div>
      <ul v-if="details.widgets[details.selectedWidgetId]?.attributes?.label">
        <li class="flex items-center">
          <span class="w-24">Label:</span>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label.text
            "
          />
        </li>
        <li class="flex items-center">
          <span class="w-24">Font size:</span>
          <input
            type="number"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label
                .fontSize
            "
          />
        </li>
        <li class="flex items-center">
          <span class="w-24">backgroundColor:</span>
          <input
            type="string"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label.bgColor
            "
          />
        </li>
        <li class="flex items-center">
          <span class="w-24">tex color:</span>
          <input
            type="string"
            placeholder="Type here"
            class="input input-bordered input-sm"
            v-model="
              details.widgets[details.selectedWidgetId].attributes.label
                .textColor
            "
          />
        </li>
      </ul>
    </div>
  </div>
</template>
