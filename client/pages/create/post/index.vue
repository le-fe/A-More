<script setup lang="ts">
import { IPostCategory } from "@/interfaces";
import { ref } from "vue";

definePageMeta({
  layout: "full-page",
  title: null,
});

const { $api } = useNuxtApp();
const { t } = useLang();

const categories = ref<IPostCategory[]>([]);
const pending = ref<boolean>(false);

fetchCategories();

async function fetchCategories() {
  pending.value = true;
  const res = await $api.postCategories.list();
  if (res.ok) {
    categories.value = res.data;
  }
  pending.value = false;
}
</script>
<template>
  <div class="w-full pt-12">
    <div class="bg-white rounded-lg p-6 w-[1250px] mx-auto">
      <div class="text-center">
        <div class="text-2xl font-semibold text-primary">
          Share your ideas in a real panel
        </div>
        <div>300+ type of ideas you can share</div>
      </div>
      <div class="mt-8">
        <div class="text-lg font-semibold">
          {{ t("pages.post.pleaseSelectAPostType") }}
        </div>
        <div class="mt-4">
          <div
            class="
              grid
              gap-4
              grid-cols-[repeat(auto-fill,minmax(185px,1fr))]
              md:gap-5
            "
          >
            <NuxtLink
              v-for="cat in categories"
              :key="cat.uid"
              class="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <icon v-if="!cat.imgUrl" name="add" />
              <div class="w-full aspect-[5/3]">
                <img class="w-full h-full object-cover" :src="cat.imgUrl" />
              </div>
              <div class="pt-2 pb-4 px-4">
                <div>
                  <div
                    class="font-semibold text-lg leading-tight mb-1 truncate"
                  >
                    {{ cat.name }}
                  </div>
                  <div class="text-sm truncate">{{ cat.description }}</div>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <CButton size="sm" outlined>
                    {{ t("core.ideas") }}
                  </CButton>
                  <NuxtLink
                    :to="{
                      name: 'create-post-typeid',
                      params: { typeid: cat.uid },
                    }"
                  >
                    <CButton size="sm">
                      {{ t("core.start") }}
                    </CButton>
                  </NuxtLink>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>