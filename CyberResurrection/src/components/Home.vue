<template>
    <div class="panel">
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 0">
                <div>
                    我们来这里是为了将您与那些已经过世的人联系起来。
                </div>
                <el-button type="primary" size="default" @click="next">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 1">
                <div>{{ h }}的姓名是？</div>
                <el-input v-model="character.lastName" placeholder="姓" size="normal" clearable></el-input>
                <el-input v-model="character.firstName" placeholder="名" size="normal" clearable></el-input>
                <el-select v-model="character.pronoun" value-key="" placeholder="姓别" filterable @change="changH">
                    <el-option v-for="item in ['先生', '女士']" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
                <div>
                    <div>
                        {{ h }}是你的
                    </div>
                    <el-input v-model="character.relation" placeholder="关系" size="normal" clearable></el-input>
                </div>
                <el-button type="primary" size="default" @click="next">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 2">
                <div>
                    <div>
                        {{ h }}的生日是？
                    </div>
                    <el-date-picker v-model="character.birthDate" type="date" size="normal" placeholder="选择日期时间">
                    </el-date-picker>
                    <div>
                        {{ h }}离开的日期是？
                    </div>
                    <el-date-picker v-model="character.deathDate" type="date" size="normal" placeholder="选择日期时间">
                    </el-date-picker>
                    <div>
                        {{ h }}的死因是？
                    </div>
                    <el-input v-model="character.causeOfDeath" placeholder="死因" size="normal" clearable></el-input>
                    <div>
                        {{ h }}的宗教是？
                    </div>
                    <el-input v-model="character.religion" placeholder="宗教" size="normal" clearable></el-input>
                </div>
                <el-button type="primary" size="default" @click="next">继续</el-button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="page" v-if="currentStep === 3">
                <div>
                    {{ h }}的性格特点是？（1 - 5分，1分为无，5分为满分）
                </div>
                <div>
                    外向性：外向和社交行为
                </div>
                <el-select v-model="character.ExtraversionIndex" value-key="" placeholder="" clearable filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div>
                    宜人：合作和富有同情心的倾向
                </div>
                <el-select v-model="character.AgreeablenessIndex" value-key="" placeholder="" clearable filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div>
                    开放性：接受新经验和方法
                </div>
                <el-select v-model="character.OpennessIndex" value-key="" placeholder="" clearable filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div>
                    责任心：有组织性和责任感的倾向
                </div>
                <el-select v-model="character.ConscientiousnessIndex" value-key="" placeholder="" clearable filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div>
                    神经质：容易情绪不稳定和负面情绪
                </div>
                <el-select v-model="character.NeuroticismIndex" value-key="" placeholder="" clearable filterable>
                    <el-option v-for="item in indexOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <el-button type="primary" size="default" @click="next">继续</el-button>
            </div>
        </transition>
        <div class="page" v-if="currentStep === 4">
            <div>
                {{ h }}曾经说过的话/写过的文字是
                <el-input type="textarea" v-model="character.writingSyle" placeholder="更多的信息帮助我们更好的了解{{ h }}"
                    :maxlength="300" :show-word-limit="300" :autosize="{ minRows: 4, maxRows: 10 }">
                </el-input>
            </div>
            <el-button type="primary" size="default" @click="next">继续</el-button>
        </div>
        <div class="page" v-if="currentStep === 5">
            <div>
                {{ h }}的其他关系是？
            </div>
            <el-button type="primary" size="default"
                @click="character.otherRelations.push({ relation: '', name: '' })">添加关系</el-button>
            <div v-for="(relation, i) in character.otherRelations" :key="i">
                <el-row :gutter="20">
                    <span>{{ h }}的</span>
                    <el-input v-model="relation.relation" placeholder="关系" size="normal" clearable></el-input>
                    <span>是</span>
                    <el-input v-model="relation.name" placeholder="名字" size="normal" clearable></el-input>
                </el-row>

            </div>
            <el-button type="primary" size="default" @click="next">继续</el-button>
        </div>
        <div class="page" v-if="currentStep === 6">
            <div>
                我们来这里是为了将您与那些已经超越的人联系起来。
            </div>
            <el-button type="primary" size="default" @click="next">继续</el-button>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const h = ref('他/她')
const changH = (val: string) => {
    h.value = val === '先生' ? '他' : '她'
}
const indexOptions = [
    { label: '1 几乎不', value: 1 },
    { label: '2 很轻微', value: 2 },
    { label: '3 有一点', value: 3 },
    { label: '4 比较多', value: 4 },
    { label: '5 很典型', value: 5 },
]

const character = ref({
    firstName: '如玉',
    lastName: '王',
    pronoun: '先生',// 称呼/性别（先生/女士）
    birthDate: '1991-01-03',//出生时间
    deathDate: '2023-10-01',//死亡时间
    causeOfDeath: '车祸',//死因
    relation: '哥哥',// 和我的关系
    religion: '佛教',// 宗教

    ExtraversionIndex: 2,// 外向性：外向和社交行为
    AgreeablenessIndex: 3,//宜人：合作和富有同情心的倾向
    OpennessIndex: 4,//开放性：接受新经验和方法
    ConscientiousnessIndex: 5,// 责任心：有组织性和责任感的倾向
    NeuroticismIndex: 1,//神经质：容易情绪不稳定和负面情绪

    writingSyle: `时间就像海绵里的水，只要愿挤，总还是有的。
倘若只看书，便变成书橱。
我好象是一只牛，吃的是草，挤出的是奶、血。
其实地上本没有路，走的人多了，也便成了路。
哪里有天才，我只不过是把别人喝咖啡的时间都用在工作上了。`,// 写作/说话风格 他们曾经说过的话/写过的文字


    otherRelations: [{ // 死者 的 {relation} 是 {name}
        name: '张大千',
        relation: '母亲'
    }],
    talkabout: '女朋友',// 谈话主题
    userMood: '悲伤',//用户心情}
})

const currentStep = ref(0)
const next = () => {
    const nextStep = currentStep.value + 1;
    currentStep.value = -1;
    setTimeout(() => {
        currentStep.value = nextStep
    }, 800)
}
</script>
<style lang="css" scoped>
.page {
    padding: 20px;
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    color: white;
}

.panel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #000;
    align-items: center;
    flex-direction: column;
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