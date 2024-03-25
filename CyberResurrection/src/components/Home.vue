<template>
    <div class="panel">
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 0">
                <div class="text">
                    这里是为了让您与那些已经过世的人联系。
                </div>
                <div class="text">
                    请告诉我们关于{{ h }}的一些信息。
                </div>

                <el-button type="primary" size="default" @click="next([])">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 1">
                <div class="text">{{ h }}的姓名是？</div>
                <el-input v-model="character.lastName" placeholder="姓" size="normal"></el-input>
                <el-input v-model="character.firstName" placeholder="名" size="normal"></el-input>
                <el-select v-model="character.pronoun" value-key="" placeholder="性别" filterable @change="changH">
                    <el-option v-for="item in ['先生', '女士']" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
                <div>
                    <div class="text">
                        {{ h }}是你的
                    </div>
                    <el-input v-model="character.relation" placeholder="关系" size="normal"></el-input>
                </div>
                <el-button type="primary" size="default"
                    @click="next(['lastName', 'firstName', 'pronoun', 'relation'])">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 2">
                <div>
                    <div class="text">
                        {{ h }}的生日是？
                    </div>
                    <el-date-picker v-model="character.birthDate" type="date" size="normal" placeholder="选择日期时间">
                    </el-date-picker>
                    <div class="text">
                        {{ h }}离开的日期是？
                    </div>
                    <el-date-picker v-model="character.deathDate" type="date" size="normal" placeholder="选择日期时间">
                    </el-date-picker>
                    <div class="text">
                        {{ h }}的离世原因是？
                    </div>
                    <el-input v-model="character.causeOfDeath" placeholder="离世原因" size="normal"></el-input>
                    <div class="text">
                        {{ h }}的宗教是？
                    </div>
                    <el-input v-model="character.religion" placeholder="宗教" size="normal"></el-input>
                </div>
                <el-button type="primary" size="default"
                    @click="next(['birthDate', 'deathDate', 'causeOfDeath', 'religion'])">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 3">
                <div class="text">
                    {{ h }}的性格特点是？
                </div>
                <div style="color:#888">
                    （1 - 5分，5分为满分）
                </div>
                <div class="text-s">
                    外向性
                </div>
                <el-select v-model="character.ExtraversionIndex" value-key="" placeholder="外向和社交行为" filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="text-s">
                    友好度
                </div>
                <el-select v-model="character.AgreeablenessIndex" value-key="" placeholder="合作和富有同情心的倾向" filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="text-s">
                    开放性
                </div>
                <el-select v-model="character.OpennessIndex" value-key="" placeholder="接受新经验和方法" filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="text-s">
                    责任心
                </div>
                <el-select v-model="character.ConscientiousnessIndex" value-key="" placeholder="有组织性和责任感的倾向" filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="text-s">
                    神经质
                </div>
                <el-select v-model="character.NeuroticismIndex" value-key="" placeholder="容易情绪不稳定和负面情绪" filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <el-button type="primary" size="default"
                    @click="next(['ExtraversionIndex', 'AgreeablenessIndex', 'OpennessIndex', 'ConscientiousnessIndex', 'NeuroticismIndex'])">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 4">
                <div class="text">
                    {{ h }}曾经说过的话或写过的文字是
                    <el-input type="textarea" v-model="character.writingSyle" :placeholder="'更多的信息帮助我们更好的了解' + h"
                        :maxlength="300" :show-word-limit="300" :autosize="{ minRows: 4, maxRows: 10 }">
                    </el-input>
                </div>
                <el-button type="primary" size="default" @click="next(['writingSyle'])">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 5">
                <div class="text">
                    {{ h }}的其他关系是？
                </div>
                <el-button type="primary" size="default" @click="addRelation">添加关系</el-button>
                <div v-for="(relation, i) in character.otherRelations" :key="i">
                    <el-row :gutter="20">
                        <span class="text">{{ h }}的</span>
                        <el-input style="width:8rem" v-model="relation.relation" placeholder="关系"
                            size="normal"></el-input>
                        <span class="text">是</span>
                        <el-input style="width:8rem" v-model="relation.name" placeholder="名字" size="normal"></el-input>
                    </el-row>
                </div>
                <el-button type="primary" size="default" @click="gotoChat()">开始聊天</el-button>
            </div>
        </transition>

    </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
const h = ref('他/她')
const changH = (val: string) => {
    h.value = val === '先生' ? '他' : '她'
}
const indexOptions = [
    { label: '1 几乎没有', value: 1 },
    { label: '2 很轻微', value: 2 },
    { label: '3 有一点', value: 3 },
    { label: '4 比较多', value: 4 },
    { label: '5 很典型', value: 5 },
]

const character: any = ref({
    _id: undefined,
    //     firstName: '如玉',
    //     lastName: '王',
    //     pronoun: '先生',// 称呼/性别（先生/女士）
    //     birthDate: '1991-01-03',//出生时间
    //     deathDate: '2023-10-01',//死亡时间
    //     causeOfDeath: '车祸',//死因
    //     religion: '佛教',// 宗教

    //     ExtraversionIndex: 2,// 外向性：外向和社交行为
    //     AgreeablenessIndex: 3,//宜人：合作和富有同情心的倾向
    //     OpennessIndex: 4,//开放性：接受新经验和方法
    //     ConscientiousnessIndex: 5,// 责任心：有组织性和责任感的倾向
    //     NeuroticismIndex: 1,//神经质：容易情绪不稳定和负面情绪

    //     writingSyle: `时间就像海绵里的水，只要愿挤，总还是有的。
    // 倘若只看书，便变成书橱。
    // 我好象是一只牛，吃的是草，挤出的是奶、血。
    // 其实地上本没有路，走的人多了，也便成了路。
    // 哪里有天才，我只不过是把别人喝咖啡的时间都用在工作上了。`,// 写作/说话风格 他们曾经说过的话/写过的文字

    //     relation: '哥哥',// 和我的关系

    //     otherRelations: [{ // 死者 的 {relation} 是 {name}
    //         name: '张大千',
    //         relation: '母亲'
    //     }],
    //     talkabout: '女朋友',// 谈话主题
    //     userMood: '悲伤',//用户心情

    firstName: '',
    lastName: '',
    pronoun: '',// 称呼/性别（先生/女士）
    birthDate: '',//出生时间
    deathDate: '',//死亡时间
    causeOfDeath: '',//死因
    relation: '',// 和我的关系
    religion: '',// 宗教

    ExtraversionIndex: "",// 外向性：外向和社交行为
    AgreeablenessIndex: "",//宜人：合作和富有同情心的倾向
    OpennessIndex: "",//开放性：接受新经验和方法
    ConscientiousnessIndex: "",// 责任心：有组织性和责任感的倾向
    NeuroticismIndex: "",//神经质：容易情绪不稳定和负面情绪

    writingSyle: "",// 写作/说话风格 他们曾经说过的话/写过的文字


    otherRelations: [],
    talkabout: '',// 谈话主题
    userMood: '',//用户心情
})

const currentStep = ref(0)
const next = (params: Array<string>) => {
    // check params
    if (params.length > 0) {
        for (let i = 0; i < params.length; i++) {
            if (!character.value[params[i]]) {
                return ElMessage.error('请填写完整信息')
            }
        }
    }
    saveCharactor()
    const nextStep = currentStep.value + 1;
    currentStep.value = -1;
    setTimeout(() => {
        currentStep.value = nextStep
    }, 800)
}

function addRelation() {
    if (character.value.otherRelations.length >= 5) return ElMessage.warning('最多添加5个关系')
    character.value.otherRelations.push({
        name: '',
        relation: ''
    })
}
async function saveCharactor() {
    const r = await axios.post('http://leapcapital.cn:8099/CyberResurrection/upsertCharacter', {
        data: character.value
    })
    character.value._id = r.data.data._id
}

async function gotoChat() {
    await saveCharactor()
    window.location.href = '/chat?id=' + character.value._id
}

</script>
<style lang="css">
.page {
    padding: 20px;
    text-align: center;
    width: 100vw;
    max-width: 780px;
    height: 100vh;
    background-color: #000;
    color: white;

}

.panel {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #000;
    align-items: center;
    flex-direction: column;
    padding: 10%;
}

.text {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 1rem;
}

.text {
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 1rem;
}

.el-input {
    width: 80%;
    margin-bottom: 8px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
}

.el-input__count {
    background-color: #0000 !important;
}

.el-select {
    width: 80%;
    margin-bottom: 8px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
}

.el-textarea__inner {
    margin-bottom: 8px;
    line-height: 42px;
    height: 42px;
    background-color: #0000;
    font-size: 18px;
}

.el-select__wrapper {
    line-height: 42px;
    height: 42px;
    background-color: #0000;
    font-size: 18px;
}

.el-input__wrapper {
    width: 80%;
    height: 42px;
    font-size: 18px;
    background-color: #0000;
}

.el-button {
    margin: 8px;
    margin-top: 32px;
    height: 42px;
    font-size: 18px;
    width: 80%;
    background-color: #0000;
    border: 1px solid #fff;
    border-radius: 21px;
}

.el-button:hover {
    color: #fff;
    border-color: #aaa;
    background-color: #aaa;
    outline: 0;
}

.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
    width: 80%;
    height: 42px;
}

.slide-fade-enter-active {
    transition: all 1s ease-out;
}

.slide-fade-leave-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>