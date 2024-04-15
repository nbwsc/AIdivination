<template>
    <el-card class="w-56 card" shadow="hover" :body-style="{ padding: '20px' }">
        <div slot="header">
            <div class="text-sm h-8 cursor-pointer" @click="goto(tool)">{{ tool.name }}</div>
            <el-tag type="info" size="mini" effect="dark">{{ tool.task }}</el-tag>
        </div>
        <img class="mt-4 cursor-pointer"
            :src="tool.logo || `https://dummyimage.com/300x300/656b72/ffffff.jpg&text=${tool.name}`" alt="">
        <div class="text-sm mt-4">
            {{ tool.desc || tool.task_slug }}
        </div>
    </el-card>

</template>

<script setup>
import { ref, onMounted } from 'vue'
defineProps(['tool'])
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