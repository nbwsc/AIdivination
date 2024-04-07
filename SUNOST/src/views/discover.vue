<template>
    <div class="discover">
        <div class="text-4xl mt-24">
            DISCOVER NEW SOUND WITH AI
        </div>
        <div class="text-2xl mt-16">
            EXPLORE an OST for your
            <span style="display:inline-block;width:6rem;color: rgb(236, 65, 65);" class="text-4xl">
                {{ artOptions[art] }}
            </span>
        </div>
        <div class="text-xl mt-8">
            or CREATE your own OST
        </div>

        <div class="mt-8 flex flex-wrap justify-center">
            <Card v-for="(ost, index) in osts" :key="index" :ost="ost" @playclick="$emit('playclick', ost)"></Card>
        </div>
        <div class="text-sm mt-16 mb-16">
            <div class="cursor-pointer" @click="contact()">
                EMAIL US：support@sunost.com
            </div>
            <div>
                Copyright © 2024 SUNOST. All rights reserved.
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from "element-plus/es";
import Card from './card.vue'
const art = ref(0);

const artOptions = ['Game', 'Movie', 'Anime', 'Video', 'Audio']

setInterval(() => {
    if (art.value >= artOptions.length - 1) {
        art.value = 0;
    } else {
        art.value += 1;
    }
}, 2000);

const osts = ref([])

onMounted(() => {
    getRecommand()
})

async function getRecommand() {
    const r = await axios.get('/sunost/getRecommand', {
        query: {
            page: 0
        }
    })
    osts.value = r.data.data.list
    console.log(osts)
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
</style>