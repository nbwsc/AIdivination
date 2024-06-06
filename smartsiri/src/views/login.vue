<template>
    <div class="container">
        <div class="loginform">
            <div class="clearfix">
                <img src="@/assets/smartsiri-logo.png" alt="">

            </div>
            <form class="mt-4" @submit.prevent="login">
                <el-input v-model="phoneNumber" :disabled="!!code" maxlength="11" type="text" placeholder="请输入手机号"
                    size="large" clearable></el-input>
                <el-row class="mt-4" :gutter="0">
                    <el-col :span="8" :offset="0">
                        <el-button style="height: 44px;" :disabled="!!code" type="primary" size="large"
                            @click="getSMScode">{{ smstxt
                            }}</el-button></el-col>
                    <el-col :span="14" :offset="1">
                        <el-input v-model="smscode" placeholder="填写验证码" size="large" clearable>
                        </el-input></el-col>
                </el-row>

                <el-button class="mt-4" style="width: 100%" type="success" size="large" @click="login">登录</el-button>
                <br>
                <el-button class="mt-4" style="width: 100%" type="warning" size="large"
                    @click="gotomodel">免费下载模型</el-button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
    name: "LoginPage",
    data() {
        return {
            phoneNumber: "",
            smscode: "",
            countdown: 120,
            code: "",
        };
    },
    components: {
    },
    created() {
        const ls = +window.localStorage.getItem("smartsirilogints");
        const now = new Date().getTime();
        if (ls >= now - 36000000) {// 10h内免登录
            this.$router.push("/me");
            // this.$emit("login");
        }
    },
    computed: {
        smstxt() {
            if (!this.code) {
                return "获得验证码";
            }
            return this.countdown;
        },
    },
    methods: {
        login() {
            if (!this.phoneNumber) {
                return ElMessage({
                    message: "请填写手机号",
                    type: "info",
                });
            }
            if (!this.smscode) {
                return ElMessage({
                    message: "请填写验证码",
                    type: "info",
                });
            }
            if (!this.code) {
                return ElMessage({
                    message: "请重新获取验证码",
                    type: "info",
                });
            }
            if (this.smscode == this.code) {
                axios({
                    url: "/smartsiri/signin",
                    method: "POST",
                    data: { phone: this.phoneNumber, smscode: this.code },
                })
                    .then((data) => {
                        if (data.data.code !== 0) {
                            return ElMessage({
                                message: "登录失败，请检查手机号授权信息",
                                type: "error",
                            });
                        }
                        window.localStorage.setItem("smartsirilogints", new Date().getTime());
                        window.localStorage.setItem(
                            "userId",
                            JSON.stringify(data.data.data._id)
                        );
                        window.userinfo = data.data.data;
                        // this.$emit("login");
                        this.$router.push("/me");
                    })
                    .catch((err) => {
                        console.log(err);
                        ElMessage({
                            message: "登录失败",
                            type: "error",
                        });
                    });
            } else {
                return ElMessage({
                    message: "验证码错误",
                    type: "info",
                });
            }
        },

        gotomodel() {
            this.$router.push({
                path: "/models",
            });
        },
        getSMScode() {
            // check phoneNumber
            if (
                !this.phoneNumber ||
                !this.phoneNumber.match(
                    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
                )
            ) {
                return ElMessage({
                    message: "请填写正确的手机号",
                    type: "info",
                });
            }
            axios({
                url: "https://www.leapcapital.cn/api/public/getSmsCode",
                method: "POST",
                data: { telphone: this.phoneNumber },
            }).then((data) => {
                this.code = data.data;
                ElMessage({
                    message: "验证码已发送，请注意查收",
                    type: "success",
                });
                const timer = setInterval(() => {
                    this.countdown--;
                    if (this.countdown <= 0) {
                        this.code = null;
                        clearInterval(timer);
                    }
                }, 1000);
            });
        },
    },
};
</script>
<style scoped>
.container {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000;
    width: 100vw;
    height: 100vh;
    background-size: cover;
}

.loginform {
    position: relative;
    top: 20px;
    left: 5%;
    width: 90%;
    padding: 0;
    background-color: #ffffff33;
    border-radius: 8px;
}
</style>