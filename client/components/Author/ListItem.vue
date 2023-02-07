<script setup lang="ts">
defineProps<{
  user: object;
}>();
</script>
<template>
  <div class="bg-gray-100 rounded-lg text-center p-4 relative">
    <div class="">
      <div class="absolute top-0 left-0 right-0 h-[90px]">
        <img
          class="h-full w-full rounded-tl-lg rounded-tr-lg"
          src="https://www.radiustheme.com/demo/wordpress/themes/cirkle/wp-content/uploads/buddypress/groups/11/cover-image/60b0bb11581f3-bp-cover-image.jpg"
          alt="Cover Image"
        />
      </div>
      <div class="mt-[26px] relative">
        <div class="avatar">
          <div class="w-20 mask mask-hexagon">
            <img :src="user.imgUrl" />
          </div>
        </div>
      </div>
      <div class="mt-2">
        <h4 class="author-name">
          <a
            href="https://www.radiustheme.com/demo/wordpress/themes/cirkle/groups/the-godfather/"
            class="font-semibold text-lg"
          >
            {{ user.fullName }}
          </a>
        </h4>
        <div class="text-sm">Public Group</div>
      </div>
    </div>
    <ul class="mt-2">
      <li class="text-sm">
        <a
          href="https://www.radiustheme.com/demo/wordpress/themes/cirkle/groups/the-godfather/"
          ><span class="item-number">0</span>
          <span class="item-text ml-1">Group Posts</span></a
        >
      </li>
      <li class="text-sm">
        <a
          href="https://www.radiustheme.com/demo/wordpress/themes/cirkle/groups/the-godfather/"
        >
          <span class="item-number">3</span>
          <span class="item-text">All Member</span>
        </a>
      </li>
    </ul>
  </div>
</template>
