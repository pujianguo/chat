<script setup>
import { ref } from 'vue'
import { showWarningMessage } from '../utils'
import { PaperPlaneOutline } from '@vicons/ionicons5'
import { User, Robot } from '@vicons/fa'
import { createQuestion, getQuestionStatus } from '@/api'

const list = ref([])
let index = -1
const  submitLoading = ref(false)
const questionValue = ref('')
const chatRoomId = ref('')

const handleSubmit = async () => {
  submitLoading.value = true
  const listItem = {
    chat_room_id: chatRoomId.value,
    loading: true,
    question_id: '',
    question: questionValue.value,
    answer: '',
    // answer: "\n\n1. 第一天：到达西安\n\n抵达西安后，可以先前往酒店休息一下，调整好状态后再开始旅游之旅。建议选择市中心较为繁华的地段，方便游览。\n\n2. 第二天：古城墙、钟楼鼓楼和回民街\n\n上午，可以先去参观西安古城墙，这是世界上最完整、最长的古城墙之一。墙顶可以骑自行车或步行一圈，感受古都的气息。随后可以前往钟楼鼓楼，欣赏古城的钟鼓声和传统的巨型鼓乐表演。午餐后，可以前往回民街尝尝当地著名的小吃和特色美食。\n\n3. 第三天：秦始皇陵兵马俑\n\n这是西安必去之地。在秦始皇陵博物院参观兵马俑，深入了解秦文化和中国的古代历史。在附近一带还可以游览秦陵和秦汉艺术陈列馆。\n\n4. 第四天：大雁塔和小雁塔\n\n这两座塔都是中国古代建筑的代表作之一，是西安旅游的重要景点。大雁塔可以了解到行经西安的古代丝绸之路历史，还可以登塔观景，俯瞰城市景象。小雁塔则是古代佛教中的圣地，内有大量佛教文化精品，深入了解中国的佛教文化。\n\n5. 第五天：华清池和兴庆宫\n\n去往华清池游玩，这是一座古代的御花园，赏花品茗，体验古代皇宫文化。在此可游览温泉、御遗址和博物馆等景点。接着，前往兴庆宫，这里是唐朝皇宫遗址，了解唐代的历史和文化。\n\n6. 第六天：离开西安\n\n最后一天，可以在街头巷尾逛逛，尽情享受西安的历史文化氛围，之后离开西安。",
  }
  list.value.push(listItem)
  index++
  const data = {
    chat_room_id: chatRoomId.value,
    question: questionValue.value
  }
  const createRes = await createQuestion(data)
  chatRoomId.value = createRes.chat_room_id
  const timer = setInterval(async () => {
    const res = await getQuestionStatus({question_id: createRes.question_id})
    if (res.status === 'answered') {
      submitLoading.value = false
      console.log('list', list)
      list.value[index].question_id = createRes.question_id
      list.value[index].answer = res.answer
      list.value[index].loading = false
      clearInterval(timer)
    }
  }, 1000)
}
const handleKeydown = (e) => {
  if (!e.shiftKey && e.keyCode == 13) {
    e.cancelBubble = true;
    e.stopPropagation(); //Firefox阻止冒泡行为
    e.preventDefault(); //取消事件的默认动作*换行
    if (e.keyCode == 13) {
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
    <div class="fixed top-0 left-0 z-10 w-full py-5 flex justify-center bg-white shadow-sm	">
      <div class="container">
        <n-input class="" v-model:value="questionValue" type="textarea" placeholder="请输入" :autosize="{minRows: 1}" @keydown="handleKeydown">
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
    <div class="w-full mt-20 h-[1000px] bg-light-100 flex justify-center">
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
