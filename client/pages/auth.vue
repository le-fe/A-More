<script lang="ts">
export default {
  setup() {
    definePageMeta({
      layout: "auth",
    });
  },
  beforeRouteEnter(to, from, next) {
    try {
      const { $bus } = useNuxtApp();
      if (from.name) {
        $bus.$emit("TRIGGER_MODAL", "LOGIN");
        window.history.pushState({}, null, to.path);
        next(false);
      } else {
        next();
      }
    } catch (_) {
      next();
    }
  },
};
</script>
<template>
  <AuthRegisterModal />
</template>
