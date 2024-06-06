<template>
    <div class="p-4">
        <h1 class="text-2xl m-auto">SmartSiri 会员管理</h1>

        <div class="mt-4">
            手机号：
            <span class="link" href="/#/member">
                {{ userinfo.phone }}
            </span>
        </div>
        <div>AccessKey</div>
        <pre><code>
{{ userinfo.accesskey }}
        </code></pre>
        <el-icon class="link underline" @click="copyAK" style="font-size: 1.5rem;">
            <CopyDocument />
        </el-icon>
        <span class="link underline" @click="copyAK">点击复制</span>

        <div class="mt-4">
            会员类型：
            <a class="link" href="/#/member">
                {{ memberName }}
            </a>
            <a class="text-l underline link mt-2" href="/#/member"> 会员介绍 </a>
        </div>
        <div class="text-l">
            到期时间：
            <span class="link" :class="{ 'color-red': expiredTxt === '已过期' }" @click="gotoCharge">
                {{ expiredTxt }}
            </span>
        </div>
        <div class="mt-4 text-l">
            文本模型对话余额：
            <span class="link " @click="gotoCharge">
                {{ userinfo.modelCredit[0] }}轮
            </span>
        </div>
        <div class="text-l">
            图片模型对话余额：
            <span class="link " @click="gotoCharge">
                {{ userinfo.modelCredit[1] }}轮
            </span>
        </div>

        <div class="text-l underline link mt-">
            <a href="/#/models">模型介绍/模型下载</a>
        </div>

        <div class="mt-4">
            <div class="text-xl">
                充值流程：
            </div>
            <div class="text-l ">
                1. 前往 <a class="underline link text-xl mt-2" href="http://aa.nsjiasu.com/links/52BC32A5">购买会员卡</a>
            </div>

            <div class="text-l ">
                2. 选择会员类型并支付获得卡号（注：这里仅需要卡号）
            </div>
            <div class="text-l ">
                3. 将卡号复制并返回本页面粘贴输入卡号，点击充值
            </div>
        </div>


        <div class="text-xl mt-6">
            <el-input v-model="card" placeholder="输入卡号" size="normal" clearable></el-input>
            <div class="text-2xl mt-2 underline link" @click="checkCard">充值</div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import { CopyDocument } from '@element-plus/icons-vue'
import axios from 'axios';
const gotoCharge = () => {
    window.location.href = 'https://aa.nsjiasu.com/links/52BC32A5'
}
const card = ref('')
let userId = ''

const userinfo = ref({ modelCredit: [0, 0] })
const memberName = computed(() => {
    if (userinfo.value.level == 0) {
        return '体验会员'
    } else if (userinfo.value.level == 1) {
        return '基础会员'
    } else if (userinfo.value.level == 2) {
        return '中级会员'
    } else if (userinfo.value.level == 3) {
        return '高级会员'
    } else if (userinfo.value.level == 4) {
        return '至尊会员'
    } else {
        return '???'
    }
})

const expiredTxt = computed(() => {
    if (userinfo.value.expiredAt && new Date() < new Date(userinfo.value.expiredAt)) {
        return new Date(userinfo.value.expiredAt).toLocaleString()
    } else {
        return '已过期'
    }
})
onMounted(() => {
    const ls = +window.localStorage.getItem("smartsirilogints");
    const now = new Date().getTime();
    if (ls < now - 36000000) {// 超过10h 返回登陆
        this.$router.push("/login");
        // this.$emit("login");
    }
    userId = window.localStorage.getItem("userId").replace(/"/g, '')
    if (window.userinfo) {
        userinfo.value = window.userinfo
    } else if (userId) {
        axios({
            url: "/smartsiri/info",
            method: "POST",
            data: { userId },
        })
            .then((data) => {
                userinfo.value = data.data.data
            })
    }

})
const copyAK = () => {
    navigator.clipboard.writeText(userinfo.value.accesskey)
    ElMessage('已复制AccessKey到剪贴板')
}

const checkCard = () => {
    if (!card.value) {
        return ElMessage('请输入卡号')
    }
    axios({
        url: "/smartsiri/checkCard",
        method: "POST",
        data: { userId, card: card.value },
    })
        .then((data) => {
            if (data.data.code !== 0) {
                return ElMessage({
                    message: data.data.msg,
                    type: "error",
                });
            }
            userinfo.value = data.data.data
        }).catch(err => {
            console.log(err)
            ElMessage({
                message: "网络错误",
                type: 'error',
            });
        })


}
</script>
<style>
pre {
    background-color: #2d143b;
    overflow: auto;
    font-family: 'Monaco', monospace;
    padding: 0 1em;
    overflow: hidden;
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

.color-red {
    color: red;
}
</style>