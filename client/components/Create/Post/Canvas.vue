<template>
  <v-stage
    :config="{
      width: 200,
      height: 200,
    }"
  >
    <v-layer>
      <v-circle
        :config="{
          x: 100,
          y: 100,
          radius: 70,
          fill: 'red',
          stroke: 'black',
          strokeWidth: 4,
        }"
      ></v-circle>
    </v-layer>
  </v-stage>
</template>
<script setup>
</script>