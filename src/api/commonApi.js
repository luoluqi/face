import axios from './axios'
import qs from 'qs'
import {public2} from '@/config/config'
export const getTokenByPC = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: public2 + '/api/Token/GetTokenByPC?data=' + JSON.stringify(params),
            method: 'get',
            data: qs.stringify(params)
        }).then(res => {
          resolve(res.data)
        }).catch(error => {
          // location.href = 'http://www.xueerqin.net'
          reject(error)
        })
    })
}

export const getTree = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: public2 + '/api/TreeNode/GetTree',
          method: 'get',
          params
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const getTeacher = (teacherId) => {
  return new Promise((resolve, reject) => {
      axios({
          url: public2 + '/api/Data/GetClassRoomTeacherByTeacherId?data={teacherId:"' + teacherId + '"}',
          method: 'get'
      }).then(res => {
        resolve(res.data)
      })
  })
}

export const uploadFile = (formData) => {
  return new Promise((resolve, reject) => {
      axios.post(
        public2 + '/api/File/UploadFileV2', 
          formData, 
          { 
              headers: { 'Content-Type': 'multipart/form-data' }
          }
      ).then(res => {
          resolve(res.data) 
      })      
  })
}
