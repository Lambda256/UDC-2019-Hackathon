import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Forum from './views/Forum.vue'

Vue.use(Router)

const Dates = () => import(/* webpackChunkName: "dates" */ './views/Dates.vue')
const Merchandises = () => import(/* webpackChunkName: "merchandises" */ './views/Merchandises.vue')

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
  ]
})
