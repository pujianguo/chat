<script setup>
import { createTheme, inputDark, datePickerDark, zhCN, dateZhCN } from 'naive-ui'

// const darkTheme = createTheme([inputDark, datePickerDark])

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>

</template>
