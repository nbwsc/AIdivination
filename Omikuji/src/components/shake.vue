<template>
    <div class="">

        <el-button class="btn" type="primary" size="default" @click="shakeFunction">
            摇一摇抽签
        </el-button>

        <div v-html="log"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import Shake from 'shake.js'

onMounted(() => {
})
const startShake = function () {

}
const log = ref('')
window.addEventListener("devicemotion", (event) => {
    console.log(`${event.acceleration.x} m/s2`);
    log.value += event.acceleration.x + '<br/>'
});


// 定义一个摇动阈值
var shakeThreshold = 500;
// 三个方向上次的值
var lastX, lastY, lastZ;
// 上一次摇动的时间
var lastTime = 0;

// 用户摇一摇的功能
function shakeFunction() {
    var system = navigator.userAgent.toLowerCase();
    console.log(system)
    if (system.indexOf("like mac os x") > 0) {
        var reg = /os [\d._]*/gi;
        var info = system.match(reg);
        var version = (info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
        var list = version.split(".");
        console.log(list)
        // 对IOS 13.3以后的版本处理
        if (list[0] > 12) {
            console.log(typeof (DeviceMotionEvent), typeof (DeviceMotionEvent.requestPermission))
            log.value += typeof (DeviceMotionEvent) + typeof (DeviceMotionEvent.requestPermission)
            if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (DeviceMotionEvent.requestPermission) === 'function') {
                window.DeviceOrientationEvent.requestPermission().then(state => {
                    if (state === "granted") {
                        // 监听传感器运动事件
                        if (window.DeviceMotionEvent) {
                            alert("授权成功")
                            window.addEventListener('devicemotion', shakeFunctionHandler);
                        } else {
                            alert('手机不支持陀螺仪功能');
                        }
                    } else if (state === "denied") {
                        alert("拒绝授权")
                    } else if (state === "prompt") {
                        alert("你对手机做了啥")
                    }
                })
            }
        } else {
            // 监听传感器运动事件
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', shakeFunctionHandler);
            } else {
                alert('手机不支持陀螺仪功能');
            }
        }
    }
};


// 运动传感器的处理
function shakeFunctionHandler(e) {

    var currentTime = Date.now();

    // 每100毫秒判断一次位置
    if ((currentTime - lastTime) > 100) {

        // 获取重力加速度
        var acceleration = e.accelerationIncludingGravity;
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        var differenceTime = currentTime - lastTime;
        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / differenceTime * 10000;

        // 前后三个向的差值的绝对值和时间比率超过了预设的阈值
        if (speed > shakeThreshold) {

            alert('手机开始摇起来了');

        };

        lastX = x;
        lastY = y;
        lastZ = z;
        lastTime = currentTime;
    }
}
</script>
<style scoped>
.btn {
    width: 200px;
    height: 60px;
    font-size: 18px;
    text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>