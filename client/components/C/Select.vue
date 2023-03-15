<script setup lang="ts">
import { computed } from "vue";
import { useVModel } from "@vueuse/core";

interface Props {
  modelValue?: string;
  options?: any[];
  valueKey?: string;
  labelKey?: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "value",
});

const emit = defineEmits(["update:modelValue"]);

const SELECT = {
  typeClass: [
    "primary",
    "secondary",
    "accent",
    "ghost",
    "link",
    "info",
    "success",
    "warning",
    "error",
  ],
  sizeClass: ["lg", "sm", "xs"],
};

const selectClass = computed(() => {
  let cls = ["select-bordered"];
  if (props.size && SELECT.sizeClass.includes(props.size))
    cls.push(`select-${props.size}`);
  return cls;
});

const data = useVModel(props, "modelValue", emit);
</script>
<template>
  <select class="select w-full max-w-xs" :class="selectClass" v-model="data">
    <option
      v-for="option in options"
      :key="option[valueKey]"
      :value="option[valueKey]"
    >
      {{ option[labelKey] }}
    </option>
  </select>
</template>
<style lang="scss">
.select-bordered {
  --tw-border-opacity: 0.2;
}

.select:focus {
  outline: 2px solid hsla(var(--bc) / 0.2);
  outline-offset: 2px;
}

.select-ghost {
  --tw-bg-opacity: 0.05;
}

.select-ghost:focus {
  --tw-bg-opacity: 1;
  --tw-text-opacity: 1;
  color: hsl(var(--bc) / var(--tw-text-opacity));
}

.select-primary {
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
}

.select-primary:focus {
  outline: 2px solid hsl(var(--p));
}

.select-secondary {
  --tw-border-opacity: 1;
  border-color: hsl(var(--s) / var(--tw-border-opacity));
}

.select-secondary:focus {
  outline: 2px solid hsl(var(--s));
}

.select-accent {
  --tw-border-opacity: 1;
  border-color: hsl(var(--a) / var(--tw-border-opacity));
}

.select-accent:focus {
  outline: 2px solid hsl(var(--a));
}

.select-info {
  --tw-border-opacity: 1;
  border-color: hsl(var(--in) / var(--tw-border-opacity));
}

.select-info:focus {
  outline: 2px solid hsl(var(--in));
}

.select-success {
  --tw-border-opacity: 1;
  border-color: hsl(var(--su) / var(--tw-border-opacity));
}

.select-success:focus {
  outline: 2px solid hsl(var(--su));
}

.select-warning {
  --tw-border-opacity: 1;
  border-color: hsl(var(--wa) / var(--tw-border-opacity));
}

.select-warning:focus {
  outline: 2px solid hsl(var(--wa));
}

.select-error {
  --tw-border-opacity: 1;
  border-color: hsl(var(--er) / var(--tw-border-opacity));
}

.select-error:focus {
  outline: 2px solid hsl(var(--er));
}

.select-disabled,
.select[disabled] {
  cursor: not-allowed;
  --tw-border-opacity: 1;
  border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
  --tw-text-opacity: 0.2;
}

.select-disabled::placeholder,
.select[disabled]::placeholder {
  color: hsl(var(--bc) / var(--tw-placeholder-opacity));
  --tw-placeholder-opacity: 0.2;
}

.select-multiple,
.select[multiple],
.select[size].select:not([size="1"]) {
  background-image: none;
  padding-right: 1rem;
}

[dir="rtl"] .select {
  background-position: calc(0% + 12px) calc(1px + 50%),
    calc(0% + 16px) calc(1px + 50%);
}

.select-md {
  height: 3rem;
  padding-left: 1rem;
  padding-right: 2.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 2;
  min-height: 3rem;
}

[dir="rtl"] .select-md {
  padding-right: 1rem;
  padding-left: 2.5rem;
}

.select-lg {
  height: 4rem;
  padding-left: 1.5rem;
  padding-right: 2rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  line-height: 2;
  min-height: 4rem;
}

[dir="rtl"] .select-lg {
  padding-right: 1.5rem;
  padding-left: 2rem;
}

.select-sm {
  height: 2rem;
  padding-left: 0.75rem;
  padding-right: 2rem;
  font-size: 0.875rem;
  line-height: 2rem;
  min-height: 2rem;
}

[dir="rtl"] .select-sm {
  padding-right: 0.75rem;
  padding-left: 2rem;
}

.select-xs {
  height: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 2rem;
  font-size: 0.75rem;
  line-height: 1rem;
  line-height: 1.625;
  min-height: 1.5rem;
}

[dir="rtl"] .select-xs {
  padding-right: 0.5rem;
  padding-left: 2rem;
}
</style>
