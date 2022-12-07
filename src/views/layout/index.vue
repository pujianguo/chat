<script setup>
import Header from './Header.vue'

// 挂载window下方法组件，放在App中会报错
window.$message = useMessage();
window.$dialog = useDialog();

</script>

<template>
  <div class="">
    <Header />
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
</style>
