<template>
    <el-card class="w-1/5 min-w-12 m-6 cursor-pointer card" shadow="hover" :body-style="{ padding: '20px' }">
        <div @click="$emit('playclick', ost)">
            <span class="text-sm">{{ ost.title }}</span>
        </div>
        <div @click="$emit('playclick', ost)">
            <img class="w-full" :src="ost.image_url" alt="">
            <div class="text-xs mt-2 h-12 overflow-hidden">{{ ost.tags }}</div>
            <div class="text-xs mt-2">{{ $filters.format(ost.createTime) }}</div>
        </div>
        <!-- card body -->
    </el-card>
</template>
<script setup>
defineProps({
    ost: Object
})
</script>
<style scoped>
.card {
    min-width: 220px;
}

.card:hover {
    scale: 1.05;
}
</style>