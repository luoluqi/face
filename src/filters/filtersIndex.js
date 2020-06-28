const filtersIndex = {
    install: function (Vue, options) {
        Vue.filter('imgUrl', function (value) {
            if (!value) {
                return ''
            }
            value = value.replace(/\\/g, '/')
           if (/^http/.test(value)) {
                return value
           } else {
                return 'http://' + value
           }
        })
        Vue.filter('capitalize', function (value) {
            if (!value) return
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        })
        Vue.filter('formatDateTime', function (value, formatStr) {
            var self = typeof (value) == 'undefined' ? new Date() : new Date(value)
            var str = formatStr
            var Week = ['日', '一', '二', '三', '四', '五', '六']
            str = str.replace(/yyyy|YYYY/, self.getFullYear())
            str = str.replace(/yy|YY/, (self.getYear() % 100) > 9 ? (self.getYear() % 100).toString() : '0' + (self.getYear() % 100))
            str = str.replace(/MM/, self.getMonth() > 8 ? (self.getMonth() + 1).toString() : '0' + (self.getMonth() + 1))
            str = str.replace(/M/g, self.getMonth())
            str = str.replace(/w|W/g, Week[self.getDay()])
            str = str.replace(/dd|DD/, self.getDate() > 9 ? self.getDate().toString() : '0' + self.getDate())
            str = str.replace(/d|D/g, self.getDate())
            str = str.replace(/hh|HH/, self.getHours() > 9 ? self.getHours().toString() : '0' + self.getHours())
            str = str.replace(/h|H/g, self.getHours())
            str = str.replace(/mm/, self.getMinutes() > 9 ? self.getMinutes().toString() : '0' + self.getMinutes())
            str = str.replace(/m/g, self.getMinutes())
            str = str.replace(/ss|SS/, self.getSeconds() > 9 ? self.getSeconds().toString() : '0' + self.getSeconds())
            str = str.replace(/s|S/g, self.getSeconds())
            return str
          })
          Vue.directive('loadmore', {
            bind: function (el, binding) {
                var isLoadMore = true
                el.addEventListener('scroll', function () {
                    if (!isLoadMore) {
                        return
                    }
                    var scrollHeight = el.scrollHeight
                    var scrollTop = el.scrollTop 
                    var clientHeight = el.clientHeight 
                    if (scrollHeight == clientHeight) {
                        return
                    }
                    if (scrollHeight - clientHeight - scrollTop < 30) {
                        binding.value()
                        isLoadMore = false
                        setTimeout(() => {
                            isLoadMore = true
                        }, 500)
                    }
                    el.scrollTop = scrollTop 
                })
            }
          })
    }
}
export default filtersIndex
