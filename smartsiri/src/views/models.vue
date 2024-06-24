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
            <div style="color:#555"> 睁开眼睛
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
        case "大聪明":
            // v1.6.16
            // window.open('https://www.icloud.com/shortcuts/7269ebd49eca455296fbb9adbaec32f7')
            // v1.6.19
            // window.open('https://www.icloud.com/shortcuts/67b9d2d497ac4dd08612ac48e6db2686')
            window.open('https://www.icloud.com/shortcuts/b2756ceeb84141f1bbb667c880490f7e')
            return
        case "冲浪健将":
            // v1.6.16
            // window.open('https://www.icloud.com/shortcuts/027319f45b4e47eaba987db5720e84ff')
            // v1.6.19
            // window.open('https://www.icloud.com/shortcuts/eb2e9323839649ae929341a80dd981c4')
            window.open('https://www.icloud.com/shortcuts/a061209010dd4d89ac21f6467f7e5e66')
            return
        case "解读屏幕":
            // v1.6.16
            // window.open('https://www.icloud.com/shortcuts/bb44142308114f97b592b7e7a86f43fa')
            // v1.6.19
            // window.open('https://www.icloud.com/shortcuts/7b42babb946e4c0cb69fbf3ae95b6fac')
            window.open('https://www.icloud.com/shortcuts/1686f8927ab940b793b06275b69ad1a1')
            return;
        case "长眼睛":
            // v1.6.16
            // window.open('https://www.icloud.com/shortcuts/22d53b7abf974bae87d997c1458aa15b')
            // v1.6.19
            // window.open('https://www.icloud.com/shortcuts/22965e1cfb2849afb0ba4ebfdf1af73f')
            window.open('https://www.icloud.com/shortcuts/27e32b4fa6794712bcb9211c036b1d89')
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