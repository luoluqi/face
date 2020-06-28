import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/themes/layout/index'
import store from '../store'

Vue.use(Router)
// 路由实例
const router = new Router({
  scrollBehavior (to, from, savedPosition) { // 路由滚动行为
    if (savedPosition) {
        return savedPosition
    } else {
        const position = {}
        if (to.hash) {
            position.selector = to.hash
        }
        if (to.matched.some(m => m.meta.scrollToTop)) {
            position.x = 0
            position.y = 0
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(position)
            }, 100)
        })
    }
  },
  routes: [
    {
      path: '/face',
      name: '',
      component: () => import('../themes/views/index'),
      children: [
        {
          path: 'home',
          name: '首页',
          component: () => import('../themes/views/face/home')
        },
        {
          path: 'classDetail',
          name: '班级详情',
          component: () => import('../themes/views/face/classDetail')
        },
        {
          path: 'teacherDetail',
          name: '教师详情',
          component: () => import('../themes/views/face/teacherDetail')
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../themes/views/test')
    },
    {
      path: '/',
      redirect: '/face/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "group-foo" */'../themes/login/Login')
    },
    {
      path: '*',
      redirect: '/error/404'
    },
    {
      path: '/error/403',
      name: 'Error403',
      component: () => import(/* webpackChunkName: "group-foo" */'../themes/error/403')
    },
    {
      path: '/error/404',
      name: 'Error404',
      component: () => import(/* webpackChunkName: "group-foo" */'../themes/error/404')
    }
  ]
})
router.beforeEach((to, from, next) => {
  // store
  //   .dispatch('common/GgetTokenByPC', '')
  //   .then(res => {
  //     // console.log(JSON.parse(res))
  //     next()
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     next()
  //   })  
    next()
})
router.afterEach((to, from) => {
  // window.document.title = to.meta.title
})
export default router
