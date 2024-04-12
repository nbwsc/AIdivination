<template>
  <RouterView @needLogin="onNeedLogin" @playclick="onPlayClicked" class="panel" />
</template>
<script>
import ChatBox from './views/ChatBox.vue'
import axios from 'axios';
export default {
  components: {
    ChatBox
  },

  data() {
    return {
      uuid: '',
      accessKey: '',
    }
  },
  mounted() {
   
  },
  computed: {
  },

  methods: {
    checkAccessKey() {
      axios.get('/api/checkAccessKey', {
        params: {
          accessKey: this.accessKey
        }
      }).then(res => {
        if (res.data.code === 200) {
        } else {
          ElMessage({
            message: 'AccessKey 验证失败',
            type: 'error',
          })
        }
      })
    }
  }
}
</script>
<style></style>