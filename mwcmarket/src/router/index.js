import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = []
routes = routes.concat(require('./paths/10_home').default.routes)

const router = new Router({
  mode: 'history',
  fallback: true,
  routes: routes,
})

global.vueRouter = router

router.afterEach((to, from) => {
  if (to.name === from.name && to.hash !== from.hash) return
  window.scrollTo(0, 0)
})

Vue.router = router

export default router
