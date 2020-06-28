<template>
  <div id="app">
    <router-view/>
    <!-- <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      radio: '1'
    }
  },
  watch: {
    '$route' (to, from) {
      // this.handleLoading(2000)
    }
  }
}
</script>

<style lang="scss">
@import url('./style/reset.css');
html,body{
  width: 100%;
  height: 100%;
  min-width: 1240px;
}
#app{
  width: 100%;
  height: 100%;
}
body .el-table th.gutter {
  display: table-cell !important;
}
.home-form{
    .el-form-item{
        margin-bottom: 0px !important;
    }
    .search-btn{
        margin-top: 1px;
    }
}
.mt-15{
    margin-bottom: 10px;
}
.el-tooltip__popper.is-dark{
  background-color: rgba(50, 50, 50, 0.7) !important;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow{
  border-top-color: rgba(50, 50, 50, 0.7) !important;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow::after{
  border-top-color: rgba(50, 50, 50, 0.7) !important;
  opacity: 0 !important;
}
.el-card__body .home-body {
    margin-top: -15px;
}
.article-con{padding: 20px 0;}
.article-con img{max-width: 100%;}
.current-row > td {
   background: rgba(0, 158, 250, 0.219) !important;
}
</style>
