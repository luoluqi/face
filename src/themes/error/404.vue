<template>
    <div class="error-page page-500-full-page">
        <div class="row">
            <div class="col-md-12 page-500">
                <div class=" number font-red"> 404 </div>
                <div class=" details">
                    <h3>哎呀！出了点问题。</h3>
                    <p> 我们正在修理它！请过一会儿再来。</p>
                    <p><a href="index.html" class="btn red btn-outline"> 返回首页 </a> </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            msg: 'hello'
        }
    }
}
</script>
<style lang='scss' scoped>
@import url("./css/error.css");
</style>
