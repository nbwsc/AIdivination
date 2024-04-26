<template>
    <div class="p-16 generate">
        <div class="text-2xl cursor-pointer underline createbtn mt-8" @click="create">
            Create Your Masterpiece
            <span class="bold" v-if="!myOSTs.length">
                For FREE!
            </span>
            <span v-else>
                <br>(Cost 20 Credit for 2 Songs Once)</span>
        </div>
        <div class="text-2xl mt-8 bold"># My OST</div>
        <div class="mt-4 flex flex-wrap justify-center">
            <div v-if="!myOSTs.length" class="text-4xl text-gray-500 mt-8">Empty here. Waiting for your creation.</div>
            <Card v-for="(ost, index) in myOSTs" :key="index" :ost="ost" @playclick="$emit('playclick', ost)"></Card>
        </div>
        <el-dialog title="Genius Create" v-model="isCreateShow" width="80%">
            <el-form :model="music" ref="form" label-width="160px" :inline="false">
                <el-form-item label="OST Title">
                    <el-input v-model="music.title" placeholder="eg: The war is over"></el-input>
                </el-form-item>
                <el-form-item label="Emotion Tag">
                    <el-input v-model="music.emotiontags" placeholder="eg: Melancholic,Anxious,"></el-input>
                    <div>
                        Here are some tags for you. You can select some or create your own.
                    </div>
                    <div>
                        <el-tooltip v-for="tag in emotionTagOptions" :key="tag.tag" :content="tag.desc"
                            placement="bottom">
                            <el-tag class="mr-2" type="danger"
                                :effect="isTagSelected(tag, 'emotiontags') ? 'dark' : 'plain'"
                                @click="selectTag(tag, 'emotiontags')">
                                {{ tag.tag }}
                            </el-tag>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item label="Scenes Tag">
                    <el-input v-model="music.scenetags" placeholder="eg: Battle Scenes,Historical Epics,"></el-input>
                    <div>
                        <el-tooltip v-for="tag in sceneTagOptions" :key="tag.tag" :content="tag.desc"
                            placement="bottom">
                            <el-tag class="mr-2" type="danger"
                                :effect="isTagSelected(tag, 'scenetags') ? 'dark' : 'plain'"
                                @click="selectTag(tag, 'scenetags')">
                                {{ tag.tag }}
                            </el-tag>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item label="Style Tag">
                    <el-input v-model="music.styletags" placeholder="eg: Orchestral,"></el-input>
                    <div>
                        <el-tooltip v-for="tag in styleTagOptions" :key="tag.tag" :content="tag.desc"
                            placement="bottom">
                            <el-tag class="mr-2" type="danger"
                                :effect="isTagSelected(tag, 'styletags') ? 'dark' : 'plain'"
                                @click="selectTag(tag, 'styletags')">
                                {{ tag.tag }}
                            </el-tag>
                        </el-tooltip>
                    </div>
                </el-form-item>

                <el-form-item class="mt-8">
                    <el-button type="primary" @click="onSubmit">Feel Lucky</el-button>
                    <el-button @click="isCreateShow = false">Cancel</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>
<script>
import { getToken } from '../auth'
import axios from 'axios'
import Card from './card.vue'
import tags from './tags.js'
export default {
    name: 'generate',
    components: { Card },
    data() {
        return {
            isCreateShow: false,
            music: { title: '', emotiontags: '', scenetags: "", styletags: "" },
            emotionTagOptions: tags.emotionTagOptions,
            sceneTagOptions: tags.sceneTagOptions,
            styleTagOptions: tags.styleTagOptions,
            myOSTs: [],
            total: 0
        }
    },
    mounted() {
        document.title = 'Generate - Sunost - Free Background Music for Games and Films'
        if (getToken()) {
            this.getMyOSTs()
        }
    },
    computed: {
        isTagSelected() {
            return (tag, field) => {
                return this.music[field].includes(tag.tag)
            }
        }
    },
    methods: {
        async create() {
            this.isCreateShow = true
        },

        selectTag(tag, field) {
            const t = new RegExp(tag.tag + ',', 'i')
            if (this.music[field].match(t)) {
                this.music[field] = this.music[field].replace(t, '')
            } else {
                this.music[field] += tag.tag + ','
            }
        },

        async onSubmit() {
            if (this.music.title === '') {
                ElMessage.warning('Don\'t forget the title for your masterpiece, Dude!')
                return
            }
            if (this.music.emotiontags === '' && this.music.scenetags === "" && this.music.styletags === '') {
                ElMessage.warning('Choose some tags, at least one, Dude!')
                return
            }
            const r = await axios.post('/sunost/generate', this.music)
            if (r.data.code !== 0) {
                if (r.data.msg === 'Sign in required') {
                    this.$emit('needLogin')
                }
                ElMessage.error(r.data.msg)
            }
            this.isCreateShow = false
            setTimeout(() => {
                this.getMyOSTs()
            }, 1000);
        },

        async getMyOSTs() {
            const r = await axios.post('/sunost/getMyOSTs')
            if (r.data.code === 0) {
                this.myOSTs = r.data.data.list;
                this.total = r.data.data.total;
                if (this.myOSTs[0].state !== 'success') {
                    setTimeout(() => {
                        this.getMyOSTs();
                    }, 5000);
                }
            } else {
                this.myOSTs = [];
                ElMessage.error(r.data.msg)
            }
        }
    }
}
</script>
<style scoped>
.generate {
    color: #c5c5c5;
}

.createbtn {
    text-decoration: underline;
}

.createbtn:hover {
    color: #fff;
}

.card {
    min-width: 220px;
}

.card:hover {
    scale: 1.05;
}
</style>