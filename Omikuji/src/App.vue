<template>
  <div class=" container bg" v-if="state === 1">
    <el-button class="btn" type="primary" size="default" @click="onEnterClicked">
      浅草寺への入場
    </el-button>
  </div>
  <div v-if="state === 2" class="container bg2">
    <div class="tips" @click="showResult">
      サインを押すか、携帯電話を振って占いをする
      <img class="box" src="https://tabio.com/jp/wp-content/uploads/2020/12/omikuji_shake.gif" alt="">
    </div>
  </div>
  <div v-if="state === 3" class="container bg3">
    <div class="tips" @click="state = 4">
      あなたの抽選で72番目の札を引き当てました。詳細を確認するために、下の文をクリックしてください。
      <div class="kujiindex">
        {{ kuji.index }}
      </div>
    </div>
  </div>
  <div v-if="state === 4" class="container bg3">
    <div class="tips">
      おめでとうございます、「{{ kuji.level }}」のサインを引きましたね。スクリーンショットを保存して、LineとBotに戻ってチャットを続けてください。彼はあなたのためにさらなる解釈と深いコミュニケーションを提供します
      <br>
      <br>
      PS: 画像をクリックすると裏側が見られますよ。
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
// import Shake from 'shake.js'
const state = ref(1)
const imgside = ref(true)
const kuji = {
  index: '七十二',
  level: "吉",
  img1: 'https://github.com/fumiama/senso-ji-omikuji/blob/main/72_0.jpg?raw=true',
  img2: 'https://github.com/fumiama/senso-ji-omikuji/blob/main/72_1.jpg?raw=true',
  poem: '戶內防重厄\n花菓見分枝\n嚴霜纔過後\n方可始相宜',
  desc: "家中恐怕有災禍到來。但是，為了防止發生，要小心吧。枝幹各自分開是說家庭不合。因為 這個緣故全部􏰀不和睦吧。相互地悔改壞的地方，然後戰勝這的試煉。如果這樣做的話，似 乎會以好事發生。因為家裡和睦，好事似乎越變越多。 願望:後來會實現吧。疾病:會拖長吧。遺失物:變成遲遲才能找到吧。盼望的人:遲遲才 出現吧。蓋新居、搬家:還算好吧。旅行:沒有特別的阻礙吧。結婚、交往:雖然還算好， 但最後變得更好吧。"
}
onMounted(() => {
  // get id from url
  const url = new URL(window.location.href)
  const id = url.searchParams.get('id')
  console.log(id)
})
function onEnterClicked() {
  shakeFunction()
  state.value = 2
}
function showResult() {
  state.value = 3
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
              console.log("granted")
              window.addEventListener('devicemotion', shakeFunctionHandler);
            } else {
              console.log('手机不支持陀螺仪功能');
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
  position: absolute;
  animation: riseToHalfScreen2 1.8s ease-in-out forwards;
  width: 300px;
  left: 50px;
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