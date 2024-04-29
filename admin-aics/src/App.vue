<template>
  <header class="navbar">
    <div class="text-4xl flex logo">
      <span>
        AICS
      </span>
    </div>
    <div class="menu">
      <nav class="pcnav">
        <RouterLink class="text-lm underline navitem" to="/">首页</RouterLink>
        <RouterLink class="text-lm underline navitem" to="/console">控制台</RouterLink>
        <el-tooltip v-if="account._id" content="Click to Logout" placement="top" effect="dark">
          <a class="text-lm navitem" @click="onLoginClicked">{{ this.account.name }}</a>
        </el-tooltip>
        <RouterLink v-else class="text-lm underline navitem" to="/login">登陆</RouterLink>

      </nav>
    </div>
  </header>
  <RouterView class="viewpanel" @needLogin="onNeedLogin" @onLogin="onLogin" />
</template>
<script>
import axios from 'axios';
import { getToken, removeToken } from './auth';
import { ElMessageBox } from 'element-plus';



export default {
  components: {
  },

  data() {
    return {
      title: '',
      account: {}
    }
  },

  created() {
    const token = getToken()
    if (token) {
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
      const token = getToken()
      const r = await axios.get('/aics/admininfo?token=' + token)
      if (r.data.code === 0) {
        this.account = r.data.data.account
        this.$store.commit('setCompany', this.account)
        this.$store.commit('setLogin', true)
      } else {
        ElMessage.error(r.data.msg)
        removeToken()
      }
    },


    onNeedLogin() {
      this.$router.push('/login')
    },

    onLogin() {
      setTimeout(() => {
        this.info()
      }, 1);
    },

    onLoginClicked() {
      if (this.account._id) {
        // goto my page
        ElMessageBox.confirm('Are you sure to logout?', 'Logout', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(e => {
          this.account = {};
          removeToken()
        })
      } else {
      }
    }
  }
}
</script>
<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px;
  height: 60px;
  background-color: #2e8dba;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100vw;
}

.logo {
  width: 120px;
  height: 50px;
  line-height: 60px;
  margin-left: 40px;
  width: 120px;
  margin-top: 10px;
  color: #d0c30f;
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
  color: #fff;
  text-decoration: none;
}

.viewpanel {
  margin-top: 60px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.isshow {
  bottom: 0px;
}
</style>