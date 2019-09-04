import Vue from 'vue'
import Vuex from 'vuex'
import demoData from './demoData'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: ['Home', 'Dates & Tickets', 'Merchandises', 'News', 'Forum'],
    Links: [
      {
        name: 'Home',
        routerName: 'home'
      },
      {
        name: 'Dates',
        routerName: 'dates'
      },
      {
        name: 'Merchandises',
        routerName: 'merchandises'
      },
      {
        name: 'Forum',
        routerName: 'forum'
      },
      {
        name: 'MyPage',
        routerName: 'mypage'
      }
    ],
    Teams: [
      'Tigers', 
      'Eagles', 
      'Heroes', 
      'Bears', 
      'Lions', 
      'Giants', 
      'Twins', 
      'Wiz', 
      'Dinos', 
      'Wyverns'
    ],
    test: 'test',
    demoData: demoData,
    userInfo: {
      name: "",
      email: "",
    },
    isLogin: false,
    isLoginError: false,
    token: "",
    beforeLogin: "Home"
  },
  getters: {
    loginRedirect: (state, name) => {
      state.beforeLogin = name
    }
  },
  mutations: {
    loginSuccess: (state, payload) => {
      state.userInfo = payload
      state.isLogin = true
      state.isLoginError = false
    },
    loginFail: (state) => {
      state.isLogin = false
      state.isLoginError = true
    },
    logout: (state) => {
      state.userInfo = null
      state.isLogin = false
      state.isLoginError = false
    }
  },
  actions: {
    login: (context, payload) => {
      console.log(payload)
      //alert(`id: ${payload.id}, password: ${payload.password}`)
      console.log(context.state.beforeLogin)
      axios.post('http://localhost:3000/api/login', payload)
      .then(res => {
        console.log(res)
        this.$router.push({name: context.state.beforeLogin})
      })
      .catch(() => {
        alert('아이디와 비밀번호를 확인하세요')
      })
    }
  }
})
