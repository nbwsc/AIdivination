<template>
  <RouterView class="panel" />
</template>
<script setup>
// import AudioPlayer from "@liripeng/vue-audio-player";
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

onMounted(async () => {
  const code = getParameterByName("code")
  const state = getParameterByName("state")

  const encodeurl = encodeURIComponent('http://siri.leapcapital.cn')
  if (!code) {
    //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx861818ac575d28e1&redirect_uri=${encodeurl}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
    return
  }

  const r = await axios({
    url: "http://siri.leapcapital.cn/aiapi/wechat/getUserInfo",
    data: { code, },
    method: "post",
  })

  if (r.data.errcode) {
    //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx861818ac575d28e1&redirect_uri=${encodeurl}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`

    // ElMessage({
    //   message: r.data.errmsg,
    //   type: "error",
    // });
    return
  }
  window.wechatuserinfo = r.data
  window.urlparams = { code, state }
  console.log(window.wechatuserinfo)
})
</script>
<style>
.panel {
  max-width: 720px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>