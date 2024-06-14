<template>
    <div class="mt-8 text-gray-500">
        <img class="w-32 m-auto" src="@/assets/qrcode.jpg" alt="myqrcode" @click="testpay">
        <div class="w-full mt-2 text-xs text-center">产品内测中</div>
        <div class="w-full mt-2 text-xs text-center">
            微信扫描二维码或搜索 “smartsiri2024” 添加客服进内测群
        </div>
        <div class="w-full mt-2 text-xs text-center" @click="copy('smartsiri2024')">
            <el-icon style="font-size: 1rem;">
                <CopyDocument />
            </el-icon>
            点击复制微信号
        </div>
    </div>
</template>
<script setup>
import { CopyDocument } from '@element-plus/icons-vue'
const copy = (txt) => {
    window.copyToClikpboard(txt)
}
async function testpay() {
    // const memberType = 9
    // const r = await axios({ url: '/aiapi/wechat/sirimemberorder', method: "post", data: { memberType, openid: window.wechatuserinfo.openid } })
    // boostPay(r.data.data).then((res) => {
    //     alert('done')
    // }).catch(e => {
    //     alert(e.toString())
    // })
}
</script>