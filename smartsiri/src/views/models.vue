<template>
    <div class="p-4">
        <div class="mt-4 text-xl">
            SmartSiri 模型下载
        </div>
        <div>
            <div class="mt-2 text-l">使用方法：</div>
            <li>点击下列模型中进行快捷方式安装</li>
            <li>将
                <a class="link underline" href="/me">
                    会员管理页
                </a>
                中复制 AccessKey
            </li>
            <li>进入快捷指令，编辑下载到的模型</li>
            <li>将 AccessKey 粘贴覆盖到模型的“文本”中</li>
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
                <li>升级款文字模型，可以聊天+联网搜索信息</li>
                <li>应用：基础聊天，基础问答</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('冲浪健将')">前往下载</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('长眼睛')">
            <div style="color:#555"> 长眼睛
                <el-tag type="warning" effect="plain">
                    图片模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>可以使用摄像头拍照能力进行聊天</li>
                <li>应用：搜索最新新闻/天气/资讯和更多网络信息</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('长眼睛')">前往下载</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('解读屏幕')">
            <div style="color:#555"> 解读屏幕
                <el-tag type="warning" effect="plain">
                    图片模型
                </el-tag>
            </div>
            <div class="mt-4">
                <li>可以获取屏幕上的信息和分析能力</li>
                <li>应用：辅助做题、新闻资讯翻译、辅助游戏等</li>
            </div>
            <el-button class="mt-4" type="success">前往下载</el-button>
        </el-card>
    </div>
</template>

<script setup>
const download = (name) => {
    switch (name) {
        case "大聪明":
            window.open('https://www.icloud.com/shortcuts/97ebc87e0649411ca7e27c3df68577f1')
            return
        case "冲浪健将":
            window.open('https://www.icloud.com/shortcuts/2e58efc68fd74df2a508dfb1f98285a4')
            return
        case "解读屏幕":
            window.open('https://www.icloud.com/shortcuts/8faf657698624a68bddfeeae97643899')
            return;
        case "长眼睛":
            window.open('https://www.icloud.com/shortcuts/065efbfc9ca94bfbb8e444d175bdaade')
            return
    }
};
</script>
<style scoped>
li {
    font-size: 0.7rem;
    color: #aaa;
}
</style>