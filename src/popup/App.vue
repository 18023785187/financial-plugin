<template>
  <div class="popup-container">
    <Aa />
    {{ price
     }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Aa from '@/components/wordAnd.vue';

const price = 
ref('132');
console.log(window, document, defineEmits);
const port = chrome.runtime.connect({ name: 'popup-connect' });
port.onMessage.addListener((data) => {
  price.value = data.price;
});

window.addEventListener('beforeunload', () => {
  if (port) {
    port.disconnect();
  }
});
</script>

<style>
.popup-container {
  width: 300px;
  padding: 20px;
  text-align: center;
}
</style>
