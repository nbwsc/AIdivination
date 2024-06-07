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
