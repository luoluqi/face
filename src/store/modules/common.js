import {getArrIndex, reqFullScreen, exitFullScreen, setCookie, getCookiesObj} from '@/util/tool'
import { getTokenByPC, getTeacher } from '@/api/commonApi'
const common = {
    namespaced: true,
    state: {
        isCollapse: false,
        tagList: JSON.parse(sessionStorage.getItem('tagList')) || [],
        tag: JSON.parse(sessionStorage.getItem('tag')) || {},
        isFullScreen: false,
        // 页面缓存配置
        keepAlive: [],
        keepAlivePage: ['Page', 'Auth'],
        keepAlivePath: ['/item/page', '/item/auth'],
        // cookieStr: 'username=school_edu; loginName=school_edu; roleCode=SchoolAdmin; Token=1c4e55a5',
        cookieStr: '',
        cookieStart: {},
        cookiesObj: null
    },
    getters: {
        
    },
    mutations: {
        SET_COLLAPSE (state, params) {
            state.isCollapse = !state.isCollapse
        },
        ADD_TAG (state, params) {
            state.tag = params
            sessionStorage.setItem('tag', JSON.stringify(params))
            // console.log(state.tagList)
            state.tagList.forEach((item, index, array) => {
                if (item.value === params.value) {
                    state.tagList[index].query = params.query
                }
            })
            var bool = state.tagList.some((item, index, array) => {
                return item.value == params.value
            })
            if (bool) {
                return false
            } else {
                state.tagList.push(params)
                sessionStorage.setItem('tagList', JSON.stringify(state.tagList))
            }   
        },
        CLOSE_TAG (state, params) {
            var i = getArrIndex(state.tagList, params.value)
            state.tagList.splice(i, 1)
            sessionStorage.setItem('tagList', JSON.stringify(state.tagList))
        },
        CLEAR_TAG (state, params) {
            state.tagList = []
            sessionStorage.setItem('tagList', JSON.stringify(state.tagList))
            state.tag = {}
            sessionStorage.setItem('tag', JSON.stringify(state.tag))
        },
        KEEP_ALIVE (state, params) {
            state.keepAlive = params
        },
        SET_FULL_SCREEN (state, params) {
            state.isFullScreen = !state.isFullScreen
            if (state.isFullScreen) {
                reqFullScreen()
                state.isCollapse = true
            } else {
                exitFullScreen()
                state.isCollapse = false
            }
        },
        CLOSE_ALL_TAG (state, params) {
            state.tagList = []
            sessionStorage.setItem('tagList', JSON.stringify(state.tagList))
        }
    },
    actions: {
        GgetTokenByPC ({ state, commit, dispatch }) {
            // debugger
            state.cookieStart = getCookiesObj(document.cookie)
            // if (document.cookie != '') {
            //   state.cookieStart = getCookiesObj(document.cookie)
            // } else {
            //   state.cookieStart = getCookiesObj(state.cookieStr)
            //   setCookie('Token', state.cookieStart.Token, 0)
            //   setCookie('loginName', state.cookieStart.loginName, 0)
            //   setCookie('roleCode', state.cookieStart.roleCode, 0)
            // }
            // 临时做静态页面
            // state.cookiesObj = {
            //   roleCode: state.cookieStart.roleCode
            // }

            return new Promise((resolve, reject) => {
              var params = {
                Token: state.cookieStart.Token,
                roleCode: state.cookieStart.roleCode
              }
              if (state.cookiesObj) {
                resolve()
                return
              }
              getTokenByPC(params)
                .then(res => {
                  var result = JSON.parse(res)
                  // console.log(result)
                  if (result.Code == 200) {
                    var strData = result.Data
                    // console.log(strData)
                    if (strData) {
                      setCookie('img', strData.Img, 0)
                      setCookie('loginUserId', strData.UserId, 0)
                      setCookie('teacherId', strData.SelfId, 0)
                      setCookie('realName', strData.RealName, 0)
                      // setCookie('studentId', strData.ClassInfoList[0].SelfId, 0)
                      // setCookie('classId', strData.ClassInfoList[0].ClassId, 0)
                      setCookie('schoolId', strData.SchoolId, 0)
                      // setCookie('gradeId', strData.ClassInfoList[0].GradeId, 0)
                      // state.cookiesObj = getCookiesObj(document.cookie)
                      state.cookiesObj = {
                        Token: state.cookieStart.Token,
                        roleCode: state.cookieStart.roleCode,
                        img: strData.Img,
                        loginName: strData.LoginName,
                        loginUserId: strData.UserId,
                        realName: encodeURI(strData.RealName),
                        schoolId: strData.SchoolId,
                        teacherId: strData.SelfId,
                        classList: strData.ClassInfoList
                      }
                      // console.log(state.cookiesObj)
                    } else {
                    //   location.href = 'http://www.xueerqin.net'
                    }
                  }
                  resolve(res)
                })
                .catch(error => {
                  reject(error)
                })
            })
          },
          checkTeacher ({state}) {
            return new Promise((resolve, reject) => {
              getTeacher(state.cookiesObj.teacherId).then(res => {
                res = JSON.parse(res)
                res = JSON.parse(res)
                if (res.data.length == 0) {
                  resolve(false)
                } else {
                  resolve(true)
                }
              })
            })
          }
    }
}
export default common
