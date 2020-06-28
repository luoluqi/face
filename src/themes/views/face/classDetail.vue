<template>
   <div class="main-div">
       <div class="head-div">
           <el-button @click="toHome" type="text">{{schoolName}}</el-button>
                <span>{{curClass.gradeName}}{{curClass.className}}</span>
       </div>
       <div class="body-div">
                 <div class="left-div">
                          <div slot="header" class="stu-list-t">
                            <span>学生列表</span>
                            <div class="stu-count">采集情况：{{curClass.collectedNumber}}/{{curClass.studentNumber}}</div>
                            <div class="stu-count">
                                <span>是否采集：</span>
                                  <el-select v-model="isCollected" @change="handleChange" style="width:80px;" placeholder="请选择">
                                       <el-option
                                    label="全部"
                                    value=""></el-option>
                                    <el-option
                                    label="有"
                                    :value="1"></el-option>
                                     <el-option
                                    label="无"
                                    :value="0">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="thead">
                            <div class="td">准考证</div>
                            <div class="td">姓名</div>
                            <div class="td">采集图片</div>
                        </div>
                         <div  class="list-p">
                              <div  @click="selectStu(item)" :class="{'active': item.id == curStu.id}"
                                v-for="(item, index) in list" :key="index" class="tr">
                                <div class="td">{{item.loginName}}</div>
                                <div class="td">{{item.name}}</div>
                                <div class="td">
                                    <div class="img-p">
                                        <img :src="item.faceImgUrl" alt="" onerror="this.src='static/default.png'">
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                             <div class="list-bo">
                                 <!-- <div v-if="isMore">
                                     <i class="el-icon-loading"></i>加载中
                                 </div> -->
                                 <div >
                                     没有更多了
                                 </div>
                             </div>
                         </div>
                </div>
                <div class="right-div">
                    <!-- <video src="https://www.w3school.com.cn/i/movie.ogg"  width="320" height="240" controls="controls">
                    Your browser does not support the video tag.
                    </video> -->
                    <div class="stu-name">{{curStu.name}}</div>
                    <div class="photo-p">
                        <div class="photo-text">摄像头</div>
                        <video v-show="!isStop" id="video" width="300" height="300" class="photo-img"></video>
                         <img v-show="isStop" :src='dataURL' />
                         <canvas id="canvas" width="300" height="300" class="photo-img" style="display: none;"></canvas>
                    </div>
                    <div class="photo-p">
                        <div class="photo-text">已保存的采集图片</div>
                        <div class="photo-img">
                            <img v-if="curStu.faceImgUrl" :src="curStu.faceImgUrl" alt="" class="face-img">
                            <div v-else class="no-col">未采集</div>
                        </div>
                        
                    </div>
                    <div class="oper-p">
                         <el-button v-show="!isStop" @click='capture' type="primary">拍摄</el-button>
                         <div class="oper-tr">
                            <el-button v-show="!isStop" @click='selectFile' type="success">本地上传</el-button>
                            <input id="classFile" 
                            @change="inputChange"
                            type="file" accept="image/*" style="display:none;" />
                         </div>
                        <el-button v-show="isStop" @click="save" type="primary">保存</el-button>
                        <el-button v-show="isStop" @click="cancel">取消</el-button>
                    </div>           
                </div>
            
       </div>
   </div>
</template>

<script>
/* eslint-disable */
import {getStudentList, getClassList, getClassDetail, getGradeList, getStageList, updateStudent, getCosTmpKey} from '@/api/baseDataApi'
import {uploadFile} from '@/api/commonApi'
import COS from '@/util/COS'
export default {
    name: 'classDetail',
    computed: {
        curClass () {
            return this.$store.state.face.curClass
        },
          schoolId () {
           return this.$store.getters.schoolId
        },
         schoolName () {
             return this.$store.getters.schoolName
        }
    },
    data () {
        return {
                PageNum: 0,
                PageSize: 10,
                total: 0,
               
                list: [],
                isMore: false,
                isCollected: '',

                video: '',
                canvas: '',
                context: '',
                curStu: '',
                fileUrl: '',
                dataURL: '',
                isStop: false,
                COS: '',
                mediaStreamTrack: null
            }
    },
    methods: {
        toHome () {
            this.$router.push('home')
        },
        loadmore () {
            console.log('load...')
            this.getList()
        },
        
        getList () {
            this.PageNum++
            var params = {
                // PageNum: this.PageNum,
                // PageSize: this.PageSize,
                schoolId: this.schoolId,
                classId: this.curClass.classId
            }
            if (this.isCollected !== '') {
                params.isCollected = this.isCollected
            }
            getStudentList(params).then(res => {
                
                var arr = res.items.sort(function compareFunction(a, b) {
                    return a.name.localeCompare(b.name, "zh")
                })
                this.list = arr
            })
        },
        handleChange () {
            this.PageNum = 0
            this.isMore = true
            this.list = []
            this.getList()
        },
        selectStu (item) {
            this.curStu = item
            this.isStop = false
        },
        capture () {
            if (!this.curStu) {
                this.$message.error('请先选择学生')
                return
            }
            this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
            // this.context.fillStyle = '#ccc'
            // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
            // var random = Math.random()
            
            // console.log(random)
            // if (random < 0.3) {
            //     this.context.fillStyle = '#FF0000'
            // }
            // if (0.3 < random && random < 0.6) {
            //     this.context.fillStyle = '#67C23A'
            // }
            // if (0.6 < random && random < 0.9) {
            //     this.context.fillStyle = '#E6A23C'
            // }
            // if (0.9 < random && random < 1) {
            //     this.context.fillStyle = '#909399'
            // }
            
            // this.context.fillRect(0, 0, 150, 75)

            this.dataURL = this.canvas.toDataURL("image/jpeg", 1.0)
            this.isStop = true
        },
        save () {
            if (!this.curStu) {
                this.$message.error('请先选择学生')
                return
            }
          
            var file = this.dataURLtoFile(this.dataURL, this.curStu.id + '.jpg')
            COS.putObject(file).then(res => {
                this.fileUrl = res

               updateStudent({
                    id: this.curStu.id,
                    faceImgUrl: this.fileUrl
                }).then(res => {
                    this.$message.success('保存成功')
                    this.isStop = false

                    this.curStu.faceImgUrl = this.fileUrl

                    this.getClassDetail()
                })
            })
        },
        cancel () {
            this.isStop = false
        },
        dataURLtoFile(dataurl, filename) {//将base64转换为文件
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], filename, {type: mime})
        },
        selectFile () {
             if (!this.curStu) {
                this.$message.error('请先选择学生')
                return
            }
            document.getElementById('classFile').click()
        },
        inputChange (e) {
            var file = e.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload =  (e) => {
                //将结果显示到canvas
                var dataUrl = reader.result
                //加载图片
                var img = new Image();
                img.onload = () => {
                    var rotoImg = img.width / img.height
                    var rotoCanvas = this.canvas.width / this.canvas.height
                    if (rotoImg >= rotoCanvas) {
                        var newWidth = this.canvas.width
                        var newHeigth = (newWidth /  img.width) * img.height
                    } else {
                        var newHeigth = this.canvas.height
                        var newWidth = (newHeigth /  img.height) * img.width
                    }

                    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
                    this.context.fillStyle="#fff"
                    this.context.fillRect(0,0,this.canvas.width,this.canvas.height)
                    // this.context.drawImage(img, 0, 0, img.width, img.height);
                    this.context.drawImage(img, 0, 0,  img.width, img.height, (this.canvas.width - newWidth) / 2, (this.canvas.height - newHeigth) / 2, newWidth, newHeigth)
                       this.dataURL = this.canvas.toDataURL("image/jpeg", 1.0)
                        this.isStop = true
                }
                img.src = dataUrl;
            }

             document.getElementById('classFile').value = ''
        },

        getClassDetail () {
            getClassDetail(this.curClass.classId).then(res => {
                console.log(res)
                this.$store.state.face.curClass.collectedNumber = res.collectedNumber
            })
        }
    },
    destroyed () {
        console.log('destroy....')
        
   		let stream = document.getElementById('video').srcObject
        let tracks = stream.getTracks()

        tracks.forEach(function(track) {
            track.stop()
        });

        document.getElementById('video').srcObject = null
    },
    mounted () {
        var self = this

        this.getList()

            // 访问用户媒体设备的兼容方法
            function getUserMedia (constraints, success, error) {
                if (navigator.mediaDevices.getUserMedia) {
                    // 最新的标准API
                    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
                } else if (navigator.webkitGetUserMedia) {
                    // webkit核心浏览器
                    navigator.webkitGetUserMedia(constraints, success, error)
                } else if (navigator.mozGetUserMedia) {
                    // firfox浏览器
                    navigator.mozGetUserMedia(constraints, success, error)
                } else if (navigator.getUserMedia) {
                    // 旧版API
                    navigator.getUserMedia(constraints, success, error)
                }
            }

            let video = this.video = document.getElementById('video')
            let canvas = this.canvas = document.getElementById('canvas')
            let context = this.context = canvas.getContext('2d')

            function success (stream) {
                 self.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1]
                // 兼容webkit核心浏览器
                let CompatibleURL = window.URL || window.webkitURL
                // 将视频流设置为video元素的源
                console.log(stream)

                // video.src = CompatibleURL.createObjectURL(stream);
                video.srcObject = stream
                video.play()
            }

            function error (error) {
                console.log(`访问用户媒体设备失败${error.name}, ${error.message}`)
            }
            
            if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
                // 调用用户媒体设备, 访问摄像头
                getUserMedia({video: {width: 300, height: 300}}, success, error)
            } else {
                alert('不支持访问用户媒体')
            }
    }
}
</script>

<style scoped>
.main-div{
    height: calc(100% - 100px);
    margin: 0 auto;
    min-width: 1240px;
}
.head-div{
    padding: 10px;
    border-bottom: #efefef 1px solid ;
      background: #fff;
}
.body-div{
    padding: 10px;
     height: calc(100% - 60px);
      text-align: center;
}

.left-div{
    width: 40%;
    min-width: 430px;
    display: inline-block;
    vertical-align: top;
    margin: 0 2% 0 0;
    height: calc(100% - 20px);
    overflow-y: hidden; 
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
      background: #fff;
}
.list-p{
     height: calc(100% - 140px);
    overflow-y: scroll; 
    
}
.line{
border-bottom: 1px solid #eaeaea;
}
.right-div{
    width: 50%;
    min-width: 700px;
    display: inline-block;
    vertical-align: top;
     height: calc(100% - 20px);
     box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
       background: #fff;
}
.stu-list-t{
    text-align: left;
    padding:  20px;
}
.stu-count{
    display: inline-block;
    margin: 0 0 0 30px;
    
}
.thead{
    font-size: 20px;
    padding: 10px 0;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2);
}
.tr{
    padding: 10px 0;
    border-top: 1px solid #eaeaea;
    cursor: pointer;
}
.tr.active{
    color: #409eff;
}
.td{
    display: inline-block;
    width: 31%;
    vertical-align: middle;
}
.img-p{
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
}
.img-p img{
    max-width: 100%;
    max-height: 100%;
}
.stu-name{
    text-align: left;
     padding: 20px;
}
.photo-p{
    display: inline-block;
    margin: 0 20px;
    vertical-align: top;
}
.photo-text{
    text-align: left;
    padding: 10px;
}
.photo-img{
    width: 300px;
    height: 300px;
    display: inline-block;
    border: 1px solid #eaeaea;
}
.oper-p{
    padding: 20px 0;
}
.list-bo{
    padding:30px 0;
    color: #409eff
}
.text-left{
    text-align: left
}
.no-col{
    text-align: center;
    color: #8e8d8d;
    margin: 50% 0 0 0;
}
.oper-tr{padding: 10px 0;}
.face-img{
    max-width: 100%;
    max-height: 100%;
}
</style>
