<template>
    <el-card class="w-1/5 min-w-12 m-6 cursor-pointer card" shadow="hover" :body-style="{ padding: '20px' }">
        <div @click="$emit('playclick', ost)" class="text-sm h-8 truncate">
            {{ ost.title }}
        </div>
        <div @click="$emit('playclick', ost)">
            <img class="w-full cover" :src="ost.image_url" alt="">
            <div class="text-xs mt-2 h-12 overflow-hidden">{{ ost.tags }}</div>
            <div class="text-xs"> {{ $filters.format(ost.createTime) }}</div>
            <div class="flex justify-center">
                <div class="flex items-center">
                    <el-icon>
                        <Headset class="text-sm" />
                    </el-icon>
                    <div class="ml-2 text-sm">
                        {{ ost.playCount }}
                    </div>
                </div>
                <!-- <div class="flex items-center">
                    <el-icon>
                        <Star class="text-sm" />
                    </el-icon>
                    <div class="ml-2 text-sm">{{ ost.starCount }}</div>
                </div> -->
            </div>
        </div>
        <div class="text-2xl pt-24 mask" v-if="ost.state !== 'success'">{{ ost.state }}</div>
    </el-card>
</template>
<script setup>
import { Headset, Star } from '@element-plus/icons-vue'
defineProps({
    ost: Object
})
</script>
<style scoped>
.card {
    position: relative;
    min-width: 220px;
    border: 0;
}

.card:hover {
    scale: 1.05;
}

.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    text-align: center;
}

.cover {
    min-height: 189px;
}
</style>