<template>
    <el-card class="w-80 card" shadow="hover" :body-style="{ padding: '20px' }">
        <div class="flex">

            <img class="w-16 mr-4 cursor-pointer"
                :src="tool.logo || `https://dummyimage.com/300x300/656b72/ffffff.jpg&text=${tool.name}`" alt="">
            <div class="w-48">
                <div class="text-sm h-8 cursor-pointer" @click="goto(tool)" v-html="namehtml"></div>
                <el-tag class="text-xs" type="info" effect="dark" v-html="taskhtml"></el-tag>
            </div>
        </div>
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
</style>