<template>
  <footer class="absolute bottom-0 right-0 p-2">
    <div class="bloomberg" />
    <p class="trademark">©{{ new Date().getFullYear() }} Bloomberg Finance L.P.</p>
    <p class="trademark">All rights reserved.</p>
  </footer>
</template>

<style>
.bloomberg {
  height: 14.5px;
  margin: 1px auto;
  background-size: cover;
  background-image: url("/bb_black.webp");
}

.dark .bloomberg {
  background-image: url("/bb_white.webp");
}
.bottom-0 {
  padding-bottom: 1px;
}

.right-0 {
  padding-right: 3px;
}

.trademark {
  font-size: 5px;
  font-weight: 600;
  color: black;
  text-align: center;
  line-height: 0.9;
}

.dark .trademark {
  color: white;
}
</style>
