<template>
    <div>
        <Card :ost="ost"></Card>
    </div>
</template>
<script>
import axios from 'axios'
import Card from './card.vue';

export default {
    name: "ostdetial",
    data() {
        return {
            ost: {}
        };
    },
    components: {
        Card
    },
    mounted() {
        this.id = this.$route.query.id
        console.log(this.id)
        this.getOst()
    },
    methods: {
        async getOst() {
            const r = await axios.get('/sunost/getOst?id=' + this.id, {
            })
            this.ost = r.data.data.ost
            console.log(this.ost)
        }
    }
}
</script>