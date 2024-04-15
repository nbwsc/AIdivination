<template>
    <div class="discover">
        <h1 class="text-4xl  mt-16">Discover The Best AI Tools & Websites</h1>
        <h2 class="text-xl mt-8">
            <span style="color:#cf4343">
                12,{{ aicount }}
            </span>
            AIs and
            <span style="color:#cf4343">
                143
            </span>
            categories in the best AI tools directory.
        </h2>
        <div class="text-xl mt-8"> AI tools list are updated daily</div>
        <el-input class="searchinput" v-model="search" placeholder="Search for tools" @change="onSearch"></el-input>
        <div class="flex flex-wrap justify-center max-w-7xl m-auto">
            <toolcard class="m-8" v-for="tool in toolsToShow" :tool="tool" :key="tool.id"></toolcard>
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
                Copyright © 2024 Toolss.ai & All rights reserved.
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import toolsjson from './tools.json'
import toolcard from './toolcard.vue';
const toolsToShow = ref([])
let showLimit = 20
const search = ref('')
const aicount = ref(435)


function onSearch() {
    showLimit = 20
    toolsToShow.value = toolsjson.filter(tool => tool.name.toLowerCase().includes(search.value.toLowerCase()) || tool.task.toLowerCase().includes(search.value.toLowerCase())).slice(0, showLimit)
}

onMounted(() => {
    const localCount = window.localStorage.getItem('aicount')
    if (localCount) {
        aicount.value = +localCount
    }
    setTimeout(() => {
        aicount.value += 1
        window.localStorage.setItem('aicount', aicount.value)
    }, 8456);

    toolsToShow.value = toolsjson.slice(0, showLimit)
})

function loadMore() {
    toolsToShow.value = toolsjson.slice(0, toolsToShow.value.length + showLimit)
}


</script>
<style lang="css" scoped>
.discover {
    font-size: 30px;
    font-weight: bold;
    color: #f5f5f5;
    text-align: center;
    padding: 60px;
}

.el-input__wrapper {
    width: 50%;
    margin: 0 auto;
}

.searchinput {
    width: 60%;
    height: 60px;
    font-size: 32px;
    line-height: 60px;
    margin: 24px;
}
</style>