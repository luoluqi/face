
const face = {
    namespaced: true,
   
    state: {
        curClass: localStorage.curClass ? JSON.parse(localStorage.curClass) : ''
    },
    getters: {
    },
    mutations: { 
        setCurClass (state, item) {
            state.curClass = item
            localStorage.curClass = JSON.stringify(item)
        }
    },
    actions: { 
    }
}
export default face
