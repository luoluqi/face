import axios from './axios'
import qs from 'qs'
import {baseUrl} from '@/config/config'
import '../mock/userMock'
import menu from '../mock/menuMock'
export const login = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/user/login',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            var data = res.data
            if (params.username == data.account[0].username && params.password == data.account[0].password) {
                resolve({data: {token: '123456789'}, message: '登录成功', success: true})
            } else if (params.username == data.account[1].username && params.password == data.account[1].password) {
                resolve({data: {token: '987654321'}, message: '登录成功', success: true})
            } else {
                resolve({data: {}, message: '登录失败', success: false})
            }
        })
    })
}
export const logout = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/user/login',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            resolve({message: '登出成功', success: true})
        })
    })
}
/**
 * 刷新token
 * @param {refreshToken} params
 */
export const refreshToken = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/api/sysuser/refresh',
          method: 'get',
          headers: {
              'refresh_token': params.refreshToken
          }
      }).then(res => {
          resolve(res.data)
      }).catch(error => {
          reject(error)
      })
  })
}
export const chanPwd = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/user/chanPwd',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            var data = res.data
            console.log(res)
            if (data.pwd.password == params.oldPwd) {
                resolve({message: '成功', success: true})
            } else {
                resolve({message: '失败', success: false})
            }
        })
    })
}

export const getUserInfo = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/user/userInfo',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            if (params == '123456789') {
                resolve({data: res.data.userInfo, message: '获取用户信息成功', success: true})
            } else {
                res.data.userInfo.role = ['admin']
                resolve({data: res.data.userInfo, message: '获取用户信息成功', success: true})
            }
        })
    })
}

export const getMenu = (params) => {
    return new Promise((resolve, reject) => {
        // axios({
        //     url: baseUrl + '/user/menu',
        //     method: 'post',
        //     data: qs.stringify(params)
        // }).then(res => {
        //     resolve({data: res.data[params], message: '获取成功', success: true})
        // })
        resolve({data: menu[params], message: '获取成功', success: true})
    })
}

/**
 * 获取系统权限集合
 * @param {} params
 */
export const getAuthority = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/api/authority',
          method: 'get'
      }).then(res => {
          resolve(res.data)
      })
  })
}
/**
* 获取系统权限集合生成菜单列表
* @param {} params
*/
export const getMenuAuthority = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + '/api/authority',
          method: 'get'
      }).then(res => {
          var permissionList = res.data.data
          var permissionData = params
          var userBool = false
          var logBool = false
          var systemBool = false
          permissionList.forEach((item, index) => {
              permissionList[index].label = item.describe
              if (item.children && item.children.length > 0) {
                  item.children.forEach((child, j) => {
                      permissionList[index].children[j].label = child.describe
                      permissionList[index].children[j].permission = []
                      permissionList[index].children[j].show = false
                      permissionList[index].children[j].href = ''
                      params.forEach((auth, i) => {
                          if (child.code == auth.code) {
                              // console.log(child)
                              permissionList[index].children[j].label = child.describe
                              permissionList[index].children[j].permission = auth.permissions.indexOf('edit') >= 0 ? ['view', 'add', 'delete', 'edit'] : auth.permissions.split(',')
                              if (child.describe == '意见反馈') {
                                  permissionList[index].children[j].href = '/feedback/feedback'
                                  permissionList[index].children[j].icon = 'fa fa-file-text'
                                  permissionList[index].children[j].show = permissionList[index].children[j].permission[0] != ''
                              }
                              if (child.describe == '管控异常反馈') {
                                  permissionList[index].children[j].href = '/feedback/app-feedback'
                                  permissionList[index].children[j].icon = 'fa fa-file-text'
                                  permissionList[index].children[j].show = permissionList[index].children[j].permission[0] != ''
                              }
                              if (child.describe == '操作日志') { 
                                  permissionList[index].children[j].href = '/log/log'
                                  permissionList[index].children[j].icon = 'fa fa-file-text'
                                  permissionList[index].children[j].show = permissionList[index].children[j].permission[0] != ''
                              }
                              if (child.describe == '系统日志') {
                                  permissionList[index].children[j].href = '/log/system-log'
                                  permissionList[index].children[j].icon = 'fa fa-file-text'
                                  permissionList[index].children[j].show = permissionList[index].children[j].permission[0] != ''
                              }
                              if (child.describe == '系统用户管理') {
                                  permissionList[index].children[j].href = '/system/index'
                                  permissionList[index].children[j].icon = 'fa fa-file-text'
                                  permissionList[index].children[j].show = permissionList[index].children[j].permission[0] != ''
                              }
                              if (child.describe == '角色管理') {
                                  permissionList[index].children[j].href = '/system/role-index'
                                  permissionList[index].children[j].icon = 'fa fa-file-text'
                                  permissionList[index].children[j].show = permissionList[index].children[j].permission[0] != ''
                              }
                          }
                      })
                  })   
                  if (item.describe == '用户反馈') {
                      permissionList[index].href = ''
                      permissionList[index].icon = 'fa fa-comments'
                      permissionList[index].show = true
                      permissionList[index].permission = ['view', 'add', 'delete', 'edit']
                      permissionList[index].label = item.describe
                      item.children.forEach((child, j) => {
                          if (child.show) {
                              userBool = true
                          }
                      })
                      permissionList[index].showBool = userBool
                  }
                  if (item.describe == '日志管理') {
                      permissionList[index].href = ''
                      permissionList[index].icon = 'fa fa-book'
                      permissionList[index].show = true
                      permissionList[index].showBool = false
                      permissionList[index].permission = ['view', 'add', 'delete', 'edit']
                      item.children.forEach((child, j) => {
                          if (child.show) {
                              logBool = true
                          }
                      })
                      permissionList[index].showBool = logBool
                  }
                  if (item.describe == '系统设置') {
                      permissionList[index].href = ''
                      permissionList[index].icon = 'fa fa-gear'
                      permissionList[index].show = true
                      permissionList[index].showBool = false
                      permissionList[index].permission = ['view', 'add', 'delete', 'edit']
                      item.children.forEach((child, j) => {
                          if (child.show) {
                              systemBool = true
                          }
                      })
                      permissionList[index].showBool = systemBool
                  }             
              } else {
                  permissionList[index].label = item.describe
                  permissionList[index].permission = []
                  permissionList[index].show = false
                  permissionList[index].href = ''
                  params.forEach((auth, i) => {
                      if (item.code == auth.code) {
                          permissionList[index].permission = auth.permissions.indexOf('edit') >= 0 ? ['view', 'add', 'delete', 'edit'] : auth.permissions.split(',')
                          if (item.describe == '运营报表') {
                              permissionList[index].href = '/index/home'
                              permissionList[index].icon = 'fa fa-home'
                              permissionList[index].show = permissionList[index].permission[0] != ''
                          }
                          if (item.describe == '用户管理') {
                              permissionList[index].href = '/user/index'
                              permissionList[index].icon = 'fa fa-user'
                              permissionList[index].show = permissionList[index].permission[0] != ''
                          }
                          if (item.describe == '订单管理') {
                              permissionList[index].href = '/order/index'
                              permissionList[index].icon = 'fa fa-bus'
                              permissionList[index].show = permissionList[index].permission[0] != ''
                          }
                          if (item.describe == '套餐管理') {
                              permissionList[index].href = '/package/index'
                              permissionList[index].icon = 'fa fa-first-order'
                              permissionList[index].show = permissionList[index].permission[0] != ''
                          }
                      }
                  })
              }
          })
          // console.log(params)
          // console.log(permissionList)
          resolve({data: permissionList, message: '获取成功', success: true})
      })
  })
}
