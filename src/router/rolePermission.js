import router from './index'
import whiteList from './whiteList'
import store from '../store'
import {decryptStr, isLogin} from '@/util/tool'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})
// 路由权限控制
var permissionList = []
function initRoute (routerParams) {
  return new Promise((resolve) => {
    store.dispatch('user/GetPermissionList').then((res) => {
      permissionList = res
      res.forEach(function (v) {
        let routeItem = routerParams.match(v.href)
        if (routeItem) {
          routeItem.meta.permission = v.permission ? v.permission : []
          routeItem.meta.label = v.label
        }
      })
      resolve()
    })
  })
}
// 路由生命周期
router.beforeEach((to, from, next) => {
  // console.log(to)
  NProgress.start()
  if (store.getters.token) {
      initRoute(router).then(res => { 
        var params = {
          label: to.name,
          value: to.path,
          query: to.query
        }
         // 页面标签配置
         store.commit('common/ADD_TAG', params)
         // 页面缓存配置
         store.commit('common/KEEP_ALIVE', store.getters.keepAlivePage)

         next()
      })
  } else {
    if (whiteList.indexOf(to.path) >= 0) {
      next()
    } else {
      NProgress.done()
      next({
        path: '/login',
        replace: true
      })
    }  
  }
})
// 路由生命周期
router.afterEach((to, from) => {
  NProgress.done()
})
