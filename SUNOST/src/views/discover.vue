<template>
    <div class="discover">
        <h1 class="text-4xl mt-24">
            Sunost's Royalty-Free Background Music Library
        </h1>
        <h2 class="text-2xl mt-16">
            Enhance Your
            <span style="display:inline-block;width:6rem;color: rgb(236, 65, 65);" class="text-2xl">
                {{ artOptions[art] }}
            </span>
            with Sunost's Free Background Music

        </h2>
        <div class="text-xl mt-8">
            Unleash Creativity with Sunost's Copyright-Friendly Tracks
        </div>

        <el-input class="searchinput" v-model="search" placeholder="Search by title or tag..." @change="fetchData"
            clearable></el-input>
        <div>
            <span class="text-xl">Try these: </span>
            <el-tag class="m-2" type="danger" v-for="rf in recommandFilter " :key="rf"
                @click="search = rf; fetchData()">{{ rf
                }}</el-tag>
        </div>
        <div class="flex text-base mt-8 ">
            <div class="w-32 cursor-pointer" :class="{ 'underline': sort === 'playCount' }"
                @click="sort = 'playCount'; fetchData()">Most popular </div>
            <div class="w-32 cursor-pointer" :class="{ 'underline': sort === 'createdAt' }"
                @click="sort = 'createdAt'; fetchData()"> What's
                new
            </div>
        </div>


        <div class="mt-8 flex flex-wrap justify-center">
            <Card v-for="(ost, index) in osts" :key="index" :ost="ost" @playclick="$emit('playclick', ost)"></Card>
        </div>
        <div class="text-sm mt-16 mb-16">
            <a href="mailto:sunost@leapcapital.cn">
                EMAIL US：support@sunost.com
            </a>
            <div>
                <RouterLink class="text-lm " to="/terms">Terms of Service </RouterLink>
                <span>
                    |
                </span>
                <RouterLink class="text-lm " to="/privacy"> Privacy Policy</RouterLink>
            </div>
            <div>
                Copyright © 2024 SUNOST. All rights reserved.
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import tags from './tags.js'
import axios from 'axios'
import { ElMessage } from "element-plus/es";
import Card from './card.vue'
const art = ref(0);
const search = ref('')

const artOptions = ['Game', 'Movie', 'Anime', 'Video', 'Audio']
const recommandFilter = getRandomItemsFromArray([].concat(tags.emotionTagOptions, tags.styleTagOptions, tags.sceneTagOptions).map(e => e.tag), 5)
const sort = ref('playCount')
function getRandomItemsFromArray(array, n) {
    // 创建一个新数组，用于存放随机挑选的项目
    const result = [];

    // 确保 n 不超过数组的长度
    n = Math.min(n, array.length);

    // 从原数组中随机选择项目，并加入新数组中
    for (let i = 0; i < n; i++) {
        // 生成一个随机索引
        const randomIndex = Math.floor(Math.random() * array.length);
        // 将对应的元素加入结果数组
        result.push(array[randomIndex]);
        // 从原数组中移除已经选择的项目，避免重复选择
        array.splice(randomIndex, 1);
    }

    return result;
}

setInterval(() => {
    if (art.value >= artOptions.length - 1) {
        art.value = 0;
    } else {
        art.value += 1;
    }
}, 2000);

const osts = ref([])

onMounted(() => {
    fetchData()
    // set html title for this page
    document.title = 'Discover - Sunost - Free Background Music for Games and Films'
})

async function fetchData() {
    const r = await axios.get('/sunost/fetchData', {
        params: {
            search: search.value,
            sort: sort.value
        }
    })
    osts.value = r.data.data.list
}

function contact() {
    // ElMessage({
    //     message: '先等等联系吧，还没开发完',
    //     type: 'info'
    // });
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

.searchinput {
    width: 80%;
    max-width: 800px;
    height: 60px;
    font-size: 26px;
    line-height: 60px;
    margin: 32px;
}

.el-input__suffix svg {
    width: 32px;
    height: 32px;
}
</style>