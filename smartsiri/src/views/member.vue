<template>
    <div class="p-4">

        <h1 class="text-xl mt-4"> SmartSiri 会员介绍</h1>

        <div class="mt-2">
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }">
                <div style="color:#aaa"> 体验会员
                    <el-tag type="warning" effect="plain">
                        首次注册免费赠送
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 首次注册系统赠送</li>
                    <li> 文本模型：30次，图片模型：20次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge(1)">
                <div style="color:blue"> 基础会员
                    <el-tag type="warning" effect="plain">
                        9.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 文本模型：60次</li>
                    <li> 图片模型：20次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge(2)">
                <div style="color:purple"> 中级会员
                    <el-tag type="warning" effect="plain">
                        19.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 文本模型：100次</li>
                    <li> 图片模型：40次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge(3)">
                <div style="color:gold"> 高级会员
                    <el-tag type="warning" effect="plain">
                        39.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 文本模型：400次</li>
                    <li> 图片模型：120次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge(4)">
                <div style="color:red"> 至尊会员
                    <el-tag type="warning" effect="plain">
                        59.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 文本模型：1999次</li>
                    <li> 图片模型：599次</li>
                </div>
            </el-card>
            <qrcode />

        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router';
import qrcode from './qrcode.vue'
import axios from 'axios'
import { boostPay } from '../wechat'

const router = useRouter()

const gotoCharge = async (memberType) => {
    const r = await axios({ url: '/aiapi/wechat/sirimemberorder', method: "post", data: { memberType, openid: window.wechatuserinfo.openid, userId: window.userinfo._id } })
    boostPay(r.data.data).then(() => {
        ElMessage({
            message: "支付成功",
            type: "success",
        });
        router.push('/me')
    })
}
// new window.VConsole();

</script>
<style scoped>
.el-tag {
    float: right
}
</style>