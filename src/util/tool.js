import CryptoJS from 'crypto-js'
// url加密
export function encryptStr (word, keyStr) {
    keyStr = keyStr != undefined ? keyStr : 'abcdefgabcdefg12'
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, keyStr)
    return encrypted.toString()
}
// url解密
export function decryptStr (word, keyStr) {  
    keyStr = keyStr != undefined ? keyStr : 'abcdefgabcdefg12'
    var decrypt = CryptoJS.AES.decrypt(word, keyStr)
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
// 给localstorage设置过期时间
export function setLocal (key, value, exp) {
    var cur = new Date().getTime()
    localStorage.setItem(key, value)
    localStorage.setItem('timeSet', JSON.stringify({curTime: cur, expTime: exp}))
}
// 获取localStorage
export function getLocal (key) {
    var itemValue = localStorage.getItem(key)
    var timeSet = localStorage.getItem('timeSet')
    if (itemValue != undefined) {
        var dataObj = JSON.parse(timeSet)
        if (new Date().getTime() - dataObj.curTime > dataObj.expTime) {
            console.log('信息已过期')
            localStorage.removeItem(key)
            return undefined
        } else {
            return itemValue
        }
    } else {
        return undefined
    }
}
// 获取索引
export function getArrIndex (arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == value) {
            return i
        }
    }
}
// 数组去重
export function unique (arr) {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) < 0) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
// 全屏插件
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen()
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
    }
}
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen()
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen()
    }
}
// 复制方法
export function copayData () {
    var copy = document.getElementById('walletAddress')
    copy.select() // 选择对象
    document.execCommand('Copy') // 执行浏览器复制命令
    this.showToast = true
    this.toastData = '复制充值地址成功'
}
// 图片上传base64
export function uploadImg () {
    var self = this
    var imgFiles = document.getElementById('myFile').files
    for (var i = 0; i < imgFiles.length; i++) {
        var reader = new FileReader()
        var imgSrc
        reader.onload = function (e) {
            imgSrc = e.target.result
            self.payImage.push(imgSrc)
        }
        reader.readAsDataURL(imgFiles[i])
    }
}
// 图片上传FormData
export function uploadImgFormData () {
    var self = this
    self.imgLoading = true
    var imgFiles = document.getElementById('myFile').files[0]
    var fd = new FormData()
    fd.append('uploadFile', imgFiles)
}
// 动态获取根地址
export function getUrlRoot () {
    var baseUrl = location.protocol + '//' + location.host
    var pattern = /(127)|(localhost)|(file)/
    if (pattern.test(baseUrl)) {
        baseUrl = 'http://192.168.12.223:8878/fjhswl-server' 
    } else {
        baseUrl = 'http://114.115.148.14:8763/fjhswl-server'
    }
    return baseUrl
}
// 获取页面卷去的高度
export function getScrollTop () {
    var scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
        scrollTop = document.body.scrollTop
    }
    return scrollTop
}
// 获取页面客户端高度
export function getClientHeight () {
    var clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    }
    return clientHeight
}
// 获取页面滚动高度
export function getScrollHeight () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}
export function getCookiesObj (cookies) {
    var arr = cookies.split(';')
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split('=')
        if (newArr[0].trim() != '') {
          obj[newArr[0].trim()] = newArr[1]
        }
    }
    return obj
} 
export function setCookie (name, value, expiresHours) {
  var cookieString = name + '=' + escape(value)
  if (expiresHours > 0) {
    var date = new Date()
    var ms = expiresHours * 3600 * 1000
    date.setTime(date.getTime() + ms)
    cookieString = cookieString + ';expires=' + date.toGMTString()
  }
  document.cookie = cookieString
} 

export function getCookie (name) {
  var strCookie = document.cookie
  var arrCookie = strCookie.split('; ')
  for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split('=')
      if (arr[0] == name) {
          return arr[1]
      }
  }
  return null
}
