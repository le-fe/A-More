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
    hideModalAuth();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  $bus.$on(
    "TRIGGER_MODAL",
    ({ modal, opened }: { modal: string; opened: boolean }) => {
      if (modal === "LOGIN" && opened === false) {
        hideModalAuth(true);
      } else {
        showModal.value = opened;
        activeModal.value = opened ? modal : "";
      }
    }
  );
});

function hideModalAuth(isBack?: boolean) {
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
    <PageHeader class="sticky top-0 h-[70px]" />
    <slot />
    <slot name="footer" />
    <slot name="app-after" />
    <div id="app-after"></div>
    <Modal v-model="showModal" @close="hideModalAuth(true)">
      <AuthRegisterModal v-if="activeModal === 'LOGIN'" />
    </Modal>
  </div>
</template>
