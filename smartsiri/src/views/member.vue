<template>
    <div class="p-4">

        <h1 class="text-xl mt-4"> SmartSiri 会员介绍</h1>

        <div class="mt-2">
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:#aaa"> 体验会员
                    <el-tag type="warning" effect="plain">
                        首次注册免费赠送
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 首次注册系统赠送</li>
                    <li> 文本模型：20次，图片模型：10次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:blue"> 基础会员
                    <el-tag type="warning" effect="plain">
                        9.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 仅文字版模型</li>
                    <li> 文本模型：30次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:purple"> 中级会员
                    <el-tag type="warning" effect="plain">
                        19.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 文本模型和图片模型</li>
                    <li> 文本模型：50次，图片模型：20次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:gold"> 高级会员
                    <el-tag type="warning" effect="plain">
                        39.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 文本模型和图片模型</li>
                    <li> 文本模型：200次，图片模型：60次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:red"> 至尊会员
                    <el-tag type="warning" effect="plain">
                        59.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 所有模型 + 可定制知识库（暂未上线） </li>
                    <li> 文本模型：999次，图片模型：299次</li>
                </div>
            </el-card>

            <qrcode />

        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import qrcode from './qrcode.vue'

const gotoCharge = () => {
    ElMessage('产品内测中，请添加客服为微信好友：smartsiri2024。申请请注明：siri')
    // window.location.href = 'http://aa.nsjiasu.com/links/52BC32A5'
}
</script>
<style scoped>
.el-tag {
    float: right
}
</style>