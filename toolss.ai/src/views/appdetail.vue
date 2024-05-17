<template>
    <div class="mt-8 p-16">
        <div class="mt-8  max-w-5xl m-auto">
            <div class="flex relative">
                <img class="w-32 mr-4 cursor-pointer"
                    :src="app.logo || `https://dummyimage.com/300x300/656b72/ffffff.jpg&text=${app.name}`" alt="">
                <div class="w-1/2 m-8">
                    <div class="text-xl h-8 cursor-pointer text-white" @click="goto(app)">{{ app.name }}</div>
                    <el-tag class="text-l text-white" type="info" effect="dark">{{ app.task }}</el-tag>
                </div>
                <div class="text-white mt-8 ">
                    <div>

                        <el-button type="info" size="default" @click="visit(app)">
                            <div class="text-white ">
                                Visite
                            </div>
                        </el-button>
                        <el-button type="success" size="default" @click="onUpdated">
                            <div class="text-white">
                                {{ upvoteTxt }} 👍</div>
                        </el-button>
                    </div>
                    <div class="mt-2">
                        Collected At {{ app.uploadAt }}
                    </div>
                </div>

            </div>
            <div class="mt-8 text-white text-l">{{ app.desc }}</div>
            <iframe class="mt-8 w-full h-screen" :src="app.url" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const appname = route.params.appname
const app = ref({})

const upvoteTxt = ref('Upvote')
function onUpdated() {
    upvoteTxt.value = 'Upvoted'
}

onMounted(async () => {
    let json
    try {
        const datetime = new Date().toISOString().split('T')[0]
        const response = await fetch("https://www.toolss.ai/tools.json?v=" + datetime);
        json = await response.json();
    } catch (e) {
        json = [{
            "logo": "https://media.theresanaiforthat.com/icons/mymemo.svg?height=207",
            "name": "MyMemo",
            "task": "Knowledge management",
            "url": "https://www.mymemo.ai/?ref=toolss&utm_source=toolss&utm_medium=referral",
            "uploadAt": "2024-04-18",
            "desc": "MyMemo is an AI-powered platform that helps you organize, analyze, and retrieve your personal digital knowledge effortlessly."
        }, {
            "logo": "https://media.theresanaiforthat.com/icons/mymemo.svg?height=207",
            "name": "MyMemoSS",
            "task": "Knowledge management",
            "url": "https://www.mymemo.ai/?ref=toolss&utm_source=toolss&utm_medium=referral",
            "uploadAt": "2024-04-18",
            "sponsored": true,
            "desc": "MyMemo is an AI-powered platform that helps you organize, analyze, and retrieve your personal digital knowledge effortlessly."
        }, {
            "logo": "https://media.theresanaiforthat.com/icons/mymemo.svg?height=207",
            "name": "MyMemoxx",
            "task": "Knowledge management",
            "uploadAt": "2024-04-18",
            "url": "https://www.mymemo.ai/?ref=toolss&utm_source=toolss&utm_medium=referral",
            "desc": "MyMemo is an AI-powered platform that helps you organize, analyze, and retrieve your personal digital knowledge effortlessly."
        },]
    }
    app.value = json.find(e => e.name.toLowerCase() == appname)
    console.log(app.value)

})
function visit(app) {
    window.open(app.url)
}
</script>

<style scoped>
iframe {
    width: 100%;
    height: 1000px;
}
</style>