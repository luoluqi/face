import Vue from 'vue'
import filtersIndex from './filtersIndex'
const Plugins = [filtersIndex]
Plugins.map((plugin) => {
    Vue.use(plugin)
})
export default Vue
