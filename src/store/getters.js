const getters = {
    token: state => state.user.token,
    role: state => state.user.role,
    userInfo: state => state.user.userInfo,
    menu: state => state.user.menu,
    isCollapse: state => state.common.isCollapse,
    tagCurrent: state => state.common.tag,
    tagList: state => state.common.tagList,
    isFullScreen: state => state.common.isFullScreen,
    keepAlive: state => state.common.keepAlive,
    keepAlivePage: state => state.common.keepAlivePage,
    keepAlivePath: state => state.common.keepAlivePath,
    cookieStart: state => state.common.cookieStart,
    cookiesObj: state => state.common.cookiesObj,
    realName (state) {
      var name = state.common.cookiesObj.realName
      try {
        name = decodeURI(name)
      } catch (error) {
        name = unescape(name)
      }
      return name
    },
    schoolId () {
        var s = location.search
        s = s.replace('?', '')
        var arr = s.split('&')
        var obj = {}
        for (var p of arr) {
            var list = p.split('=')
            obj[list[0]] = list[1]
        }
        return obj.schoolId
    },
    schoolName () {
        var s = location.search
        s = s.replace('?', '')
        var arr = s.split('&')
        var obj = {}
        for (var p of arr) {
            var list = p.split('=')
            obj[list[0]] = list[1]
        }
        return unescape(obj.schoolName)
    }
}
export default getters
