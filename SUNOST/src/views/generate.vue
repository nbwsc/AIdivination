<template>
    <div class="p-16 generate">
        <div class="cursor-pointer underline createbtn" @click="create">
            Create Your Masterpiece
            <span class="bold" v-if="!myOSTs.length">
                For FREE!
            </span>
            <span v-else>(cost 20 balance for 2 songs once)</span>
        </div>
        <div class="text-2xl mt-8 bold"># My OST</div>
        <div class="mt-4 flex flex-wrap ">
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
export default {
    name: 'generate',
    components: { Card },
    data() {
        return {
            isCreateShow: false,
            music: { title: '', emotiontags: '', scenetags: "", styletags: "" },
            emotionTagOptions: [
                { "tag": "Euphoric", "desc": "Evoking intense happiness and excitement, often used in triumphant or exhilarating moments." },
                { "tag": "Melancholic", "desc": "Reflecting deep sadness or longing, suitable for scenes of reflection or loss." },
                { "tag": "Serene", "desc": "Conveying a sense of peace and calm, ideal for tranquil, reflective, or beautiful natural scenes." },
                { "tag": "Anxious", "desc": "Generating a sense of unease or nervousness, perfect for suspenseful or uncertain moments." },
                { "tag": "Romantic", "desc": "Capturing the essence of love and affection, ideal for scenes of romance or deep emotional connection." },
                { "tag": "Majestic", "desc": "Imparting a sense of grandeur or awe, suitable for epic landscapes or significant moments." },
                { "tag": "Nostalgic", "desc": "Evoking a sentimental longing for the past, fitting for reminiscing or historical scenes." },
                { "tag": "Mystical", "desc": "Creating a feeling of enchantment or mystery, perfect for fantasy or mysterious segments." },
                { "tag": "Empowering", "desc": "Inspiring motivation and confidence, suitable for moments of personal triumph or overcoming obstacles." },
                { "tag": "Humorous", "desc": "Inducing laughter or amusement, ideal for light-hearted, funny, or quirky scenes." }
            ],
            sceneTagOptions: [
                { "tag": "Battle Scenes", "desc": "Intense and dynamic music that fuels the excitement and tension of combat or action sequences." },
                { "tag": "Love Stories", "desc": "Tender and emotive scores that underscore romantic encounters and relationships." },
                { "tag": "Space Adventures", "desc": "Futuristic and often electronic music that captures the vastness and mystery of space exploration." },
                { "tag": "Historical Epics", "desc": "Music that embodies the spirit and atmosphere of a bygone era, often incorporating traditional instruments and melodies." },
                { "tag": "Horror Suspense", "desc": "Creepy and dissonant sounds that heighten the sense of fear and anticipation in horror movies or suspenseful scenes." },
                { "tag": "Fantasy Worlds", "desc": "Enchanting and otherworldly music that transports listeners to magical realms and fantastical landscapes." },
                { "tag": "Detective Mysteries", "desc": "Intriguing and often jazzy music that complements the puzzle-solving aspect of detective stories and whodunits." },
                { "tag": "Sports Triumphs", "desc": "Energetic and uplifting music that captures the spirit of competition and the joy of victory in sports narratives." },
                { "tag": "Coming of Age", "desc": "Reflective and often nostalgic music that accompanies stories about growing up and personal development." },
                { "tag": "Sci-Fi Thrillers", "desc": "Music that blends electronic elements with traditional scoring to create a sense of technological awe and tension." }
            ],
            styleTagOptions: [
                { "tag": "Orchestral", "desc": "Rich and dynamic, utilizing full orchestras to create a wide range of emotional tones, from epic to subtle." },
                { "tag": "Electronic", "desc": "Incorporating synthetic sounds and beats, suitable for modern, futuristic, or abstract themes." },
                { "tag": "Jazz", "desc": "Featuring improvisation and swing rhythms, perfect for creating a mood of sophistication or nostalgic settings." },
                { "tag": "Rock", "desc": "Energetic and driven, using electric guitars and strong rhythms, ideal for action-packed scenes or rebellious themes." },
                { "tag": "Folk", "desc": "Emphasizing acoustic instruments and traditional melodies, creating a sense of community or cultural heritage." },
                { "tag": "Ambient", "desc": "Focused on creating an atmospheric mood without a definitive structure, suitable for background music in reflective or tense scenes." },
                { "tag": "Classical", "desc": "Utilizing compositions from classical music to evoke elegance, drama, or historical settings." },
                { "tag": "World Music", "desc": "Drawing from music traditions around the globe, ideal for providing an authentic sense of place or culture." },
                { "tag": "Choral", "desc": "Featuring vocal performances by choirs, can add a layer of majesty, spirituality, or haunting beauty." },
                { "tag": "Minimalist", "desc": "Using repetition and simple melodic structures to create a focused and contemplative atmosphere." }
            ],
            myOSTs: [],
            total: 0
        }
    },
    mounted() {
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