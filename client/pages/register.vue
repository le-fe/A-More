<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});
</script>
<template>
  <div class="relative z-10 flex items-center">
    <div class="w-full shrink-0 text-left md:w-[380px]">
      <div class="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
        <h2
          class="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl"
        >
          Welcome Back, Get Login
        </h2>
        <div
          class="mt-1.5 text-13px leading-6 tracking-[0.2px] dark:text-light-900 lg:mt-2.5 xl:mt-3"
        >
          Create your account. Already have account?
          <button
            class="inline-flex font-semibold text-brand hover:text-dark-400 hover:dark:text-light-500"
          >
            Login here
          </button>
        </div>
      </div>
      <form novalidate="" class="space-y-4 lg:space-y-5">
        <div>
          <label class="block text-13px"
            ><span
              class="block cursor-pointer pb-2.5 font-normal text-dark/70 rtl:text-right dark:text-light/70"
              >Name</span
            ><input
              type="text"
              name="name"
              class="h-11 w-full appearance-none rounded border border-light-500 bg-transparent px-4 py-2 text-13px text-dark ring-[0.5px] ring-light-500 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:focus:border-brand dark:focus:ring-brand md:h-12 lg:px-5 xl:h-[50px] bg-light dark:bg-dark-300" />
            <div
              data-lastpass-icon-root="true"
              style="
                position: relative !important;
                height: 0px !important;
                width: 0px !important;
                float: left !important;
              "
            ></div
          ></label>
        </div>
        <div>
          <label class="block text-13px"
            ><span
              class="block cursor-pointer pb-2.5 font-normal text-dark/70 rtl:text-right dark:text-light/70"
              >Email</span
            ><input
              type="email"
              name="email"
              class="h-11 w-full appearance-none rounded border border-light-500 bg-transparent px-4 py-2 text-13px text-dark ring-[0.5px] ring-light-500 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:focus:border-brand dark:focus:ring-brand md:h-12 lg:px-5 xl:h-[50px] bg-light dark:bg-dark-300"
          /></label>
        </div>
        <div>
          <label class="block text-13px"
            ><span
              class="block cursor-pointer pb-2.5 font-normal text-dark/70 rtl:text-right dark:text-light/70"
              >Password</span
            ><span class="relative block"
              ><input
                type="password"
                name="password"
                class="h-11 w-full appearance-none rounded border border-light-500 bg-transparent py-2 text-13px text-dark ring-[0.5px] ring-light-500 focus:border-brand focus:ring-[0.5px] focus:ring-brand ltr:pl-4 ltr:pr-12 rtl:pr-4 rtl:pl-12 dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:focus:border-brand dark:focus:ring-brand md:h-12 lg:pr-12 lg:pl-5 xl:h-[50px] bg-light dark:bg-dark-300" /><span
                class="absolute top-0 flex h-full w-[34px] cursor-pointer items-center justify-start text-dark-900 hover:text-dark-700 ltr:right-0 rtl:left-0 dark:text-dark-800 hover:dark:text-light-900 lg:w-9"
                ><svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-auto w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path></svg
              ></span>
              <div
                data-lastpass-icon-root="true"
                style="
                  position: relative !important;
                  height: 0px !important;
                  width: 0px !important;
                  float: left !important;
                "
              ></div></span
          ></label>
        </div>
        <button
          class="transition-fill-colors flex items-center justify-center gap-2 font-semibold duration-200 pointer-events-auto cursor-pointer opacity-100 min-h-[46px] sm:h-12 rounded py-3 px-4 md:px-5 bg-brand text-white hover:bg-brand-dark focus:bg-brand-dark !mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
