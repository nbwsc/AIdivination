<template>
    <div>
        <div class="p-4">
            <div class="mt-4 text-2xl">
                我的收藏
            </div>
            <el-card v-for="(item, index) in list" :key="index" class="mt-2" shadow="always"
                :body-style="{ padding: '20px' }">
                <div style="color:#555">
                    <div class="title mb-2" @click="openurl(item)">
                        {{ item.title }}
                    </div>
                </div>
                <el-tag type="warning" effect="plain" style="font-size: 0.5rem;">
                    来源：{{ item.source }}
                </el-tag>
                <div class="float-right">
                    <el-tag class="ml-4" type="info" effect="plain">
                        <span class="text-sm" style="font-size: 0.5rem;">
                            收藏于：{{ format(item.createdAt) }}
                        </span>
                    </el-tag>

                </div>
                <div class="mt-4 mb-4 summary" @click="openurl(item)">
                    {{ item.summary }}
                </div>

                <el-icon class="mr-4" @click="listen(item)">
                    <Headset />
                </el-icon>
                <div class="float-right">
                    <el-icon class="ml-2 text-sm" @click="deleteitem(item)">
                        <Delete />
                    </el-icon>
                </div>
            </el-card>
            <center class="mt-4 center" style="color:#aaa">
                ———————— 没有更多了 ————————
            </center>
        </div>
    </div>
</template>
<script setup>
import moment from 'moment'
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Headset } from '@element-plus/icons-vue'

const page = ref(1)
const list = ref([])
let userId

const throttle = (fun, delay) => {
    let last = 0;
    let timer = null;
    return function throttled(...args) {
        const now = Date.now();
        if (now - last >= delay) {
            clearTimeout(timer); // 清除之前可能存在的定时器
            fun.apply(this, args);
            last = now;
        } else if (!timer) { // 如果在delay时间内再次触发，重新设置定时器
            timer = setTimeout(() => {
                fun.apply(this, args);
                timer = null;
            }, delay - (now - last));
        }
    };
};


const handleScroll = function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const vHeight = window.innerHeight || document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    if (vHeight + scrollTop >= pageHeight - 500) {
        //-500是为了在滚动到底部前提前获取数据，提高用户体验
        console.log("到底了, 发请求获取数据");
        nextPage()
    }
};

const listener = throttle(handleScroll, 200)

const limit = 50
const showend = ref(false)
onMounted(async () => {
    userId = window.localStorage.getItem("userId").replace(/"/g, '')
    const d = await axios({
        url: "/aiapi/smartsiri/v2/mycollections",
        method: "POST",
        data: {
            userId, page: page.value
        },
    })
    if (d.data.code !== 0) {
        return ElMessageBox('出错了！请退出重新登录。')
    }
    list.value = d.data.list
    if (d.data.list.length > limit) {
        window.addEventListener('scroll', listener);
    } else {
        showend.value = true
    }

})

async function nextPage() {
    page.value = page.value + 1
    const d = await axios({
        url: "/aiapi/smartsiri/v2/mycollections",
        method: "POST",
        data: {
            userId,
            page: page.value
        },
    })
    if (d.data.code !== 0) {
        return ElMessageBox('出错了！请退出重新登录。')
    }
    list.value = list.value.concat(d.data.list)
    if (d.data.list.length < limit) {
        window.removeEventListener('scroll', listener)
        showend.value = true
    }
}

function format(date) {
    return moment(date).format('YYYY-MM-DD HH:mm')
}

function openurl(item) {
    window.open(item.urltext.match(/(https?:\/\/[^\s，。]+)/g)[0])
}

function deleteitem(item) {
    ElMessageBox.confirm('确定要删除吗？', {
        showCancelButton: false,
        confirmButtonText: "确认",
    }).then(() => {
        return axios({
            url: "/aiapi/smartsiri/v2/deleteCollection",
            method: "post",
            data: { articleId: item._id }
        })
    }).then(() => {
        list.value = list.value.filter(i => i._id !== item._id)
    })
}

function listen(item) {
    ElMessage('收听功能正在开发中，敬请期待...')
}
</script>
<style lang="css" scoped>
.title {
    /* 最多显示两行... */
    display: -webkit-box;
    line-clamp: 2;
    max-height: 40px;
    overflow: hidden;
    font-size: 14px;
}

.summary {
    font-size: 12px;
    color: #999;
    max-height: 140px;
    overflow: hidden;
}
</style>