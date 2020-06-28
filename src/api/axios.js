import axios from 'axios'
import store from '@/store'
import router from '../router'
import Vue from 'vue'
import {Encrypt} from '@/util/crypto'
import cookie from '@/util/cookie'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true // 跨域请求，允许保存cookie
var loading 
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 签名
		config.headers['sign'] = Encrypt(new Date().getTime())
		config.headers['loginName'] = cookie.get('loginName')
		config.headers['roleCode'] = cookie.get('roleCode')
		config.headers['Token'] = cookie.get('Token')
		// config.headers['roleCode'] = 'Teacher'
		// config.headers['Token'] = '53b9f723'
	 	loading = Vue.prototype.$loading({
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0)'
		})

	return config
}, function (error) {
	console.log('error' + error)
	return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	loading.close()
	return response
}, function (error) {
	loading.close()
	switch (error.response.status) {
		case 302:
			Vue.prototype.$alert('状态：302，登录过期，请重新登陆', '提示', {
				confirmButtonText: '确定',
				callback: action => {
					location.href = 'http://www.xueerqin.net'
				}
			  })
		
			// location.href = 'http://www.xueerqin.net'
		break
		case 401:
			Vue.prototype.$message.error('状态：401')
		break
		case 403:
			Vue.prototype.$message.error(error.response.data.error.message)
		break
		case 500:
			Vue.prototype.$message.error('状态：500,服务器出错了')
		break
	}
	return Promise.reject(error.response)
})
export default axios
