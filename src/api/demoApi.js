import axios from './axios'
import qs from 'qs'
import {baseUrl} from '@/config/config'
export const getDemoList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + 'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/getDemoList',
            method: 'get',
            data: qs.stringify(params)
        }).then(res => {
          resolve(res.data)
        })
    })
}
export const getUserList = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + 'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/userList',
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
        resolve(res.data)
      })
  })
}
export const getSystemList = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + 'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/systemList',
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
        resolve(res.data)
      })
  })
}
export const getRoleList = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl + 'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/roleList',
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
        resolve(res.data)
      })
  })
}
