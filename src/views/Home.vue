<script setup>
import { showMessage } from '../utils';

const handleClick = () => {
  showMessage('Cause you walked hand in hand With another man in my place')
}

const handlePositiveClick = () => {

}

const handleNegativeClick = () => {

}

const showModal = ref(false)
const onPositiveClick = () => {

}
const onNegativeClick = () => {

}


</script>

<template>
  <div class="home-page w-screen h-screen flex flex-col items-center justify-center">
    <div class="mb-4">
      <n-tag> 爱在西元前 </n-tag>
    </div>
    <div class="mb-4">
        <n-button @click="handleClick">Click</n-button>
        <n-popconfirm
          @positive-click="handlePositiveClick"
          @negative-click="handleNegativeClick"
        >
          <template #trigger>
            <n-button>引用</n-button>
          </template>
          一切都将一去杳然，任何人都无法将其捕获。
        </n-popconfirm>
    </div>

    <div>
      <n-button @click="showModal = true">
        来吧
      </n-button>
      <n-modal
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        title="确认"
        content="你确认"
        positive-text="确认"
        negative-text="算了"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
      />
    </div>
  </div>
</template>

<style lang="scss">
.home-page{

}
</style>
