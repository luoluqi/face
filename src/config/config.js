/* eslint-disable */
export const public2 = 'https://srv.xueerqin.net/public-api'
let a = ''
let b = ''
if (process.env.NODE_ENV == 'production') {
    a = 'https://api.xueerqin.net' // 正式
    b = 'https://app.xueerqin.net' // 正式                  
} else {
    a = 'https://t-api.xueerqin.net'  // 测试
    b = 'https://tapp.xueerqin.net' // 测试
}
console.log(a, b)
export const apiUrl = a
export const baseUrl = b
