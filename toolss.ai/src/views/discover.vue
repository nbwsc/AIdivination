<template>
    <div class="discover">
        <h1 class="text-4xl  mt-16">Discover The Best AI Tools & Websites</h1>
        <h2 class="text-xl mt-8">
            <span style="color:#cf4343">
                12,{{ aicount }}
            </span>
            AI tools and
            <span style="color:#cf4343">
                143
            </span>
            categories in the best AI tools directory.
        </h2>
        <div class="text-xl mt-8"> Daily update of AI tool list</div>
        <el-input class="searchinput" v-model="search" placeholder="Search for tools" @change="onSearch"></el-input>
        <div class="flex flex-wrap justify-center m-auto max-w-screen-2xl">
            <toolcard class="m-8" v-for="tool in toolsToShow" :tool="tool" :search="search" :key="tool.id"></toolcard>
        </div>
        <el-button v-if="!search" type="text" @click="loadMore">
            <div class="text-white underline">
                Load More ...
            </div>
        </el-button>

        <div class="text-sm mt-16 mb-16">
            <a class="cursor-pointer underline" href="mailto:support@toolss.ai">
                EMAIL US：support@toolss.ai
            </a>
            <div>
                <RouterLink class="text-lm " to="/terms">Terms of Service </RouterLink>
                <span>
                    |
                </span>
                <RouterLink class="text-lm " to="/privacy"> Privacy Policy</RouterLink>
            </div>
            <div>
                Copyright © 2024 toolss.ai & All rights reserved.
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import toolcard from './card-small.vue';

const toolsToShow = ref([])
const search = ref('')
const aicount = ref(435)
let allTools = []
let newDate = ''
watch(search, () => {
    onSearch()
})

let showLimit = 20



function onSearch() {
    showLimit = 20
    toolsToShow.value = allTools.filter(tool => tool.name.toLowerCase().includes(search.value.toLowerCase()) || tool.task.toLowerCase().includes(search.value.toLowerCase())).slice(0, showLimit)
}

onMounted(async () => {
    let json
    try {
        const response = await fetch("https://www.toolss.ai/tools.json");
        json = await response.json();
    } catch (e) {
        json =
            [
                {
                    "logo": "https://media.theresanaiforthat.com/icons/mymemo.svg?height=207",
                    "name": "MyMemo",
                    "task": "Knowledge management",
                    "url": "https://www.mymemo.ai/?ref=toolss&utm_source=toolss&utm_medium=referral",
                    "uploadAt": "2024-04-18",
                    "desc": "MyMemo is an AI-powered platform that helps you organize, analyze, and retrieve your personal digital knowledge effortlessly."
                }
            ]
    }
    newDate = json[0].uploadAt
    allTools = json.map(tool => {
        if (tool.uploadAt === newDate) {
            tool.isNew = true
        }
        return tool
    })

    const localCount = window.localStorage.getItem('aicount')
    if (localCount) {
        aicount.value = +localCount
    }
    setTimeout(() => {
        aicount.value += 1
        window.localStorage.setItem('aicount', aicount.value)
    }, 8456);

    toolsToShow.value = allTools.slice(0, showLimit)
})

function loadMore() {
    toolsToShow.value = allTools.slice(0, toolsToShow.value.length + showLimit)
}


</script>
<style lang="css" scoped>
.discover {
    font-size: 30px;
    font-weight: bold;
    color: #f5f5f5;
    text-align: center;
    padding: 60px 0rem;
}

.el-input__wrapper {
    width: 50%;
    margin: 0 auto;
}

.searchinput {
    width: 80%;
    max-width: 800px;
    height: 60px;
    font-size: 32px;
    line-height: 60px;
    margin: 32px;
}
</style>