import { defineStore } from "pinia";
import { useAuthCookie } from "../composables/useAuthCookie";

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      me: null,
      isLoadedMe: false,
      token: useAuthCookie().value || "",
    };
  },
  actions: {
    async setToken(token: string) {
      const authCookie = useAuthCookie();
      authCookie.value = token;
      this.token = token;
    },
    async queryMe() {
      if (this.token) {
        const { $api } = useNuxtApp();
        const res = await $api.auth.me();
        if (res.ok) {
          this.me = res.data;
        }
      }
      this.isLoadedMe = true;
    },
    logout() {
      const authCookie = useAuthCookie();
      authCookie.value = null;
    },
  },
  getters: {
    authUser: (state) => state.me,
  },
});
