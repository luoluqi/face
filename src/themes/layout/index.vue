<template>
  <div class="index">
    <el-container>
      <left></left>
      <el-container>
        <el-header style="height:auto;">
          <right-top></right-top>
          <right-tags></right-tags>
        </el-header>
        <el-main class="main">
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepAlive">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import left from './left'
import rightTop from './rightTop'
import rightTags from './rightTags'
export default {
  name: 'index',
  components: {
    left,
    rightTop,
    rightTags
  },
  data () {
    return {
      transitionName: ''
    }
  },
  created () {
  },
  mounted () {
    // console.log(this.role)
    // console.log(this.userInfo)
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      // this.handleLoading(1000)
    }
  },
  computed: {
    ...mapGetters(['token', 'keepAlive', 'role', 'userInfo'])
  },
  methods: {

  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // 页面缓存配置
      // vm.$store.commit('common/KEEP_ALIVE', vm.keepAlivePage)
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>

<style lang="scss" scoped>
.index{
  height: 100%;
  .el-container{
    height: 100%;
    background: #f0f2f5;
  }
  .el-aside{
    background: #00142a;
    color: rgba(255, 255, 255, 0.65);
  }
  .el-header{
    background: #fff;
    color: #333;
    padding: 0px;
  }
  .el-main{
    color: #333;
    height: 100%;
    padding: 0px;
    border-radius: 4px;
  }
  .el-main>div{
    margin: 10px;
    border-radius: 4px !important;
    padding: 10px;
    // background: #fff;
    height:calc(100% - 20px);
    // -webkit-box-shadow: 1px 1px 1px 1px #ccc !important;
    // box-shadow: 1px 1px 1px 1px #ccc!important;
    box-sizing: border-box;
  }
  .fade-enter{
    opacity: 0;
    // transform: translateX(-100%);
  }
  .fade-enter-active{
    transition: all 0.5s ease;
  }
  .fade-leave{
    transition: all 0.5s ease;
  }
  .fade-leave-active{
    opacity: 0;
    // transform: translateX(-100%);
  }
}

</style>
