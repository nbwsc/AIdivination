<template>
    <el-row :gutter="20">
        <el-col :span="4" :offset="0">
            <el-menu router class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="page2">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20" :offset="0">
            <RouterView />
        </el-col>
    </el-row>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';
import Page1 from '@/views/console/page1.vue'
import Page2 from '@/views/console/page2.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
onMounted(() => {
    if (!store.state.isLogin) {
        ElMessage('需要登陆')
        router.push('/login')
    }
})
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    height: 100vh;
}
</style>