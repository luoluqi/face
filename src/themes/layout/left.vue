<template>
  <el-aside :style="{width:isCollapse? '64px':'230px'}" :class="{isCollapse:isCollapse}">
    <div class="logo">
      <transition name="fade">
        <div class="" v-show="isCollapse">O</div>
      </transition>
      <transition name="fade">
        <div class="" v-show="!isCollapse">宿舍管理</div>
      </transition>
    </div>
    <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        background-color="#00142a"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#409eff"
        :collapse="isCollapse"
        :unique-opened="true">
        <template v-for="(item,index) in menu">
          <!-- 一级 -->
          <el-menu-item :index="item.href" @click="goUrl(item.href)" v-if="item.children.length==0" :key="index" v-show="item.show">
            <i :class="item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
          <el-submenu :index="item.label" :key="index" v-else>
            <template slot="title" v-show="item.show">
              <i :class="item.icon"></i>
              <span>{{item.label}}</span>
            </template>
            <template v-for="(itemChild,indexChild) in item.children">
              <!-- 二级 -->
              <el-menu-item :index="itemChild.href" @click="goUrl(itemChild.href)" :key="indexChild" v-if="itemChild.children.length==0" v-show="itemChild.show">
                <i :class="itemChild.icon"></i>
                <span slot="title">{{itemChild.label}}</span>
              </el-menu-item>
              <el-submenu :index="itemChild.label" :key="indexChild" v-else>
                <template slot="title" v-show="itemChild.show">
                  <i :class="itemChild.icon"></i>
                  <span>{{itemChild.label}}</span>
                </template>
                <!-- 三级 -->
                <el-menu-item :index="itemChildchild.href" @click="goUrl(itemChildchild.href)" v-for="(itemChildchild,indexChildchild) in itemChild.children" :key="indexChildchild" v-show="itemChildchild.show">
                  <i :class="itemChildchild.icon"></i>
                  <span slot="title">{{itemChildchild.label}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </el-aside>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Left',
  data () {
    return {
      // menu: [],
      menuList: []
    }
  },
  mounted () {
    // this.getMenuData()
  },
  methods: {
    goUrl (path) {
      // 页面缓存配置
      var index = this.keepAlivePath.indexOf(path)
      if (this.activeIndex != path && index > -1) {
        var arr = JSON.parse(JSON.stringify(this.keepAlivePage))
        arr[index] = ''
        this.$store.commit('common/KEEP_ALIVE', arr)
        // console.log(this.keepAlive)
      }
      this.$router.push(path)
    },
    getMenuData () {
      this.$store.dispatch('user/GetMenu').then(res => {
        if (res.success) {
          this.menu = res.data
          // this.filterMenu()
        } else {
          console.log(res.message)
        }
      })
    },
    filterMenu () {
      var menuList = this.menu
      var result = []
      var obj = {}
      for (let i = 0; i < menuList.length; i++) {
        obj = menuList[i]
        var arr = []
        for (let j = 0; j < menuList[i].children.length; j++) {
          if (menuList[i].children[j].show) {
            arr.push(menuList[i].children[j])
          }
        }
        obj.children = arr
        result.push(obj)
      }
      this.menuList = result
    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'menu', 'keepAlive', 'keepAlivePage', 'keepAlivePath']),
    activeIndex () {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss">
  .logo{
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: #002140;
    text-align: center;
  }
  .el-menu{
    border-right: none!important;
  }
  .isCollapse .el-menu-item span, .isCollapse .el-submenu span{
    opacity: 0;
    transition:all 0.3s ease;
  }
</style>
