const focus = {
    install (Vue) {
        Vue.directive('focus', {
            inserted: function (el, {value}) {
                if (value) {
                    el.focus()
                }
            }
        })
    }
}
export default focus
