<template>
    <div>
        <h1>Chat</h1>
        <div class="chatpanel">
            <div v-for="(item, index) in history" :key="index">
                <ChatBubble :chat="item.chat" :type="item.type" :createdAt="item.createdAt"></ChatBubble>
            </div>
        </div>
        <h1 v-if="isShare" style="color:#aaa;text-align: center;font-size: 42px;padding-top: 40px;">【分享模式】</h1> 
        <div class="inputpanel" v-if="!isShare">
            <el-input type="textarea" :rows="2" v-model="message" placeholder="请输入你想说的话" :maxlength="-1"
                :show-word-limit="false">
            </el-input>
            <el-button type="primary" size="default" @click="sendMessage">发送</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, Ref } from 'vue'
import axios from 'axios';

import ChatBubble from './ChatBubble.vue';
import { ElMessage } from 'element-plus';
const message = ref('')
const history: Ref<any[]> = ref([])
let charactorId

const route = useRoute()
const isShare = route.query.share === 'true'
onMounted(() => {
    // get history
    if (!route.query.id) {
        return ElMessage('参数错误！')
    }
    charactorId = route.query.id as string
    getHistory()
})

async function getHistory() {
    const r = await axios.post('http://leapcapital.cn:8099/CyberResurrection/getChatHistory', {
        characterId: charactorId
    })
    history.value = r.data.data.map(e => { e.createdAt = now(e.createdAt); return e })
    moveBottom()
}

function pushHistory(chat: string, type: string) {
    history.value.push({
        chat,
        type,
        createdAt: now()
    })
    // chatpanel move to bottom
    moveBottom()

}

function moveBottom() {
    setTimeout(() => {
        const chatpanel = document.querySelector('.chatpanel')
        console.log(chatpanel)
        if (!chatpanel) return
        chatpanel.scrollTop = chatpanel.scrollHeight
    }, 1);
}

async function sendMessage() {
    const chat = message.value
    message.value = ''
    pushHistory(chat, 'User')
    const r = await axios.post('http://leapcapital.cn:8099/CyberResurrection/chat', {
        accountId: "test",
        characterId: charactorId,
        chat
    })
    if (r.data.code === 0) {
        const chat = r.data.data
        pushHistory(chat, 'Charactor')
    } else {
        ElMessage('抱歉出错了！请稍后重试')
    }
}

function now(t?: string) {
    // return HH:mm
    const date = t ? new Date(t) : new Date()
    return `${date.getHours()}:${date.getMinutes()}`
}
</script>
<style lang="css">
.inputpanel {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 35vh;
    width: 100vw;
    padding: 20px 5%;
    text-align: center
}

.chatpanel {
    height: 65vh;
    width: 80vw;
    margin-left: 10%;
    overflow-y: scroll;
    padding: 20px 5%;
}

.el-textarea__inner {
    margin-bottom: 8px;
    line-height: 42px;
    height: auto;
    background-color: #0000;
    font-size: 18px;
    color: #aaa
}

.el-button {
    margin: 8px;
    margin-top: 32px;
    height: 42px;
    font-size: 18px;
    width: 80%;
    background-color: #0000;
    border: 1px solid #fff;
    border-radius: 21px;
}
</style>