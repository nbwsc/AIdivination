<template>
    <el-card class="w-80 card" shadow="hover" :body-style="{ padding: '20px' }">
        <el-tooltip :content="tool.desc" placement="top" effect="dark">
            <div class="flex relative">
                <img class="w-16 mr-4 cursor-pointer"
                    :src="tool.logo || `https://dummyimage.com/300x300/656b72/ffffff.jpg&text=${tool.name}`" alt="">
                <div class="w-48">
                    <div class="text-sm h-8 cursor-pointer" @click="goto(tool)" v-html="namehtml"></div>
                    <el-tag class="text-xs" type="info" effect="dark" v-html="taskhtml"></el-tag>
                </div>
                <div class="newflag" v-if="tool.isNew">New</div>
                <div class="newflag" v-if="tool.sponsored">👍</div>
            </div>
        </el-tooltip>
    </el-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps({
    'tool': { type: Object },
    'search': {
        type: String,
        default: ''
    }
})

onMounted(() => {
    console.log(props.search)
})
const namehtml = computed(() => {
    if (!props.search) {
        return props.tool.name
    }
    return props.tool.name.replace(new RegExp(props.search, 'i'), `<span style="color:rgb(207, 67, 67);">${props.search}</span>`)
})
const taskhtml = computed(() => {
    if (!props.search) {
        return props.tool.task
    }
    return props.tool.task.replace(new RegExp(props.search, 'i'), `<span style="color:rgb(207, 67, 67);">${props.search}</span>`)
})

// const tool = {
//     id: "42367",
//     name: "Nendo",
//     task: "Music samples",
//     task_id: "6172",
//     task_slug: "music-samples",
//     url: "https://nendo.ai/?ref=toolss"
// }


function goto(tool) {
    window.open(tool.url, '_blank')
}
</script>
<style>
.card {
    background-color: #1b385e;
    color: #fff;
    border: 0;
}

.card:hover {
    scale: 1.05;
}

.newflag {
    position: absolute;
    top: -11px;
    right: 8px;
    width: 0;
    height: 0;
    z-index: 1;
    color: rgb(207, 67, 67);
    font-size: 21px;
    text-align: center;
    line-height: 20px;
    font-weight: bold;
    transform: rotate(38deg);
    display: inline-block;
    padding: 0 5px;
    margin: 0;
    border-radius: 0 0 0 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>