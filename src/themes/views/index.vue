<template>
  <div class="index">
            <div class="tifss">
              人脸识别照片采集
              <div class="teacher-p">
                <el-button @click="toTeacher" type="primary">教师人脸数据</el-button>
              </div>
              
            </div>
      
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepAlive">
              <router-view></router-view>
            </keep-alive>
          </transition>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
   
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
  
  computed: {
    ...mapGetters(['token', 'keepAlive', 'role', 'userInfo'])
  },
  methods: {
    toTeacher () {
      this.$router.push('teacherDetail')
    }
  }
}
</script>

<style lang="scss" scoped> 
.index{background: #f0f2f5;height: 100%;}
.tifss{text-align: center;font-size: 20px;padding: 20px 0;background: #fff;margin: 0 0 10px 0;}
.page-title{padding: 0 0 0 80px;font-size: 20px;}
.teacher-p{
 position: absolute;
    top: 20px;
    left: 60%;
}
</style>
