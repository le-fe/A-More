<script setup lang="ts">
import { ITexture } from "@/interfaces";
import { ref } from "vue";

definePageMeta({
  layout: "full-page",
  title: null,
});

const { $api } = useNuxtApp();
const { t } = useLang();

const textures = ref<ITexture[]>([]);
const pending = ref<boolean>(false);

fetchTextures();

async function fetchTextures() {
  pending.value = true;
  const res = await $api.texture.list();
  if (res.ok) {
    textures.value = res.data;
  }
  pending.value = false;
}

async function startWithTexture(texture: ITexture) {
  const res = await $api.board.create({ texture: texture.id });
  console.clear();
  console.log(res);
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
        <div class="mb-4">
          <div class="text-lg font-semibold mb-1">
            {{ t("pages.post.pleaseSelectATexture") }}
          </div>
          <CInput class="w-[650px]" placeholder="Search a texture" />
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
            <div
              v-for="texture in textures"
              :key="texture.id"
              class="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <icon v-if="!texture.src" name="add" />
              <div class="w-full aspect-[5/3]">
                <img class="w-full h-full object-cover" :src="texture.src" />
              </div>
              <div class="pt-2 pb-4 px-4">
                <div>
                  <div
                    class="font-semibold text-lg leading-tight mb-1 truncate"
                  >
                    {{ texture.name }}
                  </div>
                  <div class="text-sm truncate">{{ texture.description }}</div>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <CButton size="sm" outlined>
                    {{ t("core.ideas") }}
                  </CButton>
                  <CButton size="sm" @click="startWithTexture(texture)">
                    {{ t("core.start") }}
                  </CButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>