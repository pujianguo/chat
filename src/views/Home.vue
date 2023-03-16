<script setup>
import { ref } from 'vue'
import { showWarningMessage } from '../utils'
import { PaperPlaneOutline } from '@vicons/ionicons5'
import { User, Robot } from '@vicons/fa'
import { createQuestion, getQuestionStatus } from '@/api'

const list = ref([])
let index = -1
const submitLoading = ref(false)
const questionValue = ref('')
const chatRoomId = ref('')

const handleSubmit = async () => {
  if (questionValue.value === '') {
    showWarningMessage('请输入提问内容！')
    return
  }
  submitLoading.value = true
  const listItem = {
    chat_room_id: chatRoomId.value,
    loading: true,
    question_id: '',
    question: questionValue.value,
    answer: '',
  }
  list.value.push(listItem)
  index++
  const data = {
    chat_room_id: chatRoomId.value,
    question: questionValue.value,
  }
  const createRes = await createQuestion(data)
  chatRoomId.value = createRes.chat_room_id
  questionValue.value = ''
  const timer = setInterval(async () => {
    const res = await getQuestionStatus({ question_id: createRes.question_id })
    if (res.status === 'answered') {
      submitLoading.value = false
      let answer = res.answer
      if (answer.startsWith('\n\n')) {
        answer = answer.substr(2)
      }
      list.value[index].question_id = createRes.question_id
      list.value[index].answer = answer
      list.value[index].loading = false
      clearInterval(timer)
    }
  }, 1000)
}
const handleKeydown = (e) => {
  if (!e.shiftKey && e.keyCode == 13) {
    e.cancelBubble = true
    e.stopPropagation() // Firefox阻止冒泡行为
    e.preventDefault() // 取消事件的默认动作*换行
    if (e.keyCode === 13) {
      if (submitLoading.value) {
        showWarningMessage('请等待上个问题结束')
        return
      }
      handleSubmit()
    }
  }
}

</script>

<template>
  <div class="home-page w-screen h-screen  ">
    <div class="fixed bottom-0 left-0 z-10 w-full py-5 flex justify-center bg-white shadow-sm">
      <div class="container">
        <n-input class="shadow-2xl" v-model:value="questionValue" type="textarea" placeholder="请输入" :autosize="{minRows: 1}" @keydown="handleKeydown">
          <template #suffix>
            <n-button size="tiny" type="primary" secondary :loading="submitLoading" @click="handleSubmit">
              <template #icon>
                <n-icon><PaperPlaneOutline /></n-icon>
              </template>
            </n-button>
          </template>
        </n-input>
      </div>
    </div>
    <div class="w-full mb-20 bg-light-100 flex justify-center">
      <div class="container">
        <div class="w-full mt-5" v-for="(item, i) in list" :key="i">
          <div class="w-full flex p-5 bg-gray-100">
            <n-icon class="mr-5" :size="24"><User /></n-icon>
            <div class="flex-1 leading-6">
              {{ item.question }}
            </div>
          </div>
          <div class="w-full flex p-5 bg-gray-200">
            <n-icon class="mr-5" :size="24"><Robot /></n-icon>
            <div class="flex-1 leading-6 min-h-8">
              <n-spin :show="item.loading">
                <div style="white-space: pre-wrap;" class="break-words">
                  {{ item.answer }}
                </div>
              </n-spin>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-page {
  .card {
    width: 100vw;
    height: 100vh;
  }
}
</style>
