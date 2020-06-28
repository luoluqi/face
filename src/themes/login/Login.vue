<template>
  <div class="login">
    <div class="content">
      <form id="login-form" class="login-form">
        <h3 class="form-title">登录</h3>
        <div class="alert alert-danger display-hide">
          <button class="close" data-close="alert"></button>
          <span>输入你的用户名或密码</span>
        </div>
        <div class="form-group field-loginform-username required">
          <label class="control-label visible-ie8 visible-ie9" for="loginform-username">用户名</label>
          <div class="input-icon">
            <i class="fa fa-user"></i>
            <input type="text" id="loginform-username" class="form-control placeholder-no-fix"  name="LoginForm[username]" autocomplete="off" placeholder="用户名" aria-required="true" v-model="username">
            <p class="help-block help-block-error"></p>
          </div>
        </div>
        <div class="form-group field-loginform-password required">
          <label class="control-label visible-ie8 visible-ie9" for="loginform-password">密码</label>
          <div class="input-icon">
            <i class="fa fa-lock"></i>
            <input type="password" id="loginform-password" class="form-control placeholder-no-fix" name="LoginForm[password]" autocomplete="off" placeholder="密码" aria-required="true" v-model="password">
            <p class="help-block help-block-error"></p>
          </div>
        </div>
        <div class="form-actions">
          <el-checkbox v-model="checked" style="margin-top:10px;">记住我</el-checkbox>
          <button type="button" class="btn green pull-right" @click="getLogin">登录</button>
        </div>
      </form>
    </div>
    <div class="copyright">2016 © copyright</div>
    <div class="bg">
      <ul>
        <li v-for="(item, index) in imgs" :key="index" :class="{activeItem:activeIndex == index}"><img :src="item"></li>
      </ul>
    </div>
    <!-- <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio> -->
  </div>
</template>
<script>

export default {
  name: 'login',
  data () {
    return {
      imgs: [
        'http://www.qinimai.com/backend/web/statics/metronic/imgs/7.jpg',
        'http://www.qinimai.com/backend/web/statics/metronic/imgs/2.jpg',
        'http://www.qinimai.com/backend/web/statics/metronic/imgs/3.jpg',
        'http://www.qinimai.com/backend/web/statics/metronic/imgs/4.jpg'
      ],
      username: '',
      password: '',
      checked: false,
      activeIndex: 0,
      radio: '1'
    }
  },
  methods: {
    getLogin () {
      var params = {
        username: this.username,
        password: this.password
      }
      if (params.username == '' || params.password == '') {
        this.$message({
          message: '请输入登录信息',
          type: 'warning',
          center: true
        })
        return false
      }
      this.$store.dispatch('user/Login', params).then(res => {
        console.log(res)
        if (res.success) {
          this.$store.dispatch('user/GetUserInfo', res.data.token).then(res => {
            if (res.success) {
              if (this.checked) {
                this.setCookie(params.username, params.password, 7)
              } else {
                this.clearCookie()
              }
              document.onkeydown = undefined
              this.$router.push('/order/school-order')
            }
          })
        } else {
          this.tip(res.message, 'error')
        }
      }).catch(err => {
        this.tip('服务器出错', 'error')
        console.log(err)
      })
    },
    bgAnimation () {
      var timer = null
      var interval = 5000
      timer = setInterval(() => {
        if (this.activeIndex < 3) {
          this.activeIndex++
        } else {
          this.activeIndex = 0
        }
      }, interval)
    },
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          if (arr2[0] == 'username') {
            this.username = arr2[1]
            this.checked = true
          }
        }
      }
    },
    clearCookie () {
        this.setCookie('', '', -1)
    },
    setCookie (user, pwd, saveDays) {
        var exdate = new Date()
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * saveDays)
        window.document.cookie = 'username' + '=' + user + ';path=/;expires=' + exdate.toGMTString()
    }
  },
  created () {
    this.getCookie()
    this.bgAnimation()
    // 按键监听
    var _self = this
    var key = ''
    document.onkeydown = function (e) {
      if (window.event == undefined) {
        key = e.keyCode
      } else {
        key = window.event.keyCode
      }
      if (key == 13) {
        _self.getLogin()
        // _self.getLoginss()
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import url("./css/bootstrap.min.css");
@import url("./css/login.css");
.login{
  .bg{
    position: relative;
  }
  .bg ul li{
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 2s ease;
  }
  .activeItem{
    opacity: 1!important;
  }
  .bg ul li img{
    width: 100%;
    height: 100%;
  }
  .display-hide, .control-label{
    display: none;
  }
  .input-icon{
    position:relative;
  }
  .input-icon i{
    color: #ccc;
    position: absolute;
    margin: 9px 2px 4px 10px;
    z-index: 3;
    width: 16px;
    font-size: 16px;
    text-align: center;
    left: 0;
  }
  .input-icon input{
    padding-left: 33px;
  }
  .mt-checkbox, .mt-radio {
    display: inline-block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 14px;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }
  .mt-checkbox>span, .mt-radio>span {
      position: absolute;
      top: 0;
      left: 0;
      height: 19px;
      width: 19px;
      border: 1px solid #d9d9d9;
      background: 0 0;
  }
  .mt-checkbox>input, .mt-radio>input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .mt-checkbox>span:after {
    left: 6px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #666;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}
</style>
