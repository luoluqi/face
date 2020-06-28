/* eslint-disable */
<template>
    <div style="width:400px;">
         <el-upload
                    ref="upload"
                    class="upload-demo"
                    :action="public2 + '/api/File/UploadFileV2'"
                     :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success='handleSuccess'
                    :before-upload='handleBeforeUpload'
                    multiple
                    :file-list="fileList"
                   accept='.png,.jpg,.jpeg,.mp3,.mp4,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.rar,.zip'
                   
                   >
                    <el-button ref="uploadBtn" size="small" type="primary">选择文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传不超过1G的文件</div>
                </el-upload>
           
    </div>
</template>
<script>
import {Encrypt} from '@/util/crypto'
import {public2} from '@/config/config'
import {getCookie} from '@/util/tool'
export default {
    props:{
        fileList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
          public2
        }
    },
    computed:{
         headers () {
            var obj = {}
            obj.sign = Encrypt(new Date().getTime())
            obj.Token = getCookie('Token')
            return obj
        }
    },
    methods:{
        handleRemove(file, fileList) {
         
            if(file.response){
                  var res = JSON.parse(file.response)
                file = res.Data
                file.name = file.fileName
                file.url = file.fileUrl
            }
             this.$emit('remove',file)
        },
        handlePreview(file) {
            console.log(file);
        },
        handleBeforeUpload(file){
            var name = file.name
             var lastIndex = name.lastIndexOf('.')
            var suffix = name.substring(lastIndex + 1).toUpperCase()
            var size = file.size
            if(size > 1000 * 1024 * 1024){
                this.$message.error('不能上传超过1G的文件')
                return false
            }
            //png,.jpg,.jpeg,.mp3,.mp4,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.rar,.zip
            var flag = suffix == 'PNG' || suffix == 'JPG' || suffix == 'JPEG' || suffix == 'MP3'
             || suffix == 'MP4' || suffix == 'DOC' || suffix == 'DOCX' || suffix == 'XLS'
              || suffix == 'XLSX' || suffix == 'PPT' || suffix == 'PPTX' || suffix == 'PDF'
              || suffix == 'TXT'|| suffix == 'RAR'|| suffix == 'ZIP'
            if(!flag){
                 this.$message.error('不能上传' + suffix + '文件')
                return false
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return true
        },
        handleSuccess(response, file, fileList){
            var res = JSON.parse(file.response)
            var file = res.Data
            file.name = file.fileName
            file.url = file.fileUrl
       
         
           this.$emit('success',file)
        }
    }
}
</script>
<style scoped>

</style>