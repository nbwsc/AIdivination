<template>
    <div class="login">
        <el-card class="w-1/2 m-auto min-w-96">
            <div class="clearfix">
                <div class="text-2xl m-8 text-center">SUNOST</div>
                <div class="text-center text-lm mb-4">Sign In Or Sign Up Easily</div>
            </div>
            <el-form>
                <el-form-item label="Username">
                    <el-input v-model="username" placeholder="Enter your username"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="password" placeholder="Enter your password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                </el-form-item>
            </el-form>
            <div class="m-4 m-auto">
                <el-button type="primary" @click="signin">Sign In</el-button>
                <span class="w-12 text-center"> Or </span>
                <el-button @click="signup">Sign Up</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken, setToken } from '../auth'
import { ElMessage } from 'element-plus';
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: ""
        };
    },
    mounted() {
        if (getToken()) {
            this.$emit('onLogin')
        }
    },
    methods: {
        async signin() {
            if (this.username === "" || this.password === "") {
                ElMessage.error("Username or Password can not be empty")
                return
            }
            const r = await axios.post('/account/login', {
                username: this.username,
                password: this.password,
                from: ""
            })

            if (r.data.code === 0) {
                setToken(r.data.data.token)
                axios.defaults.headers.common['x-token'] = r.data.data.token
                this.$emit('onLogin')
            } else {
                ElMessage.error(r.data.msg)
            }
        },
        async signup() {
            if (this.username === "" || this.password === "") {
                ElMessage.error("Username or Password can not be empty")
                return
            }
            const r = await axios.post('/account/signup', {
                username: this.username,
                password: this.password,
                from: ""
            })
            if (r.data.code === 0) {
                setToken(r.data.data.token)
                axios.defaults.headers.common['x-token'] = r.data.data.token
                this.$emit('onLogin')
            } else {
                ElMessage.error(r.data.msg)
            }
        }
    }
};
</script>

<style scoped></style>