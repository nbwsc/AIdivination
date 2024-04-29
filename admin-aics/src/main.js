import { createApp } from "vue";
import { createStore } from "vuex";

import moment from "moment";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-message.css";
import "./style.css";
moment.locale("zh-cn");
// axios.defaults.baseURL = "https://leapcapital.cn/aiapi";
axios.defaults.baseURL = "http://localhost:9000";

// vuex
const store = createStore({
  state() {
    return {
      company: {},
      isLogin: false,
    };
  },
  mutations: {
    setCompany(state, company) {
      state.company = company;
    },
    setLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return "$" + value;
  },
  format(t) {
    return moment(t).format("YYYY-MM-DD HH:mm");
  },
};
