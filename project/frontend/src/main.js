import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false

let getUserInfo = (token) => {
  console.log('getuserInfo')
  axios.get('http://localhost:3000/api/userinfo', {
    headers: {
      'token': token
    }
  })
  .then(res => {
    console.log(res)
    store.state.isLogin = true
    store.state.userInfo.name = res.data[0].User_Name
  })
  .catch((err) => {
    console.log(err)
  })
}

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  console.log('localstorage token: ', token)
  if(token == null){
    console.log('no token')
  }
  else if(!store.state.isLogin){
    store.token = token
    getUserInfo(token)
  }
  //console.log(to)
  if(to.meta.auth === 1){
    //console.log("login required")
  }
  else if (to.meta.auth === 2){
    //console.log("this is for admin")
  }
  else{
    //console.log("yee")
  }
  console.log('next')
  next()
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
