import {getDemoList, getUserList, getSystemList, getRoleList} from '@/api/demoApi'
const demo = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
      GetDemoList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getDemoList(params).then(res => {
                resolve(res)
            })
        })
      },
      GetUserList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getUserList(params).then(res => {
                resolve(res)
            })
        })
      },
      GetSystemList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getSystemList(params).then(res => {
                resolve(res)
            })
        })
      },
      GetRoleList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getRoleList(params).then(res => {
                resolve(res)
            })
        })
      }
    }
}
export default demo
