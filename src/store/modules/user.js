import {login, getMenu, logout, chanPwd, getUserInfo, getAuthority, refreshToken, getMenuAuthority} from '@/api/userApi'
const user = {
    namespaced: true,
    state: {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
        role: JSON.parse(sessionStorage.getItem('role')) || [],
        token: sessionStorage.getItem('token') || '123456789',
        refreshToken: sessionStorage.getItem('refreshToken') || '',
        menu: [],
        permission: {}
    },
    getters: {},
    mutations: {
        SET_TOKEN: (state, params) => {
            state.token = params
            sessionStorage.setItem('token', params)
        },
        SET_REFRESH_TOKEN: (state, params) => {
          state.refreshToken = params
          sessionStorage.setItem('refreshToken', params)
        },
        SET_MENU: (state, params) => {
            state.menu = params
            sessionStorage.setItem('menu', JSON.stringify(params))
        },
        SET_ROLE: (state, params) => {
            state.role = params 
            sessionStorage.setItem('role', JSON.stringify(params))
        },
        SET_PERMISSION: (state, params) => {
          state.permission = params
          sessionStorage.setItem('permission', JSON.stringify(params))
        },
        SET_USER_INFO: (state, params) => {
            state.userInfo = params
            sessionStorage.setItem('userInfo', JSON.stringify(params))
        }
    },
    actions: {
        Login ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                login(params).then(res => {
                  console.log(res)
                  if (res.success) {
                    commit('SET_TOKEN', res.data.token)
                  }
                  // if (res.code == 1) {
                  //   commit('SET_TOKEN', res.data.accessToken)
                  //   commit('SET_REFRESH_TOKEN', res.data.refreshToken)
                  //   commit('SET_ROLE', res.data.permission)
                  //   commit('SET_PERMISSION', res.data.userAuthority)
                  //   commit('SET_USER_INFO', res.data)
                  // }
                  resolve(res)
                }).catch(error => {
                  reject(error)
                })
            })
        },
        Logout ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                logout(params).then(res => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLE', [])
                    // commit('SET_PERMISSION', [])
                    commit('SET_USER_INFO', {})
                    resolve(res)
                })
            })
        },
        RefreshToken ({state, commit, dispatch}, params) {
          return new Promise((resolve, reject) => {
              refreshToken(params).then(res => {
                  // 登录成功，存入token、role（自定义的一个值）、userinfo
                  if (res.code == 1) {
                      commit('SET_TOKEN', res.data.accessToken)
                      commit('SET_REFRESH_TOKEN', res.data.refreshToken)
                  }
                  resolve(res)
              }).catch(error => {
                  reject(error)
              })
          })
        },
        ChanPwd ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                chanPwd(params).then(res => {
                    console.log(res)
                    resolve(res)
                })
            })
        },
        GetUserInfo ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getUserInfo(params).then(res => {
                    commit('SET_ROLE', res.data.role)
                    commit('SET_USER_INFO', res.data)
                    resolve(res)
                })
            })
        },
        GetMenu ({state, commit, dispatch, rootGetters, rootState}, params) {
            return new Promise((resolve, reject) => {
                // console.log(state.role)
                if (rootGetters.cookiesObj) {
                    var role = rootGetters.cookiesObj.roleCode
                } else {
                    role = 'SchoolAdmin'
                }
                
                getMenu(role).then(res => {
                    commit('SET_MENU', res.data)
                    resolve(res)
                })
            })
        },
        GetAuthority ({state, commit, dispatch}, params) {
          return new Promise((resolve, reject) => {
              getAuthority(params).then(res => {
                  resolve(res)
              })
          })
        },
        GetMenuAuthority ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                params = state.permission
                // console.log(params)
                getMenuAuthority(params).then(res => {
                    // console.log(res.data)
                    commit('SET_MENU', res.data)
                    resolve(res)
                })
            })
        },
        // 将菜单列表扁平化形成权限列表
        GetPermissionList ({state, dispatch}) {
            return new Promise((resolve) => {
                let permissionList = []
                // 将菜单数据扁平化为一级
                function flatNavList (arr) {
                    for (let v of arr) {
                        if (v.children && v.children.length) {
                            flatNavList(v.children)
                        } else {
                            permissionList.push(v)
                        }
                    }
                }
                // console.log(456)
                
                dispatch('GetUserInfo', state.token).then(res => {
                    // console.log(res)
                    dispatch('GetMenu').then(res => {
                        // console.log(res)
                        flatNavList(state.menu)
                        resolve(permissionList)
                    })
                })
                // dispatch('RefreshToken', {refreshToken: state.refreshToken}).then(res => {
                //   dispatch('GetMenuAuthority').then(res => {
                //       flatNavList(state.menu)
                //       resolve(permissionList)
                //     })
                // }).catch(error => {
                //     console.log(error)
                //     commit('SET_TOKEN', '')
                //     location.reload()
                // })
            })
        }
    }
}
export default user
