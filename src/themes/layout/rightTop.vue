<template>
   <div class="header-top" v-show="!isFullScreen">
        <div class="header-left">
            <i class="fa fa-navicon" @click="toggleCollapse"></i>
        </div>
        <div class="header-right user-name">
            <el-tooltip class="item" effect="dark" content="头像" placement="bottom">
                <img class="top-userImg" :src="userInfo.pic">
            </el-tooltip>
            <!-- <el-dropdown trigger="click"> -->
                <span class="el-dropdown-link">
                    <!-- {{userInfo.userName}} -->
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </span>
                <!-- <el-dropdown-menu slot="dropdown">
                    
                    修改密码 
                    <el-dropdown-item  @click.native="dialogVisible = true">
                        修改密码
                       <el-button type="text" @click="dialogVisible = true">修改密码</el-button>                    
                    </el-dropdown-item>                

                    <el-dropdown-item><a href="https://github.com/chydream/vue-elem" target="_blank">Git地址</a></el-dropdown-item> 

                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu> -->
            <!-- </el-dropdown> -->
        </div>
        <!-- 修改密码的dialog -->
        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="410px" :before-close="handleClose" :close-on-click-modal="false">
            <el-row>
                <el-col :span="5">
                    <div class="left-note">原始密码：</div>
                </el-col>
                <el-col :span="19">
                    <el-input v-model="oldPwd" placeholder="请输入旧密码" type="password"></el-input>
                </el-col>
            </el-row>
            <el-row class="row-gap">
                <el-col :span="5">
                    <div class="left-note">新的密码：</div>
                </el-col>
                <el-col :span="19">
                    <el-input v-model="newPwd" placeholder="请输入新密码" type="password"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <div class="left-note">确认密码：</div>
                </el-col>
                <el-col :span="19">
                    <el-input v-model="checkNewPwd" placeholder="请确认密码" type="password"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendPwdMsg">确 定</el-button>
            </span>
        </el-dialog>

    </div> 
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'RightTop',
    data () {
        return {
            msg: 'hello',
            dialogVisible: false, // 修改密码的el-dialog显示隐藏属性
            oldPwd: '',
            newPwd: '',
            checkNewPwd: '',
            checked: false
        }
    },
    methods: {
        toggleCollapse () {
            this.$store.commit('common/SET_COLLAPSE')
        },
        handleClose (done) { // 修改密码的el-dialog框
            this.$confirm('确认关闭？')
            .then(_ => {
                done()
            })
            .catch(_ => {})
        },
        sendPwdMsg () {
            var params = {
                oldPwd: this.oldPwd,
                newPwd: this.newPwd,
                checkNewPwd: this.checkNewPwd
            }
            this.$store.dispatch('user/ChanPwd', params).then(res => {
                if (res.success) {
                    this.$message({
                        message: '与旧密码一致',
                        type: 'success',
                        center: true
                    })
                    this.dialogVisible = false
                } else {
                    this.$message({
                        message: '与旧密码不一致',
                        type: 'warning',
                        center: true
                    })
                }
            })
        },
        logout () {
            this.handleConfirm('确定要退出吗？', () => {
                this.$store.dispatch('user/Logout').then(res => {
                    if (res.success) {
                        this.$router.push('/login')
                        this.$store.commit('common/CLEAR_TAG')
                    } else {
                        this.tip(res.message, 'error')
                    }
                })
            })
        }
    },
    computed: {
        ...mapGetters(['isFullScreen', 'userInfo'])
    }
}
</script>
<style lang="scss">
  .header-top{
    height: 60px;
    overflow: hidden;
    padding: 0 20px;
  }
  .header-left{
    line-height: 60px;
    width: 50%;
    float: left;
  }
  .header-left i{
      font-size: 22px;
  }
  .header-right{
    padding: 13px 0px;
    line-height: 20px;
    width: 50%;
    float:right;
    text-align: right;
  }
  .top-userImg{
    margin: 0 8px 0 10px;
    padding: 2px;
    width: 30px;
    height: 30px;
    border-radius: 100%!important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #eee;
    vertical-align: middle;
  }
  .user-name{
      cursor: default;
  }
  .row-gap{
      margin: 15px 0;
     
  }
  .left-note{
      line-height: 32px;
  }
  
</style>
