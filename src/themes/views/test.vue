<template>
  <div>
     <el-button size="small" type="primary" @click="selectFile">点击上传</el-button>
     <input :ref="refName" 
     @change="inputChange"
     multiple="multiple"
     type="file" style="display:none;">
     <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

     <div v-for="item in progressList" class="file-item" :key="item.taskId">
        <div class="file-name">{{item.fileName}}</div>
        <!-- <div class="file-speed">{{item.speed}}</div> -->
        <!-- <div class="file-percent">{{item.percent}}%</div> -->
        <div class="file-pro">
          <el-progress :percentage="item.percent" :show-text="true"></el-progress>
          <el-button 
          @click="removeFile(item)"
         
          class="file-close" type="text" icon="el-icon-close"></el-button>
        </div>
     </div>

     <el-button size="small" type="primary" @click="getFileList">获取文件</el-button>
  </div>
</template>
<script>
import COS from '@/util/COS'
export default {
  data () {
    return {
      refName: Math.random() + '_cosFileInput',
      progressList: []
    }
  },
  methods: {
    selectFile () {
      this.$refs[this.refName].click()
    },
    inputChange () {
      var files = this.$refs[this.refName].files

      for (let file of files) {
        COS.sliceUploadFile(file, this.progress, this.complete)
      }
      
      this.$refs[this.refName].value = ''
    },
    progress (info) {
      var index = -1
      for (let i = 0; i < this.progressList.length; i++) {
        let item = this.progressList[i]
        if (item.taskId == info.taskId) {
          index = i
        }
      }
      if (index > -1) {
        this.progressList.splice(index, 1, info)
      } else {
        this.progressList.push(info)
      }
    },
    removeFile (item) {
      COS.cancelTask(item.taskId)
      for (let i = 0; i < this.progressList.length; i++) {
        let temp = this.progressList[i]
        if (item.taskId == temp.taskId) {
          this.progressList.splice(i, 1)
        }
      }
    },
    complete (data) {
      for (let i = 0; i < this.progressList.length; i++) {
        let item = this.progressList[i]
        if (item.taskId == data.taskId) {
          item.url = data.Location
        }
      }
    },
    getFileList () {
      var list = []
      for (let item of this.progressList) {
        if (item.url) {
          if (/^http/.test(item.url)) {
                list.push(item.url)
           } else {
                list.push('http://' + item.url)
           }
        }
      }
      console.log(list)
      return list
    }
  }
}
</script>
<style scoped>
.file-item{}
.file-name{width: 30%;display: inline-block;vertical-align: middle;}
.file-speed{width: 30%;display: inline-block;vertical-align: middle;}
.file-percent{width: 30%;display: inline-block;vertical-align: middle;}
.file-pro{width: 30%;position: relative;}
.file-close{position: absolute;right: -30px; top:-10px;padding: 10px;}
</style>
