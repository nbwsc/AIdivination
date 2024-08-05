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
            <div style="color:#555"> 基础指令
                <el-tag type="warning" effect="plain">
                    必须安装；请勿改名
                </el-tag>
            </div>
            <div class="mt-4">
                <li>基础指令提供基础用户鉴权</li>
                <li>用途：被其他指令引用、快捷下载其他指令</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('基础指令')">前往下载</el-button>

        </el-card>

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
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('睁开眼睛')">
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

        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('魔术相机')">
            <div style="color:#555"> 魔术相机
                <el-tag type="warning" effect="plain">
                    图片模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>拍一张照片然后“duang”一下变魔术</li>
                <li>可以拍照变成漫画风、赛博朋克、粘土化等风格</li>
            </div>
            <el-button class="mt-4" type="success">前往下载</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('添加日程')">
            <div style="color:#555"> 添加日程
                <el-tag type="warning" effect="plain">
                    图片模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>将你屏幕上的日程信息自动识别并添加到系统日历</li>
                <li>聊天内容中的计划事项、线上会议、车票机票、电影演出票据等都支持</li>
            </div>
            <el-button class="mt-4" type="success">前往下载</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('收藏助手')">
            <div style="color:#555"> 收藏助手
                <el-tag type="warning" effect="plain">
                    文字模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>跨平台的文章收藏方案，形成摘要并存入个人知识库</li>
                <li>支持公众号、微博、小红书、知乎等各种平台的文章</li>
            </div>
            <el-button class="mt-4" type="success">前往下载</el-button>
        </el-card>

        <qrcode />

    </div>
</template>

<script setup>
import qrcode from './qrcode.vue'
const download = (name) => {
    switch (name) {
        case "基础指令":
            window.open('https://www.icloud.com/shortcuts/af5730c6c6084e6dac6b4b22ca0bd2f6')
            return;
        case "大聪明":
            // v1.7.31
            window.open('https://www.icloud.com/shortcuts/d2c50b4d3bdf40db9710d9d479d193d4')
            return
        case "冲浪健将":
            window.open('https://www.icloud.com/shortcuts/7c8a896c00c64136af0e9829987c8251')
            return
        case "解读屏幕":
            window.open('https://www.icloud.com/shortcuts/40f2ccd55bd447c4b033a403754d7d9a')
            return;
        case "睁开眼睛":
            window.open('https://www.icloud.com/shortcuts/65cdd234e3f64477b098d1efa987205c')
            return
        case "魔术相机":
            window.open('https://www.icloud.com/shortcuts/f0f5267375f3484cbcb4eae8269ae349')
            return
        case "添加日程":
            window.open('https://www.icloud.com/shortcuts/6786e0305c4b4b14acc44914a7c51cab')
            return;
        case "收藏助手":
            window.open("https://www.icloud.com/shortcuts/1edcdb34c37c4da19eb93334516a4fb8")
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