<template>
    <main>
        <div class="scroll-container" ref="fullpage">
            <div class="section flex p-8">
                <div class="w-1/2 pl-8">
                    <h1 class="text-4xl mt-16">
                        An AI-powered platform built for customer service
                    </h1>
                    <h2 class="text-2xl mt-8">
                        Designed for precision and ease of use, AICS leverages approved company knowledge to deliver
                        consistently accurate and easy-to-understand solutions for your customers and agents.
                    </h2>
                    <div class="flex mt-16">
                        <el-button type="primary" @click="">Get a demo</el-button>
                        <el-button type="info" size="default" @click="">Try it for free</el-button>
                    </div>
                </div>
                <div class="w-1/3 p-8 mt-16">
                    <video
                        src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/ZfrjzA4qyfNhFzug_AIherolightbg.mp4"
                        type="video/mp4" autoplay="" loop="" muted="" playsinline=""
                        class="Video-styles__LoopedVideoPlayer-sc-1n6vd95-6 jGQWix"></video>
                </div>
            </div>
            <div class="section">
                <div class="text-center text-2xl mt-32">
                    Thousands of companies support millions of customers with AICS
                </div>
                <div class="mt-16">
                    <div reversed="" class="jYLmjQ" style="width: 3000px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/01afcde2-4d0c-4b4c-a35a-c5a45cdfdbb0_estee_lauder.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/b2c93a72-4278-4e90-9c03-b4145c788ced_kpmg.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/27a7574d-3ebc-4561-a8d2-65f63f1ed674_siemens.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/ee36a127-6d02-4acb-b11f-a0d6288f6b5a_lenovo.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/c7957717-979f-41c3-9f29-08c930b2c2c1_randstad.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/255e9f6c-cd45-4e0c-9ddb-1c4f09324131_flickr.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/b12b02d0-c766-474d-aa28-326e350d07da_remote-lock.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/6d44b413-dca0-4bd2-8769-24e0295b313a_dell.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/714e1191-0aaa-4e98-8391-34e581324341_glovo.svg"
                            style="width: 200px;"><img
                            src="https://images.prismic.io/stonly-solution-pages/99ca553f-19ba-4a6d-9e26-595f8a314986_Wineshipping+logo.png?auto=compress,format"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/1852060f-8637-4644-aedb-b3c53bf7d757_criteo.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/7f03e8de-1874-4e66-bded-39e673648e62_highspot.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/d463ded3-8cc3-485c-bc23-1702e6f61e69_Backmarket.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/ec697fbc-d659-477c-b19a-1f3264ed0b16_telus.svg"
                            style="width: 200px;"><img
                            src="https://stonly-solution-pages.cdn.prismic.io/stonly-solution-pages/f32ee49d-d15a-4a06-ac15-1896adc27247_castorama.svg"
                            style="width: 200px;"></div>
                </div>
            </div>
            <div class="section">
                <center class="p-16">
                    <div class="text-4xl">
                        智能知识库管理，从0-1快速构建
                    </div>
                    <div class="mt-8">
                        <img src="https://www.miduoke.net/asset/images/ai4.png" alt="">
                    </div>
                </center>
            </div>
            <div class="section">
                <div class=" ">

                </div>
            </div>
            <div class="section">Page5</div>
            <div class="section">Page6</div>
        </div>
        <div class="floatingindex">
            <div class="line"></div>
            <div id="currentIndex"> </div>
            <div class="indextxt t01" @click="scrollto(0)">01</div>
            <div class="indextxt t02" @click="scrollto(1)">02</div>
            <div class="indextxt t03" @click="scrollto(2)">03</div>
            <div class="indextxt t04" @click="scrollto(3)">04</div>
            <div class="indextxt t05" @click="scrollto(4)">05</div>
            <div class="indextxt t06" @click="scrollto(5)">06</div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { $, } from '@/utils'
const section3 = ref();

function scrollto(index: number) {
    const container = $('.scroll-container')
    const target = container.children[index] as HTMLElement
    if (!target) return
    container.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
    })
}
const currentPage = ref(0)

const scroll = () => {
    const container = $('.scroll-container')
    const floatingindex = $('.floatingindex')
    container.addEventListener('scroll', function (e: any) {
        const tail = container.children[container.children.length - 1] as HTMLElement;
        [].slice.call(container.children).forEach(function (ele: HTMLElement, index) {
            if (Math.abs(ele.getBoundingClientRect().top - container.getBoundingClientRect().top) < 10) {
                currentPage.value = index
                $('#currentIndex').style.top = (48 + index * 6) + '%'
                if (index === 2 && section3.value) {
                    section3.value.startCount()
                }
            }
        });
    })
}

onMounted(() => {
    scroll()
})

</script>
<style scoped>
.scroll-container {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scrollbar-width: none;
}

.section {
    height: 100vh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    overflow: hidden;
    position: relative;
    object-fit: cover;
    object-position: center;
    width: 100%;
    padding: 2em;
}

.section2 {
    height: 30vh
}

.floatingindex {
    position: fixed;
    top: 0;
    right: 0;
    width: 40px;
    height: 100vh;
    z-index: 100000;
    color: white;
    padding: 10px;
}

.line {
    width: 1px;
    height: 37.4vh;
    background-color: #c4c4c4;
    position: absolute;
    right: 20px;
    top: 48%;
}

#currentIndex {
    width: 2px;
    height: 55px;
    position: absolute;
    right: 20px;
    top: 48%;
    background-color: #60aeff;
}

.indextxt {
    position: absolute;
    z-index: 100000;
    font-size: 20px;
    color: #c4c4c4;
    right: 40px;
    inline-size: 24px;
    font-family: Menlo, monospace;
    mix-blend-mode: difference;
    cursor: pointer;
}


.t01 {
    top: 50%;
}

.t02 {
    top: 56%;
}

.t03 {
    top: 62%;
}

.t04 {
    top: 68%;
}

.t05 {
    top: 74%;
}

.t06 {
    top: 80%;
}

.jYLmjQ {
    width: 3000px;

    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    animation-name: jcEQwU;
    animation-duration: 40s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

@keyframes jcEQwU {
    0% {
        transform: translateX(0);
    }

    100% {

        transform: translateX(-100%);
    }
}
</style>