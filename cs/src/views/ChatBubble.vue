<template>
    <div class="chatbubble" :class="{ isRight: message.type === 'User' }">
        <div class="text-sm">
            {{ message.chat }}
        </div>
        <div class="time text-xs">{{ message.createdAt }}</div>
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
    padding: 4px 0;
    color: #555;
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
    color: #c5c5c5;
}
</style>