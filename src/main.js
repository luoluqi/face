// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 权限控制
//  import './router/rolePermission'
// 引入element框架
import ElementUI from 'element-ui'
// element主题配置
import './style/element-variables.scss'
// element语言配置
import locale from 'element-ui/lib/locale/lang/zh-CN'
// 多语言
import i18n from './i18n'
// 状态管理
import store from './store'
// 全局指令
import './directives/install'
// 全局mixins
import './mixins/install'
// 全局过滤器
import './filters/install'
// 引入font-awesome字体图标
import 'font-awesome/css/font-awesome.min.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(ElementUI, {size: 'small', zIndex: 3000, locale})
console.log(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
