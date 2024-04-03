<template>
    <div class="chatbubble" :class="{ isRight: message.type === 'User' }">
        <div>
            {{ message.chat }}
        </div>
        <div class="time">{{ message.createdAt }}</div>
    </div>
</template>
<script lang="ts" setup>
const message = defineProps({
    chat: {
        type: String,
        default: "-"
    },
    // avatar: {
    //     type: String,
    // },
    type: {
        type: String,
        default: "User"
    },
    createdAt: {
        type: String,
        default: "--:--"
    }
})
</script>
<style scoped>
.chatbubble {
    padding: 16px 0;
    color: #fff;
    width: 100%;
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.isRight {
    text-align: right;
}

.time {
    color: #555
}
</style>