<template>
    <div class="p-4">
        <h1 class="text-2xl m-auto">SmartSiri 会员管理</h1>

        <div class="mt-4">
            当前手机号：
            <a class="link" href="/#/member">
                {{ userinfo.phone }}
            </a>
        </div>
        <div>AccessKey</div>
        <pre><code>
{{ userinfo.accesskey }}
        </code></pre>
        <el-icon @click="copyAK" style="font-size: 1.5rem;">
            <CopyDocument />
        </el-icon>
        <span @click="copyAK">点击复制</span>

        <div class="">
            会员类型：
            <a class="link" href="/#/member">
                体验会员
            </a>
            <a class="text-l underline link mt-2" href="/#/member"> 会员介绍 </a>
        </div>
        <div class="mt">
            到期时间：
            <span class="link" @click="gotoCharge">
                2024-06-12
            </span>
        </div>
        <div class="mt-4">
            文本模型对话余额：
            <span class="link underline" @click="gotoCharge">
                30
            </span>
        </div>
        <div>
            图片模型对话余额：
            <span class="link underline" @click="gotoCharge">
                30
            </span>
        </div>

        <div class="text-l underline link mt-">
            <a href="/#/instruction">模型介绍</a>
        </div>

        <div class="mt-4">
            <div class="text-xl">
                充值流程：
            </div>
            <div class="text-l ">
                1. 前往 <a class="underline link text-xl mt-2" href="http://aa.nsjiasu.com/links/52BC32A5">购买会员卡</a>
            </div>

            <div>
                2. 选择会员类型并支付获得卡号（注：这里仅需要卡号）
            </div>
            <div>
                3. 返回本页面输入卡号，点击充值
            </div>
        </div>


        <div class="text-xl mt-6">
            <el-input v-model="card" placeholder="输入卡号" size="normal" clearable></el-input>
            <div class="text-2xl mt-2 underline link">充值</div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import { CopyDocument } from '@element-plus/icons-vue'
const gotoCharge = () => {
    window.location.href = 'https://aa.nsjiasu.com/links/52BC32A5'
}
const card = ref('')
const userinfo = window.userinfo

const copyAK = () => {
    navigator.clipboard.writeText(userinfo.accesskey)
    ElMessage('已复制AccessKey到剪贴板')
}
</script>
<style>
pre {
    background-color: #2d143b;
    overflow: auto;
    font-family: 'Monaco', monospace;
    padding: 0 1em;
}



code {
    font-family: Monaco, monospace;
    font-size: 1rem;
    line-height: 100%;
    background-color: #200d5e;
    color: white;
    padding: 0.2em;
    letter-spacing: -0.05em;
    word-break: normal;
}



pre code {
    border: none;
    background: none;
    font-size: 0.875rem;
    line-height: 1em;
    letter-spacing: normal;
    word-break: break-all;
}
</style>