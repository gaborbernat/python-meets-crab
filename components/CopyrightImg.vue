<script setup lang="ts">
interface Props {
  img: string;
  maxHeight?: string;
}
const { maxHeight = "550px", img } = defineProps<Props>();
const year = new Date().getFullYear();
</script>

<style scoped>
img {
  max-height: v-bind("maxHeight");
  margin: 0 auto;
  padding: 0;
}
figcaption {
  text-align: center;
  font-size: 0.5em;
  color: gray;
}
</style>

<template>
  <figure>
    <img :src="`./${img}.webp`" />
    <figcaption v-if="!!$slots.default"><slot /></figcaption>
    <figcaption v-else="$slots.default">Copyright {{ year }} Bernát Gábor - All rights reserved</figcaption>
  </figure>
</template>
