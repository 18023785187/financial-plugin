<script lang="ts" setup>
import WordAnd from '@/components/word-and.vue'

import { createApp, ref } from 'vue'

const ww = 1
const ss = `Hello, ${ww}!${ww}`

const price = ref('132')
console.log(window, document, createApp)
const port = chrome.runtime.connect({ name: 'popup-connect' })
port.onMessage.addListener((data) => {
  price.value = data.price
})

window.addEventListener('beforeunload', () => {
  if (port) {
    port.disconnect()
  }
})
</script>

<template>
  <div class="popup-container">
    <word-and />
    {{ price }}{{ ss }}
    {{ ss + 1 }}
  </div>
</template>

<style lang="scss">
.popup-container {
    width: 300px;
  padding: 20px;
        color: rgb(1 2 3 / 10%);
  text-align: center;
}
</style>
