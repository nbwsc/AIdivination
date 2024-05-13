<template>
    <div class="chatbox">
        <h1>我的专属客服</h1>
        <div class="chatpanel">
            <div v-for="(item, index) in history" :key="index">
                <ChatBubble :chat="item.chat" :type="item.type" :createdAt="item.createdAt"></ChatBubble>
            </div>
        </div>
        <div class="inputpanel">
            <el-input type="textarea" :rows="2" v-model="message" placeholder="请输入" :maxlength="200" show-word-limit>
            </el-input>
            <el-button type="primary" size="default" :disabled="disabledApp" @click="sendMessage">发送</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, Ref } from 'vue'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ChatBubble from './ChatBubble.vue';
import { ElMessage } from 'element-plus';
const message = ref('')
const history: Ref<any[]> = ref([])
let accessKey
let uuid
let companyInfo
const route = useRoute()
const disabledApp = ref(true)
onMounted(async () => {
    // get history
    accessKey = route.query.accessKey
    if (!accessKey) {
        return ElMessage('缺少AccessKey')
    }
    uuid = window.localStorage.getItem('aics_uuid')
    if (!uuid) {
        uuid = uuidv4();
        window.localStorage.setItem('aics_uuid', uuid)
    }

    await checkAccessKey()
})

async function getHistory() {
    const r = await axios.post('aics/client/getChatHistory', {
        uuid, companyId: companyInfo._id
    })
    history.value = r.data.data.map(e => { e.createdAt = now(e.createdAt); return e })
    if (!history.value.length) {
        pushHistory('你好，我是你的专属客服，有什么可以帮助你的吗？', 'BOT')
    }
    moveBottom()
}

async function init() {
    await getHistory()
    setInterval(getHistory, 1000 * 5)
}

async function checkAccessKey() {
    const r = await axios.post('aics/client/checkAccessKey', {
        accessKey, uuid
    })
    if (r.data.code === 0) {
        disabledApp.value = false
        companyInfo = r.data.data
        // await getHistory()
        await init()
    } else {
        disabledApp.value = true
        ElMessage({
            message: 'AccessKey 验证失败',
            type: 'error',
        })
    }
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
    const r = await axios.post('/aics/client/chat', {
        uuid,
        companyId: companyInfo._id,
        chat
    })
    if (r.data.code === 0) {
        const chat = r.data.data
        pushHistory(chat, 'BOT')
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
    height: 35%;
    width: 100%;
    padding: 20px 5%;
    text-align: center
}

.chatpanel {
    height: 65%;
    width: 100%;
    overflow-y: scroll;
    padding: 8px;
}

.el-textarea__inner {
    margin-bottom: 8px;
    line-height: 42px;
    height: auto;
    background-color: #0000;
    font-size: 18px;
    color: #aaa
}

.chatbox {
    width: 300px;
    height: 500px;
    position: relative;
    border: 1px solid;
    padding: 8px;
}
</style>