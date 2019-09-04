import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Forum from './views/Forum.vue'
import store from './store'

Vue.use(Router)

const Dates = () => import(/* webpackChunkName: "dates" */ './views/Dates.vue')
const Merchandises = () => import(/* webpackChunkName: "merchandises" */ './views/Merchandises.vue')
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue')
const Register = () => import(/* webpackChunkName: "register" */ './views/Register.vue')
const Mypage =  () => import(/* webpackChunkName: "mypage" */ './views/Mypage.vue')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forum',
      name: 'forum',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "forum" */ './views/Forum.vue')
      //component: About 
    },
    {
      path: '/dates',
      name: 'dates',
      component: Dates
    },
    {
      path: '/merchandises',
      name: 'merchandises',
      component: Merchandises
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage,
      beforeEnter: (to, from, next) => {
        if(!store.state.isLogin){
          alert('로그인이 필요한 기능입니다.')
          next({name: 'login', params: from})
        } 
        else{
          next()
        }
      }
    }
  ]
})
