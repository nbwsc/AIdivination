import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-message.css";
import router from "./router";

createApp(App).use(router).mount("#app");
