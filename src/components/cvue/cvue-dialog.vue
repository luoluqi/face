<template>
    <div>
        <el-dialog title="提示" 
                   :before-close="handleClose"
                   :visible.sync="dialogVisible">
            <div class="dialog-body">
                <slot name="dialogBody"></slot>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button @click="confirmDialog">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'cvueDialog',
    data () {
        return {
            msg: 'hello'
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        componentName: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClose () {
            this.handleConfirm('确定要关闭吗', () => {
                this.dialogVisible = false
            })
        },
        closeDialog () {
            this.$emit('closeDialog')
        },
        confirmDialog () {
            this.$emit('confirmDialog')
        }
    }
}
</script>
<style lange = "scss" scoped>
</style>
