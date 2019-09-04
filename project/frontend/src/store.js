import Vue from 'vue'
import Vuex from 'vuex'
import demoData from './demoData'
import axios from 'axios'
import router from './router.js'

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
    //token: localStorage.getItem('token'),
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
      console.log(payload)
      state.userInfo.name = payload.userName
      state.token = payload.accessToken
      state.isLogin = true
      state.isLoginError = false
      localStorage.setItem('token', payload.accessToken)
    },
    loginFail: (state) => {
      state.isLogin = false
      state.isLoginError = true
    },
    logout: (state) => {
      state.userInfo = null
      state.isLogin = false
      state.isLoginError = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    login: (context, payload) => {
      console.log(payload)
      //alert(`id: ${payload.id}, password: ${payload.password}`)
      console.log(context.state.beforeLogin)
      axios.post('http://localhost:3000/api/login', payload)
      .then(res => {
        //console.log(res)
        context.commit('loginSuccess', res.data)
        router.push({name: context.state.beforeLogin})
        //console.log(userInfo)
      })
      .catch(() => {
        alert('아이디와 비밀번호를 확인하세요')
        /*test
        context.commit('loginSuccess', {name: "hsw", accessToken: "fadsfa"})
        router.push({name: context.state.beforeLogin})
        */
      })
    },
    logout: (context) => {
      context.commit('logout')
    }
  }
})
