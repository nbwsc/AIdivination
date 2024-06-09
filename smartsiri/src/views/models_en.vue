<template>
    <div class="p-4">
        <div class="mt-4 text-xl">
            SmartSiri Shortcut Download
        </div>
        <div>
            <div class="mt-2 text-l">Instructions:</div>
            <li>Click on the following model to install the shortcut</li>
            <li>Get AccessKey from
                <a class="link underline" href="/me">
                    Member management
                </a>
            </li>
            <li>Install shortcut command and enter AccessKey</li>
        </div>
        <div class="mt-2 text-l">Shortcut List：</div>

        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('大聪明')">
            <div style="color:#555"> GPT Mode
                <el-tag type="warning" effect="plain">
                    Text Model
                </el-tag>
            </div>
            <div class="mt-4">
                <li>Basic text model, can chat, no networking function</li>
                <li>Application: Basic chat, basic question and answer</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('大聪明')">Download</el-button>

        </el-card>

        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('冲浪健将')">
            <div style="color:#555"> Search Mode
                <el-tag type="warning" effect="plain">
                    Text Model
                </el-tag>
            </div>
            <div class="mt-4">
                <li>Upgraded text model, can chat + search for information online</li>
                <li>Application: Basic chat, basic question and answer</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('冲浪健将')">Download</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('长眼睛')">
            <div style="color:#555"> Eye Mode
                <el-tag type="warning" effect="plain">
                    Vision Model
                </el-tag>
            </div>
            <div class="mt-4">
                <li>You can use the camera to take pictures and chat</li>
                <li>Applications: object recognition, report interpretation, document translation, education</li>
            </div>
            <el-button class="mt-4" type="success" @click="download('长眼睛')">Download</el-button>
        </el-card>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="download('解读屏幕')">
            <div style="color:#555"> Read the screen
                <el-tag type="warning" effect="plain">
                    Vision Model
                </el-tag>
            </div>
            <div class="mt-4">
                <li>Access to on-screen information and analytical capabilities</li>
                <li>Application: Assisting with test-taking, news information translation, assisting with games, etc.
                </li>
            </div>
            <el-button class="mt-4" type="success">Download</el-button>
        </el-card>

        <el-card class="mt-4" shadow="always" :body-style="{ padding: '20px' }" @click="gotocnModel">
            <div>
                <span>中文版模型请点此处下载</span>
            </div>
            Click here to download the Chinese Shortcuts
        </el-card>
    </div>
</template>

<script setup>
const download = (name) => {
    switch (name) {
        case "大聪明": // v1.1
            window.open('https://www.icloud.com/shortcuts/1d8e491dc5874549990533b4f28e9c1c')
            return
        case "冲浪健将":// v1.1
            window.open('https://www.icloud.com/shortcuts/f7640319c71847838e41751c35047c0e')
            return
        case "解读屏幕": // v1.1
            window.open('https://www.icloud.com/shortcuts/6d471858f3f6407fb930016712ec5476')
            return;
        case "长眼睛": // v1.1
            window.open('https://www.icloud.com/shortcuts/21d44491983b46deba0f0399b30b48fd')
            return
    }
};
const gotocnModel = () => {
    this.$router.push("/models");
}
</script>
<style scoped>
li {
    font-size: 0.7rem;
    color: #aaa;
}
</style>