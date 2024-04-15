<template>
  <header class="navbar">
    <a href="https://toolss.ai" class="text-4xl flex  logo">
      <img src="@/assets/toolss2.png" alt="">
      <!-- <span>
        TOOLS
      </span>
      <span style="color:#cf4343">
        S
      </span> -->
    </a>
    <div class="menu">
      <nav class="pcnav">
        <RouterLink class="text-lm underline navitem" to="/">Home</RouterLink>
        <!-- <RouterLink class="text-lm underline navitem" to="/generate">Generate</RouterLink> -->
      </nav>
    </div>
  </header>
  <RouterView @needLogin="onNeedLogin" @playclick="onPlayClicked" class="panel" />
  <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" class="dialog" title="Login"
    v-model="showLogin" width="80%">
    <Login v-if="showLogin" @onLogin="onLogin"></Login>
  </el-dialog>
</template>
<script>
// import AudioPlayer from "@liripeng/vue-audio-player";
import axios from 'axios';
import Login from './views/login.vue'
import { getToken, removeToken } from './auth';
import { ElMessageBox } from 'element-plus';


export default {
  components: {
    Login
  },

  data() {
    return {
      title: '',
      playing: {
        src: '',
        title: 'No Music To Play',
        coverImage: '',
      },
      isShowPlayer: false,
      showLogin: false,
      account: {}
    }
  },
  created() {
    const token = getToken()
    if (token) {
      this.showLogin = false
      axios.defaults.headers.common['x-token'] = token
      this.info()
    }
  },
  computed: {
    SignInTXT() {
      return this.account._id ? this.account.username : 'Sign In'
    }
  },

  methods: {
    async info() {
      const r = await axios.get('/account/info')
      if (r.data.code === 0) {
        this.account = r.data.data.account
      } else {
        ElMessage.error(r.data.msg)
      }
    },

    handleBeforePlay(next) {
      this.$nextTick(() => {
        window.x = this.$refs.audioPlayerx
        this.$refs.audioPlayerx.play()
        this.title = this.audioList[this.$refs.audioPlayerx.currentPlayIndex].name
        next()
      })

    },

    onPlayClicked(ost) {
      if (!ost.audio_url) {
        return
      }
      this.$refs.audioPlayerx.pause();
      this.title = ost.title;
      // this.playlist = [ost.audio_url];
      this.playing = {
        ost_id: ost._id,
        src: ost.audio_url,
        title: ost.title,
        coverImage: ost.image_url,
      }
      this.$nextTick(() => {
        this.isShowPlayer = true
        this.$refs.audioPlayerx.play();
        this.reportPlay(ost);
      });
    },

    reportPlay(ost) {
      axios.get('/sunost/playCount?id=' + ost._id)
    },

    onPlay() {
      this.isShowPlayer = true
    },

    onEnded() {
      this.isShowPlayer = false
    },

    onNeedLogin() {
      this.showLogin = true
    },

    onLogin() {
      this.showLogin = false
      setTimeout(() => {
        this.info()
      }, 1);
    },

    onLoginClicked() {
      if (this.account._id) {
        // goto my page
        this.showLogin = false
        ElMessageBox.confirm('Are you sure to logout?', 'Logout', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(e => {
          this.account = {};
          removeToken()
        })
      } else {
        this.showLogin = true
      }
    }
  }
}
// const playlist = ref([])
// // const audioPlayerE = window.audioPlayer
// const title = ref('')
// function handleBeforePlay(next) {
//   // title.value = audioPlayer.audioList[audioPlayer.currentPlayIndex].title;
//   next(); // Start play
// }
// function onPlay(ost) {
//   console.log('onplay', ost)
//   title.value = ost.title;
//   playlist.value = [ost.audio_url];
//   // audioPlayerE.play();
// }
</script>
<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px;
  height: 60px;
  background-color: #2064bd;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100vw;
}

.logo {
  /* width: 120px; */
  height: 50px;
  line-height: 60px;
  margin-left: 40px;
  width: 180px;
  color: #c5c5c5;
  /* background-image: url('/favicon.ico');
  background-size: 100%; */
}


.menu {
  margin: 0 60px;
  color: #333;
  text-decoration: none;
}

.bold {
  font-weight: bold;
}

.navitem:hover {
  color: #ffffff;
}

.navitem {
  margin: 0 10px;
  color: #c5c5c5;
  text-decoration: none;
}

.panel {
  min-height: 100vh;
  background-color: #002142;
}
</style>