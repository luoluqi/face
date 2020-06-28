import COS from 'cos-js-sdk-v5'
import Vue from 'vue'
import {apiUrl} from '@/config/config'
const getCosTmpKey = (data) => {
    return new Promise((resolve, reject) => {
        var loading = Vue.prototype.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0)'
        })
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText)
                loading.close()
            } else {
               
            }
        }
        xhr.open('POST', apiUrl + '/public-server-center/api/cos/getCosTmpKey?projectName=face&suffix=jpg')
        xhr.send()
    })
}

export default{
    expiration: 0,
    cancelTaskList: [],
    init () {
        return new Promise((resolve, reject) => {
            var now = new Date().getTime()
            if (now < this.expiration) {
                resolve()
                return
            }
            getCosTmpKey().then(res => {
                res = JSON.parse(res).data
                this.SecretId = res.cosTmpKey.credentials.tmpSecretId
                this.SecretKey = res.cosTmpKey.credentials.tmpSecretKey
                this.XCosSecurityToken = res.cosTmpKey.credentials.sessionToken
                this.Bucket = res.bucketName
                this.Region = res.region
                this.Key = res.key
                this.expiration = res.cosTmpKey.expiration
                this.COS = new COS({
                    SecretId: this.SecretId,
                    SecretKey: this.SecretKey,
                    XCosSecurityToken: this.XCosSecurityToken
                })
            
                resolve()
            })
         })
    },
    putObject (file) {
        return new Promise((resolve, reject) => {
            this.init().then(a => {
                var loading = Vue.prototype.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0)'
                })
                var now = new Date()
                var key = 'face/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + (Math.random() + '').replace('.', '') + now.getTime() + '.jpg'
                this.COS.putObject({
                    Bucket: this.Bucket, /* 必须 */
                    Region: this.Region, /* 存储桶所在地域，必须字段 */
                    Key: key, /* 必须 */
                    Body: file, // 上传文件对象
                    onProgress: function (progressData) {
                        console.log(JSON.stringify(progressData))
                    }
                }, function (err, data) {
                    loading.close()
                    console.log(err || data)
                    resolve('http://' + data.Location)
                })
            })
        })
    },
    sliceUploadFile (file, progress, complete) {
        return new Promise((resolve, reject) => {       
            this.init().then(a => {
                let taskId = 0
                this.COS.sliceUploadFile({
                    Bucket: this.Bucket, /* 必须 */
                    Region: this.Region, /* 存储桶所在地域，必须字段 */
                    Key: this.getKey(file.name), /* 必须 */
                    Body: file, // 上传文件对象
                    onTaskReady: (id) => {       
                        taskId = id            
                        console.log(taskId)
                    },
                    onHashProgress: (progressData) => {      
                        // console.log('onHashProgress', taskId, file.name, JSON.stringify(progressData))
                    },
                    onProgress: (progressData) => {          
                        // console.log('progressData', taskId, file.name, JSON.stringify(progressData))
                        progressData.taskId = taskId
                        progressData.fileName = file.name

                        var percent = parseInt(progressData.percent * 10000) / 100
                        var speed = parseInt(progressData.speed / 1024 / 1024 * 100) / 100 + 'Mb/s'
                        progressData.speed = speed
                        progressData.percent = percent

                        if (!this.isCancel(taskId)) {
                            progress(progressData)
                        }
                    }
                }, (err, data) => {
                    console.log(err || data)
                    data.taskId = taskId

                    if (!this.isCancel(taskId)) {
                        complete(data)
                    }
                   
                    resolve()
                })
            })
        })
    },
  
    getKey (name) {
        var suffix = name.substring(name.lastIndexOf('.'))
        var now = new Date()
        var key = 'face/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + (Math.random() + '').replace('.', '') + now.getTime() + suffix
        return key   
    },
    cancelTask (taskId) {
        console.log('cancelTask:', taskId)
     
        this.COS.cancelTask(taskId)
        this.cancelTaskList.push(taskId)
    },
    isCancel (taskId) {
        var index = -1
        for (var i = 0; i < this.cancelTaskList.length; i++) {
            if (taskId == this.cancelTaskList[i]) {
                index = i
            }
        }
        if (index == -1) {
            return false
        } else {
            return true
        }
    }
}
