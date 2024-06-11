import { createApp } from "vue";
import moment from "moment";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-message.css";
import "./style.css";
moment.locale("zh-cn");
axios.defaults.baseURL = "http://siri.leapcapital.cn/";
// axios.defaults.baseURL = "https://smartsiri.online/aiapi";
// axios.defaults.baseURL = 'http://localhost:9000'

const app = createApp(App);
app.use(router);
app.mount("#app");
app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return "$" + value;
  },
  format(t) {
    return moment(t).format("YYYY-MM-DD HH:mm");
  },
};

window.copyToClikpboard = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    navigator.clipboard.writeText(text);
    ElMessage("已复制到剪贴板");
    //   message.success('已复制')
  } else {
    // 创建text area
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = 0;
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
      ElMessage("已复制到剪贴板!");
    });
  }
};
