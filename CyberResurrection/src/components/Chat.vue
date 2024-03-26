<template>
    <div>
        <h1>Chat</h1>
        <div class="chatpanel">

        </div>
        <div class="inputpanel">
            <el-input type="textarea" :rows="8" v-model="message" placeholder="输入对话点击“发送”或按回车键" :maxlength="-1"
                :show-word-limit="false">
            </el-input>
            <el-button type="primary" size="default" @click="sendMessage">发送</el-button>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { createRouter } from 'vue-router'

const message = ref('')
let charactorId = ''

onMounted(() => {
    // get history
    charactorId = ''
    getHistory()
})

async function getHistory() {

}

async function sendMessage() {

}
</script>