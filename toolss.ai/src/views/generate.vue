<template>
    <div class="p-16 generate">
        <div class="text-2xl cursor-pointer underline createbtn mt-8" @click="create">
            Create Your Masterpiece
        </div>

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
        }
    },
    mounted() {
        document.title = 'Generate '
    },
    computed: {
    },
    methods: {
    }
}
</script>
<style scoped></style>