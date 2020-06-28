import axios from './axios'
import qs from 'qs'
import {baseUrl} from '@/config/config'
export const getTeacherList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/teacher',
            method: 'get',
            params
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const getGradeList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/grade',
            method: 'get',
            params
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const getClassList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/class',
            method: 'get',
            params
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const getClassDetail = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/class/' + id,
            method: 'get'
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const getStageList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/stage',
            method: 'get',
            params
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const getStudentList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/student',
            method: 'get',
            params
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const updateStudent = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/student',
            method: 'put',
            data
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const updateTeacher = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/teacher',
            method: 'put',
            data
        }).then(res => {
          resolve(res.data)
        })
    })
}

export const exportStudent = (params) => {
    return new Promise((resolve, reject) => {
        axios.post(
            baseUrl + '​/bdc/api/app/student/export', 
            params
        ).then(res => {
            resolve(res.data) 
        })      
    })
}

export const faceCollected = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/bdc/api/app/teacher/faceCollected',
            method: 'get',
            params
        }).then(res => {
          resolve(res.data)
        })
    })
}
