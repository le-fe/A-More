<script setup lang="ts">
import { ref } from "vue";
import { AppConfigInput } from "@nuxt/schema";
import { sample, cloneDeep } from "lodash";

const { $api, $config, $toast } = useNuxtApp();
const app = useAppConfig() as AppConfigInput;
const formStep = {
  FILL_USERNAME: "FILL_USERNAME",
  FILL_PASSWORD: "FILL_PASSWORD",
  FILL_SIGNUP: "FILL_SIGNUP",
};

const activeStep = ref<string>(formStep.FILL_USERNAME);
const loginUsername = ref<string>("test2321");
const submitting = ref<boolean>(false);
const avatarList = ref([]);
const signupForm = ref({
  fullName: "Test Account",
  avatar: "",
  password: "TestAccount!@#",
  confirmPassword: "TestAccount!@#",
});

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

defineExpose({
  loginUsername,
});
</script>
<template>
  <div class="relative z-10 flex items-center bg-white py-4 rounded-lg shadow">
    <div
      class="w-full px-6 shrink-0 text-left md:w-[580px] max-h-[80vh] overflow-y-auto"
    >
      <div class="flex items-center pb-2 xl:pt-2 sticky top-0 bg-white z-10">
        <Icon size="xl" name="logo" />
        <h2 class="text-2xl font-semibold">Register to {{ app.name }}</h2>
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
              help="Please enter a username between 5 and 16 characters long."
              placeholder="Type here"
            />
          </FormKit>
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
            validation="required|?length:10"
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
