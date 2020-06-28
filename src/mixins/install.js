import Vue from 'vue'
import mixinsIndex from './mixinsIndex'
const Plugins = [mixinsIndex]
Plugins.map((plugin) => {
    Vue.use(plugin)
})
export default Vue
