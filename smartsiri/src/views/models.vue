<template>
    <div class="p-4">
        <div class="mt-4 text-xl">
            SmartSiri 模型下载
        </div>
        <div>
            <div class="mt-2 text-l">如何使用？
                <a href="/#/me" class="link">
                    点此查看
                </a>
            </div>
        </div>
        <div class="mt-2 text-l">模型列表：</div>

        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('大聪明')">
            <div style="color:#555"> 大聪明
                <el-tag type="warning" effect="plain">
                    文本模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>基础款文本模型，可以聊天，无联网功能</li>
                <li>应用：基础聊天，基础问答</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('大聪明')">前往下载</el-button>

        </el-card>

        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('冲浪健将')">
            <div style="color:#555"> 冲浪健将
                <el-tag type="warning" effect="plain">
                    文本模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>升级款文字模型，会上网的大聪明</li>
                <li>应用：联网搜索，智能问答</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('冲浪健将')">前往下载</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('长眼睛')">
            <div style="color:#555"> 长眼睛
                <el-tag type="warning" effect="plain">
                    视觉模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>可以使用后置摄像头拍照进行对话</li>
                <li>应用：识别物体，解读报告，翻译文稿，辅助解题等</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('长眼睛')">前往下载</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('解读屏幕')">
            <div style="color:#555"> 解读屏幕
                <el-tag type="warning" effect="plain">
                    视觉模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>可以获取当前屏幕上的信息和分析能力</li>
                <li>应用：辅助做题、文章翻译、辅助游戏等</li>
            </div>
            <el-button class="mt-4" type="success">前往下载</el-button>
        </el-card>
        <el-card class="mt-4" shadow="always" :body-style="{ padding: '20px' }" @click.native="gotoEnModel">
            <div>
                <span>英文版模型</span>
            </div>
            Click here to download the English Models
        </el-card>

        <qrcode />

    </div>
</template>

<script setup>
import qrcode from './qrcode.vue'
const download = (name) => {
    switch (name) {
        case "大聪明": // v1.2
            window.open('https://www.icloud.com/shortcuts/d574496204734eb4901ba2e1439b3595')
            return
        case "冲浪健将":// v1.2
            window.open('https://www.icloud.com/shortcuts/0cc4c7c3735c4b16bc5a97693cbe2797')
            return
        case "解读屏幕": // v1.1
            window.open('https://www.icloud.com/shortcuts/b7d1ed9ce41547c09c8eddad1e4828a2')
            return;
        case "长眼睛": // v1.1
            window.open('https://www.icloud.com/shortcuts/466fa1e7db8b40c694b026c415a7e0b5')
            return
    }
};
const gotoEnModel = () => {
    window.open('/#/models_en')
    // this.$router.push("/models_en");
}
</script>
<style scoped>
li {
    font-size: 0.7rem;
    color: #aaa;
}

.el-tag {
    float: right;
}
</style>