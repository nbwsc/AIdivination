<template>
    <div class="panel">
        <div class="mask"></div>
        <div class="things">
            <div class="text-3xl mb-8 text-white">
                {{ t['title'] }}
            </div>
            <el-radio-group v-model="lang" size="large" @change="setLang">
                <el-radio-button v-for="item in langs" :key="item" :label="i18n[item]['lang']" :value="item" />
            </el-radio-group>
            <el-input class="w-4/5 mt-8" v-model="fortunes" :placeholder="t['ph_fortunes']" size="large"
                clearable></el-input>
            <el-input class="w-4/5 mt-8" type="textarea" size="large" :rows="4" v-model="poems"
                :placeholder="t['ph_poems']" clearable :autosize="{ minRows: 4, maxRows: 8 }">
            </el-input>

            <el-button class="w-4/5 mt-8 btn" type="primary" size="large" @click="submit"> {{ t['submit'] }}
            </el-button>
        </div>
    </div>
    <div class="mask result" style="z-index: 1000;" v-if="showresult">
        <div v-if="result">

            <div class="resulttxt" v-html="result"></div>
            <el-button class="btn" type="primary" size="default" @click="showresult = false; result = ''">{{ t['again']
                }}</el-button>
        </div>
        <div v-else class="loading">
        </div>
    </div>

</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { ElLoading, ElMessage } from 'element-plus';
import i18n from './i18n';
import axios from 'axios'
const fortunes = ref('');
const poems = ref('');
const lang = ref('English');
const result = ref('');
const showresult = ref(false);
const langs = Object.keys(i18n)
// function t(key: string) {
//   return i18n[lang.value](key);
// }
const t = computed(() => {
    return i18n[lang.value];
})

onMounted(() => {
    const locallang = localStorage.getItem('lang');
    if (locallang) {
        lang.value = locallang;
        document.title = t.value['title'];
    }
})

function setLang(val: string) {
    localStorage.setItem('lang', val);
    // set html title as t['title']
    document.title = t.value['title'];
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
    // check if fortunes and poems are empty
    if (!fortunes.value || !poems.value) {
        ElMessage(t.value['empty']);
        return;
    }
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
    background: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    z-index: 1000;
    color: #fff;
    padding: 32px 16px;
    font-size: 12px;
    overflow: scroll;
}

.resulttxt {
    padding-top: 2vh;
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

.btn {
    width: 80%;
    margin: 10%;
    border: 1px solid #fff;
    background-color: unset;
}
</style>