import Vue from 'vue'
import hasPermission from './hasPermission'
import focus from './focus'
const Plugins = [hasPermission, focus]
Plugins.map((plugin) => {
    Vue.use(plugin)
})
export default Vue
