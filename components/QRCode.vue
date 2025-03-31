<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";
import { onMounted, ref } from "vue";

interface Props {
  data: string;
  size: number;
}

const { size, data } = defineProps<Props>();
const sizePixels = `${size}px`;
const qrCode = new QRCodeStyling({
  width: size,
  height: size,
  type: "svg",
  data: data,
  dotsOptions: { type: "rounded" },
  cornersSquareOptions: { type: "rounded" },
  imageOptions: { saveAsBlob: true, crossOrigin: "anonymous" },
});
const qrCodeRef = ref(null);
onMounted(() => {
  if (qrCodeRef.value) qrCode.append(qrCodeRef.value);
});
</script>

<style scoped>
.qr-code {
  margin: 0 auto;
  padding-top: 20px;
  height: v-bind("sizePixels");
  width: v-bind("sizePixels");
}
</style>

<template>
  <div class="qr-code" ref="qrCodeRef" />
</template>
