import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import common from './modules/common'
import demo from './modules/demo'
import face from './modules/face'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    face
  },
  getters
})
export default store
