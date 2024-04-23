import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// import "element-plus/theme-chalk/el-loading.css";
// import "element-plus/theme-chalk/el-message-box.css";
// import "element-plus/theme-chalk/el-message.css";
import "./style.css";
axios.defaults.baseURL = "https://leapcapital.cn/aiapi";
// axios.defaults.baseURL = 'http://localhost:9000'

const app = createApp(App);
app.use(router);
app.mount("#app");
