<script lang="ts" setup>
import { AppConfigInput } from "@nuxt/schema";
import { useRoute } from "vue-router";

export interface IMenuItem {
  type: "link" | "button";
  text: string;
  href?: any;
  route?: any;
}

const route = useRoute();
const app = useAppConfig() as AppConfigInput;
const menus = computed((): IMenuItem[] => [
  //{
  //  type: "link",
  //  text: "pages.getting-started.nav",
  //  route: { name: "getting-started" },
  //},
  //{ type: "link", text: "pages.blank.nav", route: { name: "blank" } },
  //{ type: "link", text: "pages.test.nav", route: { name: "test" } },
  //{ type: "link", text: "pages.post.nav", route: { name: "post" } },
  //{ type: "link", text: "pages.setting.nav", route: { name: "setting" } },
  //{
  //  type: "button",
  //  text: "pages.dashboard.nav",
  //  route: { name: "dashboard" },
  //},
]);
</script>

<template>
  <header
    class="
      app-header
      sticky
      top-0
      bg-white
      z-30
      flex
      h-16
      w-full
      items-center
      justify-between
      border-b border-light-300
      bg-light
      py-1
      px-4
      ltr:left-0
      rtl:right-0
      dark:border-dark-300 dark:bg-dark-250
      sm:h-[70px] sm:px-6
    "
  >
    <div class="flex items-center gap-4">
      <div v-if="route.meta.title" class="font-semibold text-2xl">
        {{ route.meta.title }}
      </div>
    </div>
    <div class="relative flex items-center gap-5 pr-0.5 xs:gap-6 sm:gap-7">
      <button
        class="
          transition-fill-colors
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          duration-200
          pointer-events-auto
          cursor-pointer
          opacity-100
          transition-colors
          duration-200
          text-dark-800
          hover:text-dark-900
          dark:hover:text-light-600
          hidden
          sm:flex
        "
        aria-label="Search"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
        >
          <path
            d="M18.1951 17.2053L13.4176 12.4277C14.343 11.2846 14.9002 9.83207 14.9002 8.25006C14.9002 4.58342 11.9167 1.59998 8.25009 1.59998C4.58345 1.59998 1.60004 4.58339 1.60004 8.25003C1.60004 11.9167 4.58348 14.9001 8.25012 14.9001C9.83213 14.9001 11.2847 14.3429 12.4278 13.4175L17.2053 18.1951C17.3418 18.3316 17.521 18.4002 17.7002 18.4002C17.8795 18.4002 18.0586 18.3316 18.1952 18.1951C18.4688 17.9214 18.4688 17.479 18.1951 17.2053ZM8.25012 13.5001C5.35488 13.5001 3.00006 11.1453 3.00006 8.25003C3.00006 5.35479 5.35488 2.99997 8.25012 2.99997C11.1454 2.99997 13.5002 5.35479 13.5002 8.25003C13.5002 11.1453 11.1453 13.5001 8.25012 13.5001Z"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0.4"
          ></path>
        </svg></button
      ><button
        class="
          transition-fill-colors
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          duration-200
          pointer-events-auto
          cursor-pointer
          opacity-100
          transition-colors
          duration-200
          text-dark-800
          hover:text-dark-900
          dark:hover:text-light-600
          h-7
          w-7
        "
        aria-label="Theme Switcher"
      >
        <span class="absolute"
          ><svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
          >
            <path
              d="M13.545 6.45505C12.6455 5.55558 11.3757 4.97357 10 4.97357C8.62437 4.97357 7.35452 5.52913 6.45505 6.45505C5.55558 7.35452 4.97357 8.62437 4.97357 10C4.97357 11.3757 5.55558 12.6455 6.45505 13.545C7.35452 14.4445 8.62437 15.0265 10 15.0265C11.3757 15.0265 12.6455 14.4709 13.545 13.545C14.4445 12.6455 15.0265 11.3757 15.0265 10C15.0265 8.62437 14.4709 7.35452 13.545 6.45505Z"
              fill="currentColor"
            ></path>
            <path
              d="M10 3.41269C10.3704 3.41269 10.6879 3.09523 10.6879 2.72486V0.68783C10.6879 0.31746 10.3704 0 10 0C9.62965 0 9.31219 0.31746 9.31219 0.68783V2.72486C9.31219 3.09523 9.62965 3.41269 10 3.41269Z"
              fill="currentColor"
            ></path>
            <path
              d="M15.6349 5.34392L17.0899 3.88889C17.3545 3.62434 17.3545 3.20106 17.0899 2.93651C16.8254 2.67196 16.4021 2.67196 16.1376 2.93651L14.6825 4.39154C14.418 4.65609 14.418 5.07937 14.6825 5.34392C14.9206 5.60847 15.3439 5.60847 15.6349 5.34392Z"
              fill="currentColor"
            ></path>
            <path
              d="M19.3122 9.31219H17.2751C16.9047 9.31219 16.5873 9.62965 16.5873 10C16.5873 10.3704 16.9047 10.6879 17.2751 10.6879H19.3122C19.6825 10.6879 20 10.3704 20 10C20 9.62965 19.6825 9.31219 19.3122 9.31219Z"
              fill="currentColor"
            ></path>
            <path
              d="M15.6085 14.6561C15.3439 14.3916 14.9207 14.3916 14.6561 14.6561C14.3916 14.9207 14.3916 15.3439 14.6561 15.6085L16.1111 17.0635C16.3757 17.3281 16.799 17.3281 17.0635 17.0635C17.3281 16.799 17.3281 16.3757 17.0635 16.1111L15.6085 14.6561Z"
              fill="currentColor"
            ></path>
            <path
              d="M10 16.5873C9.62965 16.5873 9.31219 16.9047 9.31219 17.2751V19.3122C9.31219 19.6825 9.62965 20 10 20C10.3704 20 10.6879 19.6825 10.6879 19.3122V17.2751C10.6879 16.9047 10.3704 16.5873 10 16.5873Z"
              fill="currentColor"
            ></path>
            <path
              d="M4.36511 14.6561L2.91008 16.1111C2.64553 16.3757 2.64553 16.799 2.91008 17.0635C3.17463 17.3281 3.59791 17.3281 3.86246 17.0635L5.31749 15.6085C5.58204 15.3439 5.58204 14.9207 5.31749 14.6561C5.07939 14.3916 4.65611 14.3916 4.36511 14.6561Z"
              fill="currentColor"
            ></path>
            <path
              d="M3.41269 10C3.41269 9.62965 3.09523 9.31219 2.72486 9.31219H0.68783C0.31746 9.31219 0 9.62965 0 10C0 10.3704 0.31746 10.6879 0.68783 10.6879H2.72486C3.09523 10.6879 3.41269 10.3704 3.41269 10Z"
              fill="currentColor"
            ></path>
            <path
              d="M4.36511 5.34392C4.62966 5.60847 5.05294 5.60847 5.31749 5.34392C5.58204 5.07937 5.58204 4.65609 5.31749 4.39154L3.86246 2.93651C3.59791 2.67196 3.17463 2.67196 2.91008 2.93651C2.64553 3.20106 2.64553 3.62434 2.91008 3.88889L4.36511 5.34392Z"
              fill="currentColor"
            ></path></svg
        ></span></button
      ><button
        class="
          transition-fill-colors
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          duration-200
          pointer-events-auto
          cursor-pointer
          opacity-100
          transition-colors
          duration-200
          text-dark-800
          hover:text-dark-900
          dark:hover:text-light-600
          hidden
          2xl:flex 2xl:w-5
        "
        aria-label="Layout"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-[18px] w-[18px]"
        >
          <path
            d="M17.7003 10.7H11.4003C11.0139 10.7 10.7003 11.0136 10.7003 11.3999V17.6999C10.7003 18.0863 11.0139 18.3999 11.4003 18.3999H17.7003C18.0867 18.3999 18.4003 18.0863 18.4003 17.6999V11.3999C18.4003 11.0136 18.0867 10.7 17.7003 10.7Z"
            fill="currentColor"
          ></path>
          <path
            d="M2.30004 18.3999H8.60003C8.98643 18.3999 9.30003 18.0863 9.30003 17.6999V11.3999C9.30003 11.0136 8.98643 10.7 8.60003 10.7H2.30004C1.91364 10.7 1.60004 11.0136 1.60004 11.3999V17.6999C1.60004 18.0863 1.91364 18.3999 2.30004 18.3999Z"
            fill="currentColor"
          ></path>
          <path
            d="M17.7 1.59998H2.30004C1.91364 1.59998 1.60004 1.91358 1.60004 2.29998V8.59997C1.60004 8.98637 1.91364 9.29997 2.30004 9.29997H17.7C18.0864 9.29997 18.4 8.98637 18.4 8.59997V2.29998C18.4 1.91358 18.0864 1.59998 17.7 1.59998Z"
            fill="currentColor"
          ></path>
        </svg></button
      ><button
        class="
          transition-fill-colors
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          duration-200
          pointer-events-auto
          cursor-pointer
          opacity-100
          transition-colors
          duration-200
          text-dark-800
          hover:text-dark-900
          dark:hover:text-light-600
          hidden
          sm:flex
        "
        aria-label="Cart"
      >
        <span class="relative flex items-center"
          ><svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
          >
            <path
              d="M17.8315 7.00171C17.7049 6.86414 17.5235 6.78571 17.3329 6.78571H13.9998V4.85714C13.9998 2.72993 12.2059 1 10 1C7.79414 1 6.00025 2.72993 6.00025 4.85714V6.78571H2.66712C2.47647 6.78571 2.29515 6.86414 2.16849 7.00171C2.04183 7.13929 1.9825 7.3225 2.0045 7.50443L3.13976 16.7121C3.29042 18.0164 4.42968 19 5.79026 19H14.2097C15.571 19 16.7096 18.0164 16.8596 16.7172L17.9955 7.50443C18.0175 7.32186 17.9582 7.13929 17.8315 7.00171ZM7.3335 4.85714C7.3335 3.439 8.52943 2.28571 10 2.28571C11.4706 2.28571 12.6665 3.439 12.6665 4.85714V6.78571H7.3335V4.85714ZM6.66687 9.35714C6.2989 9.35714 6.00025 9.06914 6.00025 8.71429C6.00025 8.35943 6.2989 8.07143 6.66687 8.07143C7.03485 8.07143 7.3335 8.35943 7.3335 8.71429C7.3335 9.06914 7.03485 9.35714 6.66687 9.35714ZM13.3331 9.35714C12.9651 9.35714 12.6665 9.06914 12.6665 8.71429C12.6665 8.35943 12.9651 8.07143 13.3331 8.07143C13.7011 8.07143 13.9998 8.35943 13.9998 8.71429C13.9998 9.06914 13.7011 9.35714 13.3331 9.35714Z"
              fill="currentColor"
            ></path></svg
          ><span
            class="
              absolute
              -top-3
              -right-2.5
              flex
              min-h-[20px] min-w-[20px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border-2 border-light-100
              bg-brand
              px-0.5
              text-10px
              font-bold
              leading-none
              text-light
              dark:border-dark-250
            "
            >0</span
          ></span
        ></button
      ><a
        href="https://pixer-react-admin.vercel.app/register"
        target="_blank"
        rel="noreferrer"
        class="
          focus:ring-accent-700
          hidden
          h-9
          shrink-0
          items-center
          justify-center
          rounded
          border border-transparent
          bg-brand
          px-3
          py-0
          text-sm
          font-semibold
          leading-none
          text-light
          outline-none
          transition
          duration-300
          ease-in-out
          hover:bg-brand-dark
          focus:shadow focus:outline-none focus:ring-1
          sm:inline-flex
        "
        >Become a seller</a
      >
      <NuxtLink :to="{ name: 'auth' }">
        <button
          class="
            transition-fill-colors
            flex
            items-center
            justify-center
            gap-2
            font-semibold
            duration-200
            pointer-events-auto
            cursor-pointer
            opacity-100
            transition-colors
            duration-200
            text-dark-800
            hover:text-dark-900
            dark:hover:text-light-600
            flex
          "
          aria-label="User"
        >
          <svg
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
          >
            <path
              d="M10 10.625C9.25832 10.625 8.5333 10.4051 7.91661 9.99301C7.29993 9.58096 6.81928 8.99529 6.53545 8.31006C6.25162 7.62484 6.17736 6.87084 6.32206 6.14341C6.46675 5.41598 6.8239 4.7478 7.34835 4.22335C7.8728 3.6989 8.54098 3.34175 9.26841 3.19706C9.99584 3.05236 10.7498 3.12662 11.4351 3.41045C12.1203 3.69428 12.706 4.17493 13.118 4.79161C13.5301 5.4083 13.75 6.13332 13.75 6.875C13.75 7.86956 13.3549 8.82339 12.6517 9.52665C11.9484 10.2299 10.9946 10.625 10 10.625ZM10 4.375C9.50555 4.375 9.0222 4.52162 8.61108 4.79633C8.19995 5.07103 7.87952 5.46148 7.6903 5.91829C7.50108 6.37511 7.45158 6.87777 7.54804 7.36273C7.6445 7.84768 7.8826 8.29314 8.23223 8.64277C8.58187 8.9924 9.02732 9.2305 9.51228 9.32697C9.99723 9.42343 10.4999 9.37392 10.9567 9.1847C11.4135 8.99548 11.804 8.67505 12.0787 8.26393C12.3534 7.8528 12.5 7.36945 12.5 6.875C12.5 6.21196 12.2366 5.57608 11.7678 5.10723C11.2989 4.63839 10.663 4.375 10 4.375Z"
              fill="currentColor"
            ></path>
            <path
              d="M9.99991 19.375C8.61393 19.374 7.2454 19.0658 5.99284 18.4725C4.74029 17.8792 3.63486 17.0155 2.75615 15.9437L2.43115 15.5437L2.75615 15.15C3.6356 14.0795 4.74135 13.2173 5.99387 12.6253C7.24639 12.0334 8.61454 11.7263 9.99991 11.7263C11.3853 11.7263 12.7534 12.0334 14.0059 12.6253C15.2585 13.2173 16.3642 14.0795 17.2437 15.15L17.5687 15.5437L17.2437 15.9437C16.365 17.0155 15.2595 17.8792 14.007 18.4725C12.7544 19.0658 11.3859 19.374 9.99991 19.375ZM4.06865 15.55C4.8288 16.3637 5.74811 17.0125 6.76951 17.4561C7.79091 17.8997 8.89259 18.1286 10.0062 18.1286C11.1197 18.1286 12.2214 17.8997 13.2428 17.4561C14.2642 17.0125 15.1835 16.3637 15.9437 15.55C15.1835 14.7362 14.2642 14.0874 13.2428 13.6438C12.2214 13.2002 11.1197 12.9713 10.0062 12.9713C8.89259 12.9713 7.79091 13.2002 6.76951 13.6438C5.74811 14.0874 4.8288 14.7362 4.06865 15.55Z"
              fill="currentColor"
            ></path>
            <path
              d="M9.9999 19.375C7.87037 19.3764 5.8038 18.6528 4.14034 17.3232C2.47687 15.9936 1.31563 14.1373 0.847745 12.0598C0.379858 9.98231 0.633207 7.80742 1.56609 5.8931C2.49898 3.97877 4.05581 2.43909 5.98035 1.52747C7.90489 0.615841 10.0825 0.386598 12.1546 0.877467C14.2268 1.36834 16.0702 2.55007 17.3812 4.22816C18.6923 5.90625 19.393 7.9807 19.368 10.1101C19.343 12.2395 18.5938 14.2969 17.2436 15.9437C16.3649 17.0156 15.2595 17.8792 14.007 18.4725C12.7544 19.0659 11.3859 19.3741 9.9999 19.375ZM9.9999 1.87501C8.39293 1.87501 6.82205 2.35153 5.4859 3.24431C4.14975 4.1371 3.10835 5.40605 2.49339 6.8907C1.87843 8.37535 1.71753 10.009 2.03103 11.5851C2.34453 13.1612 3.11837 14.6089 4.25467 15.7452C5.39097 16.8815 6.8387 17.6554 8.4148 17.9689C9.99089 18.2824 11.6246 18.1215 13.1092 17.5065C14.5939 16.8916 15.8628 15.8502 16.7556 14.514C17.6484 13.1779 18.1249 11.607 18.1249 10C18.1249 7.84512 17.2689 5.77849 15.7451 4.25476C14.2214 2.73103 12.1548 1.87501 9.9999 1.87501Z"
              fill="currentColor"
            ></path>
            <path
              d="M3.2373 15.5499C3.2373 15.5499 9.53105 22.5812 15.9373 16.2499L16.7623 15.5499C16.7623 15.5499 11.4123 9.99993 5.98105 13.3312L3.2373 15.5499Z"
              fill="currentColor"
            ></path>
            <path
              d="M10 10C11.7259 10 13.125 8.60089 13.125 6.875C13.125 5.14911 11.7259 3.75 10 3.75C8.27411 3.75 6.875 5.14911 6.875 6.875C6.875 8.60089 8.27411 10 10 10Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </NuxtLink>
    </div>
  </header>
</template>
