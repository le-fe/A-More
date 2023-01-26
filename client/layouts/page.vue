<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { $bus } = useNuxtApp();

const showModal = ref<boolean>(false);
const activeModal = ref<string>("");

watch(
  route,
  (to, from) => {
    hideModal();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  $bus.$on("TRIGGER_MODAL", (modal: string) => {
    showModal.value = true;
    activeModal.value = modal;
  });
});

function hideModal(isBack?: boolean) {
  if (isBack) {
    router.go(-1);
  } else {
    showModal.value = false;
    activeModal.value = "";
  }
}
</script>

<template>
  <div class="min-h-screen">
    <PageSidebar
      class="fixed left-0 top-0 bottom-0 w-sidebar overflow-y-auto"
    />
    <div class="md:pl-sidebar">
      <PageHeader class="sticky top-0" />
      <slot />
      <slot name="footer" />
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
    <Modal v-model="showModal" @close="hideModal(true)">
      <AuthLoginModal v-if="activeModal === 'LOGIN'" />
    </Modal>
  </div>
</template>
