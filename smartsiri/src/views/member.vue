<template>
    <div class="p-4">

        <h1 class="text-xl mt-4"> SmartSiri 会员介绍</h1>
        <div class="mt-2">
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:#aaa"> 体验会员
                    <el-tag type="warning" size="normal" effect="plain">
                        首次注册免费赠送
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 首次注册系统赠送</li>
                    <li> 可使用文本模型：3次，图片模型：2次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:blue"> 基础会员
                    <el-tag type="warning" size="normal" effect="plain">
                        9.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 仅可使用文字版大聪明</li>
                    <li> 可使用文本模型：30次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:purple"> 中级会员
                    <el-tag type="warning" size="normal" effect="plain">
                        19.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 仅可使用文字版大聪明</li>
                    <li> 可使用文本模型：50次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:gold"> 高级会员
                    <el-tag type="warning" size="normal" effect="plain">
                        39.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 可使用文字版大聪明 + 联网版冲浪手 + 长眼睛Siri + 读屏幕</li>
                    <li> 可使用文本模型：80次，图片模型：30次</li>
                </div>
            </el-card>
            <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
                <div style="color:red"> 至尊会员
                    <el-tag type="warning" size="normal" effect="plain">
                        99.9元/月
                    </el-tag>
                </div>
                <div class="mt-2">
                    <li> 可使用所有模型 + 可定制知识库 </li>
                    <li> 可使用文本模型：999次，图片模型：299次</li>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
const gotoCharge = () => {
    window.location.href = 'http://aa.nsjiasu.com/links/52BC32A5'
}
</script>