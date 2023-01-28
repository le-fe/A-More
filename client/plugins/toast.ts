import { startWindToast } from "../components/Toast";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      toast: startWindToast,
    },
  };
});
