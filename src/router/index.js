import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import {isWeixin, hasWxCode, getweixinCode, omitCode} from '../lib/weixin'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
let routerInited = false
router.beforeEach((to, from, next) => {
  if (!routerInited) {
    routerInited = true
    let goPath = {
      path: to.path,
      query: to.query
    }
    if (isWeixin()) {
      goPath = omitCode(goPath)
      if (!hasWxCode(to.query)) {
        getweixinCode()
        return false
      }
    }
    next(goPath)
  } else {
    next()
  }
})
export default router
