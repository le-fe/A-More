<script setup lang="ts">
import { ref } from "vue";
import { AppConfigInput } from "@nuxt/schema";
import { sample, cloneDeep } from "lodash";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/auth";

const { $api, $config, $toast, $bus } = useNuxtApp();
const router = useRouter();
const { t } = useLang();
const app = useAppConfig() as AppConfigInput;
const authStore = useAuthStore();

const formStep = {
  FILL_USERNAME: "FILL_USERNAME",
  FILL_PASSWORD: "FILL_PASSWORD",
  FILL_SIGNUP: "FILL_SIGNUP",
};

const activeStep = ref<string>(formStep.FILL_USERNAME);
const loginUsername = ref<string>("timle");
const loginPassword = ref<string>("chelsea39");
const submitting = ref<boolean>(false);
const avatarList = ref([]);
const signupForm = ref({
  fullName: "Test Account",
  avatar: "",
  password: "TestAccount!@#",
  confirmPassword: "TestAccount!@#",
});
const errorText = ref<string>("");

generateAvatarList();
function generateAvatarList() {
  for (let i = 1; i <= 31; i++) {
    const name = `c${i}`;
    avatarList.value.push({
      name,
      src: `${$config.public.mediaBase}/avatar/${name}.jpg`,
    });
  }
  signupForm.value.avatar = sample(avatarList.value).name;
}

function handleUserExisted() {
  activeStep.value = formStep.FILL_PASSWORD;
}
function handleUserNotExisted() {
  activeStep.value = formStep.FILL_SIGNUP;
}

async function submitUsername(): void {
  submitting.value = true;
  const response = await $api.auth.continueWithUsername(loginUsername.value);
  const responseActions = {
    USER_EXISTED_PLS_LOGIN: handleUserExisted,
    USER_NOT_EXISTED_PLS_REGISTER: handleUserNotExisted,
  };
  if (responseActions[response.messageCode]) {
    responseActions[response.messageCode]();
  }
  submitting.value = false;
}

async function handleRegister() {
  try {
    const formToSubmit = cloneDeep(signupForm.value);
    formToSubmit["username"] = loginUsername.value;
    delete formToSubmit.confirmPassword;
    const response = await $api.auth.register(formToSubmit);
    if (response.ok) {
      $toast(
        "Success",
        "Register successfully, please login into your account!",
        "success"
      );
      activeStep.value = formStep.FILL_PASSWORD;
    }
  } catch (error) {
    $toast("Error", "Something goes wrong!", "error");
  }
}

async function handleLogin() {
  try {
    errorText.value = "";
    const formToSubmit = {
      username: loginUsername.value,
      password: loginPassword.value,
    };
    const res = await $api.auth.login(formToSubmit);
    if (res.token) {
      authStore.setToken(res.token);
      $bus.$emit("TRIGGER_MODAL", { modal: "LOGIN", opened: false });
      // router.push({ name: "index" });
      window.location.href = "/";
    } else {
      const msgText = res.massage || "Something goes wrong!";
      errorText.value = msgText;
      $toast("Error", msgText, "error");
    }
  } catch (error) {
    console.log(error);
    const msgText = error.response?._data?.message || "Something goes wrong!";
    errorText.value = msgText;
    $toast("Error", msgText, "error");
  }
}
</script>
<template>
  <div
    class="relative z-10 flex justify-center items-center bg-white rounded-lg shadow text-center"
  >
    <div
      class="w-full px-6 py-6 shrink-0 text-left max-h-[80vh] overflow-y-auto"
    >
      <div
        class="flex items-center pb-2 xl:pt-2 sticky top-0 bg-white z-10 mb-2"
      >
        <Icon size="xl" name="logo" />
        <h2 class="text-2xl font-semibold">Welcome to {{ app.name }}</h2>
      </div>
      <template v-if="activeStep === formStep.FILL_USERNAME">
        <div class="space-y-4 lg:space-y-5">
          <FormKit type="form" submit-label="Continue" @submit="submitUsername">
            <FormKit
              type="text"
              :name="`${app.name}-username`"
              :id="`${app.name}-username`"
              validation="required|length:5,16"
              label="Your username"
              v-model="loginUsername"
              spellcheck="false"
              help="Please enter a username between 5 and 16 characters long."
              placeholder="Type here"
            />
          </FormKit>
        </div>
      </template>
      <template v-if="activeStep === formStep.FILL_PASSWORD">
        <div class="space-y-4 lg:space-y-5">
          <div>
            <span class="">{{ t("pages.auth.welcomeback") }}</span>
            <span class="font-semibold ml-1 text-lg">{{ loginUsername }},</span>
            <span class="ml-1">
              {{ t("pages.auth.please_login_your_account") }},
            </span>
          </div>
          <FormKit
            type="form"
            :submit-label="t('pages.auth.login')"
            @submit="handleLogin"
          >
            <FormKit
              class="mb-4"
              v-model="loginPassword"
              autofocus
              type="password"
              name="password"
              label="Password"
              validation="required"
              placeholder="Please enter password"
            />
          </FormKit>
          <div v-if="errorText">
            <span class="text-red-600">{{ errorText }}</span>
          </div>
        </div>
      </template>
      <template v-else-if="activeStep === formStep.FILL_SIGNUP">
        <div class="mb-2">
          <p class="text-gray-500 text-sm">
            Hello <strong class="text-lg">{{ loginUsername }}</strong> , welcome
            to {{ app.name }}. Please enter some basic information to get
            started!
          </p>
        </div>
        <FormKit
          type="form"
          submit-label="Register Account"
          @submit="handleRegister"
        >
          <div class="mb-4">
            <label class="block mb-1 font-bold text-sm">Select an avatar</label>
            <div class="flex flex-wrap items-center">
              <template v-for="avatar in avatarList" :key="avatar.name">
                <div class="avatar">
                  <div
                    class="w-10 rounded-full cursor-pointer mb-1 mr-1"
                    :class="{
                      'ring ring-primary ring-offset-base-100 ring-offset-1':
                        signupForm.avatar === avatar.name,
                    }"
                    @click="() => (signupForm.avatar = avatar.name)"
                  >
                    <img :alt="avatar.name" :src="avatar.src" />
                  </div>
                </div>
              </template>
            </div>
          </div>
          <FormKit
            class="mb-4"
            type="text"
            v-model="signupForm.fullName"
            :name="`${app.name}-name`"
            :id="`${app.name}-name`"
            label="Your Full Name"
            placeholder="Please enter"
          />
          <FormKit
            class="mb-4"
            v-model="signupForm.password"
            type="password"
            name="password"
            label="Password"
            validation="required|?length:4"
            :validation-messages="{
              length: 'Try to make your password longer!',
            }"
            placeholder="Please enter password"
          />
          <FormKit
            class="mb-4"
            type="password"
            v-model="signupForm.confirmPassword"
            label="Confirm password"
            name="password_confirm"
            validation="required|confirm"
            placeholder="Please confirm password"
          />
        </FormKit>
        <button
          class="btn btn-primary w-full"
          :class="{ loading: submitting }"
          @click="activeStep = formStep.FILL_USERNAME"
        >
          Back
        </button>
      </template>
    </div>
  </div>
</template>
