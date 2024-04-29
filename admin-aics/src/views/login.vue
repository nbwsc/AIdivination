<template>
    <div class="login p-32">
        <el-card class="w-1/2 m-auto min-w-96">
            <div class="clearfix">
                <div class="text-2xl m-8 text-center">AICS 登陆</div>
            </div>
            <el-form>
                <el-upload class="upload-demo" drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" accept=".key"
                    :auto-upload="false" :on-change="onFileUploaded">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        将 .key 文件拖拽到此处 或 <em>点击上传</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            上传 .key 文件进行登陆
                        </div>
                    </template>
                </el-upload>
            </el-form>
            <div class="m-4 m-auto">
                <!-- <el-button type="primary" @click="signin">Sign In</el-button>
                <span class="w-12 text-center"> Or </span>
                <el-button @click="signup">Sign Up</el-button> -->
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken, setToken } from '../auth'
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue'

export default {
    name: "login",
    components: { UploadFilled },
    data() {
        return {
            username: "",
            password: "",
            onFileUploaded: (input) => {
                let file = input.raw
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = () => {
                    this.signin(reader.result)
                };
                reader.onerror = function () {
                    console.log(reader.error);
                };

            }
        };
    },
    mounted() {
        if (getToken()) {
            this.$emit('onLogin')
        }

    },
    methods: {
        async signin(txt) {
            const [accessKey, secretKey] = txt.split('\n')
            const r = await axios.post('/aics/adminlogin', {
                accessKey,
                secretKey
            })

            if (r.data.code === 0) {
                setToken(r.data.data.token)
                axios.defaults.headers.common['x-token'] = r.data.data.token
                this.$emit('onLogin')
            } else {
                ElMessage.error(r.data.msg)
            }
        },
    }
};
</script>

<style></style>