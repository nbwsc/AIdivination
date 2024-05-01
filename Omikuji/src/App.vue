<template>
  <div class=" container bg" v-if="state === 0">
    <div class="tips">
      エラーが発生しました。問題をチェックしてから再度入力してください。
    </div>
  </div>
  <div class=" container bg" v-if="state === 1">
    <el-button class="btn" type="primary" size="default" @click="onEnterClicked">
      浅草寺への入場
    </el-button>
  </div>
  <div v-if="state === 2" class="container bg2">
    <div class="tips" @click="showResult">
      御神籤箱を3回タップするか、携帯をシャカシャカ降って、おみくじを引きましょう！
      <br />
      あと
      <span style="font-size:32px;font-weight: bold;">
        {{ shakeCount }}
      </span>
      回チャンス！おみくじで運試しを！
      <img class="box" src="https://tabio.com/jp/wp-content/uploads/2020/12/omikuji_shake.gif" alt="">
    </div>
  </div>
  <div v-if="state === 3" class="container bg3">
    <div class="tips" @click="state = 4">
      72番目のみくじ棒を引き当てました。みくじ棒をタップし、みくじ箋の内容を確認しましょう。
      <div class="kujiindex">
        {{ kuji.index }}
      </div>
    </div>
  </div>
  <div v-if="state === 4" class="container bg3">
    <div class="tips">
      おめでとうございます。「{{ kuji.level }}」を引きました。スマホ画面を保存し、Lineに戻ってBotとチャットを続けてください。Botはあなたにあった、お告げを読み解くコツと運勢アップのカギを教えます。
      <br>
      <br>
      PS: みくじ箋をタップすると裏側をめぐります。
      <div class="kujiresult" @click="imgside = !imgside">
        <img class="kujiimg" v-show="imgside" :src="kuji.img1" alt="">
        <img class="kujiimg" v-show="!imgside" :src="kuji.img2" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const state = ref(1)
const imgside = ref(true)
const kuji = ref({
  index: '',
  level: '',
  img1: '',
  img2: '',
})
let kujiId
onMounted(async () => {
  // get id from url
  const url = new URL(window.location.href)
  kujiId = url.searchParams.get('id')
  if (!kujiId) {
    state.value = 0
  }
  const { data } = await axios.get(`https://sunost.com/lineapi/getKujiById?id=${kujiId}`)
  kuji.value = {
    index: data.randomIndexTxt,
    level: data.kuji.type,
    img1: `https://github.com/fumiama/senso-ji-omikuji/blob/main/${data.kuji.id}_0.jpg?raw=true`,
    img2: `https://github.com/fumiama/senso-ji-omikuji/blob/main/${data.kuji.id}_1.jpg?raw=true`,
  }
  setTimeout(() => {
    const imgurl = [
      'https://tabio.com/jp/wp-content/uploads/2020/12/omikuji_shake.gif',
      'https://farm8.staticflickr.com/7222/13489562835_4476a20a22_c.jpg',
      'https://i.pinimg.com/736x/71/ab/d3/71abd359106176cd5028680fc29f8d2f--japanese-furniture-drawers.jpg',
      kuji.value.img1,
      kuji.value.img2,
    ]
    imgurl.forEach(img => {
      let image = new Image()
      image.src = img
    })
  }, 1);
})

function onEnterClicked() {
  shakeFunction()
  state.value = 2
}

let shakeCount = ref(3)

function showResult() {
  if (shakeCount.value-- === 1) {
    state.value = 3
    stopListening()
    axios.get(`https://sunost.com/lineapi/onKujiChecked?id=${kujiId}`)
  }
}

// 定义一个摇动阈值
var shakeThreshold = 500;
// 三个方向上次的值
var lastX, lastY, lastZ;
// 上一次摇动的时间
var lastTime = 0;

// 用户摇一摇的功能
function shakeFunction() {
  var system = navigator.userAgent.toLowerCase();
  if (system.indexOf("like mac os x") > 0) {
    var reg = /os [\d._]*/gi;
    var info = system.match(reg);
    var version = (info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
    var list = version.split(".");
    // 对IOS 13.3以后的版本处理
    if (list[0] > 12) {
      if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (DeviceMotionEvent.requestPermission) === 'function') {
        window.DeviceOrientationEvent.requestPermission().then(state => {
          if (state === "granted") {
            if (window.DeviceMotionEvent) {
              window.addEventListener('devicemotion', shakeFunctionHandler);
            } else {
            }
          } else if (state === "denied") {
            console.log("denied")
          } else if (state === "prompt") {
            console.log("prompt")
          }
        })
      }
    } else {
      // 监听传感器运动事件
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', shakeFunctionHandler);
      } else {
        console.log('手机不支持陀螺仪功能');
      }
    }
  } else {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', shakeFunctionHandler);
    } else {
      console.log('手机不支持陀螺仪功能');
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
      console.log('shaked');
      state.value = 3;
      stopListening()
    };

    lastX = x;
    lastY = y;
    lastZ = z;
    lastTime = currentTime;
  }
}

function stopListening() {
  window.removeEventListener('devicemotion', shakeFunctionHandler);
}
</script>
<style scoped>
.bg {
  background-image: url(https://i.pinimg.com/736x/81/80/01/818001beb647906ba98fedf17489b1b6.jpg);
}

.container {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
}

.btn {
  width: 200px;
  height: 60px;
  font-size: 18px;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #0008;
  border: 0;
}

.bg2 {
  background-image: url(https://farm8.staticflickr.com/7222/13489562835_4476a20a22_c.jpg);
}

.bg3 {
  background-image: url(https://i.pinimg.com/736x/71/ab/d3/71abd359106176cd5028680fc29f8d2f--japanese-furniture-drawers.jpg);
}

.tips {
  background: #0008;
  color: #fff;
  padding: 60px 20px;
  opacity: 1;
  animation: fadeIn 0.5s;
  width: 100%;
  height: 100%;

}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.box {
  margin-top: 120px;
}

.kujiindex {
  color: #666;
  background: linear-gradient(to right, #efc592, #faf4d5, #dea171);
  width: 30px;
  height: 800px;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  left: 52%;
  top: 0;
  padding: 120px 2px;
  animation: riseToHalfScreen 1.4s ease-in-out forwards;
}



@keyframes riseToHalfScreen {
  0% {
    transform: translateY(100vh) rotate(20deg);
    opacity: 0;
  }

  100% {
    transform: translateY(20vh) rotate(-30deg);
    opacity: 1;
  }
}

.kujiresult {
  animation: riseToHalfScreen2 1.8s ease-in-out forwards;
  width: 80%;
  margin: 0px auto;
}

@keyframes riseToHalfScreen2 {
  0% {
    transform: translateY(50vh) rotate(30deg);
    opacity: 0.3;
  }

  100% {
    transform: translateY(4vh) rotate(0deg);
    opacity: 1;
    width: 80%;
  }
}

.kujiimg {
  animation: expandWidth 0.4s ease-in-out forwards;
}

@keyframes expandWidth {
  0% {
    transform: scaleX(0);
    opacity: 0.5;
  }

  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>