<script setup>
import { showMessage } from '@/utils';

const handleConnect = () => {
  showMessage('Cause you walked hand in hand With another man in my place')
}

</script>

<template>
  <header class="w-full h-12 px-10 flex items-center justify-between">
    <div>LOGO</div>
    <div class="">
      <n-button @click="handleConnect" class="">Connect Wallet</n-button>
    </div>
  </header>
</template>

<style lang="scss">
</style>
