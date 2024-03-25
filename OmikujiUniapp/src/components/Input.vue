<template>
    <div class="panel">
        <div class="mask"></div>
        <div class="things">

            <div class="text-3xl mb-8 text-white">
                <!-- {{ t('title') }} -->
                おみくじ
            </div>
            <el-radio-group v-model="lang" size="large" @change="setLang">
                <el-radio-button label="日本語" value="Japanese" />
                <el-radio-button label="English" value="English" />
                <el-radio-button label="中文" value="Chinese" />
            </el-radio-group>
            <el-input class="w-4/5 mt-8" v-model="fortunes" placeholder="おみくじを入力してください" size="large"
                clearable></el-input>
            <el-input class="w-4/5 mt-8" type="textarea" size="large" :rows="4" v-model="poems" placeholder="詩を入力してください"
                :autosize="{ minRows: 4, maxRows: 8 }">
            </el-input>

            <el-button class="w-4/5 mt-8 btn" type="primary" size="large" @click="submit"> 提出する </el-button>
        </div>
    </div>
    <div class="mask result" style="z-index: 1000;" v-if="showresult">
        <div v-if="result" v-html="result"></div>
        <div v-else class="loading">
        </div>
    </div>

</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElLoading } from 'element-plus';
import axios from 'axios'
const fortunes = ref('大吉');
const poems = ref('七寶浮圖塔 高峰頂上安 眾人皆仰望 莫作等閒看');
const lang = ref('Chinese');
const result = ref('');
const showresult = ref(false);

onMounted(() => {
    const locallang = localStorage.getItem('lang');
    if (locallang) {
        lang.value = locallang;
    }
})

function setLang(val: string) {
    localStorage.setItem('lang', val);
}
// import i18n from '../i18n';
function loading() {
    const loading = ElLoading.service({
        lock: true,
        fullscreen: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
        loading.close()
    }, 2000)
}

function submit() {
    showresult.value = true;
    // loading();
    axios.post('http://leapcapital.cn:8099/omikuji/answerOmikuji', {
        fortunes: fortunes.value,
        poems: poems.value,
        lang: lang.value
    }).then(res => {
        result.value = res.data.data.replace(/\n/g, '<br/>');
    })
}
</script>
<style scoped>
.panel {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/bg1.webp') no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    text-align: center;
    z-index: 0;
}

.mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

.things {
    position: absolute;
    z-index: 2;
    top: 20vh;
    width: 100vw;
    padding: 5%;
}

.result {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    z-index: 1000;
    color: #fff;
    padding: 32px 16px;
    font-size: 12px;
}

.loading {
    width: 100%;
    height: 100%;
    background: url('@/assets/loading.gif') no-repeat;
    background-size: 100%;
    background-attachment: fixed;
    text-align: center;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    color: #fff;
    padding: 32px 16px;
    font-size: 12px;
}

.btn {}
</style>