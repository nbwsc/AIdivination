<template>
    <div class="p-4">
        <h1 class="text-2xl m-auto">SmartSiri 个人管理</h1>

        <div class="mt-4">
            手机号：
            <span class="link">
                {{ userinfo.phone }}
            </span>
        </div>


        <div class="mt-4">
            会员类型：
            <a class="link" @click="gotoCharge">
                {{ memberName }}
            </a>
        </div>
        <div class="text-l">
            到期时间：
            <span class="link" :class="{ 'color-red': expiredTxt === '已过期' }" @click="gotoCharge">
                {{ expiredTxt }}
            </span>
            <span v-if="expiredTxt !== '已过期'" @click="gotoCharge" class="link underline"> > 点我续费</span>
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
        <div>
            <span @click="gotoCharge" class="link underline"> > 点我充值</span>
        </div>
        <div class="mt-8">
            AccessKey
            <el-icon class="link underline" @click="copyAK" style="font-size: 1rem;">
                <CopyDocument />
            </el-icon>
        </div>
        <pre><code>{{ userinfo.accesskey }}</code></pre>

        <div class="mt-4">如何使用？</div>
        <div class="link underline mt-2" @click="copyAK">1. 点击复制AccessKey</div>
        <div class="link underline mt-2">
            <a href="/#/models">2. 下载你想要的模型</a>
        </div>
        <div class=" mt-2">3. 安装模型，根据提示粘贴 AccessKey</div>
        <div class="mt-2">4. 可以将指令换成你喜欢的名字（可选）</div>
        <div class="mt-2">5. 使用 hey siri 唤醒，说出指令名字：比如“长眼睛模式”，在提示语音后输入你想问的问题并且拍照，然后耐心等待服务器返回即可。</div>

        <qrcode />
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import { CopyDocument } from '@element-plus/icons-vue'
import qrcode from './qrcode.vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter()

const gotoCharge = () => {
    router.push('/member')
    // ElMessage('产品内测中，请添加客服为微信好友：smartsiri2024。申请请注明：siri')
    // window.location.href = 'https://aa.nsjiasu.com/links/52BC32A5'
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
    console.log(ls < now - 360000000)
    if (ls < now - 360000000) {// 超过100h 返回登陆
        window.location.href = '/#/login'
        // this.$emit("login");
    }
    userId = window.localStorage.getItem("userId").replace(/"/g, '')
    if (window.userinfo) {
        userinfo.value = window.userinfo
    } else if (userId) {
        axios({
            url: "/aiapi/smartsiri/info",
            method: "POST",
            data: { userId },
        })
            .then((data) => {
                userinfo.value = data.data.data
            })
    }
})
const copyAK = () => {
    window.copyToClikpboard(userinfo.value.accesskey)
}

const checkCard = () => {
    if (!card.value) {
        return ElMessage('请输入卡号')
    }
    axios({
        url: "/aiapi/smartsiri/checkCard",
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