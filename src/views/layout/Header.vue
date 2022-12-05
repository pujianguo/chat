<script setup>
import { useBoard, useEthers, useWallet, displayEther, shortenAddress } from 'vue-dapp'
const { open } = useBoard()
const { address, balance, isActivated } = useEthers()

</script>

<template>
  <header class="w-full h-12 px-10 flex items-center justify-between">
    <div>LOGO</div>
    <div class="">
      <div v-if="isActivated" class="flex items-center">
        <!-- Account -->
        <div class="sm:hidden py-2 px-3 rounded-2xl inline-block bg-gray-100">
          {{ shortenAddress(address) }}
        </div>

        <div class="hidden sm:flex py-1 px-2 items-center rounded-3xl border border-solid">
          <div class="px-1 mr-1">{{ displayEther(balance) }} ETH</div>
          <div class="py-2 px-3 rounded-2xl inline-block bg-gray-100">
            {{ shortenAddress(address) }}
          </div>
        </div>
      </div>

      <button v-else @click="open" class="btn btn-sm">Connect Wallet</button>
    </div>
  </header>
</template>

<style lang="scss">
</style>
