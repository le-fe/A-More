import { startWindToast } from "../components/Toast";

export default defineNuxtPlugin((nuxtApp) => {
  // const { t } = useI18n();

  function toastError(msg?: string) {
    startWindToast("Error", msg || "Something went wrong!", "error");
  }

  return {
    provide: {
      toast: startWindToast,
      toastError,
    },
  };
});
