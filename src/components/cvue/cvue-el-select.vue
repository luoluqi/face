<template>
    <div class="select-wrap">
      <el-select placeholder="请选择" 
                 v-model="newValue" 
                :disabled="disabled"
                clearable filterable 
                remote :remote-method="searchPerson" 
                @focus="resetData"
                @change="handleChange" :size="size">
        <el-option  label="请选择" value="others" ref="personBox"></el-option>
        <el-option v-for="item in persons" :key="item.userAccount" :label="item.name" :value="item.userAccount"></el-option>
      </el-select>
    </div>
</template>
<script>
export default {
    name:'dooneInput',
    data(){
        return {
            newValue:'',
            persons:[],
            page:1,
            limit:20,
        }
    },
    props:['valueProp','selectList','keyValue','label','value','disabled','size'],
    methods:{
        resetData(){
            var self = this;
            self.persons = []
            self.page = 1
            self.getAllPersons('persons',self.page,self.limit)
        },
        handleChange(val){
            // console.log(val)
            this.$emit('input',val)
        },
        //查询组织所有用户
        getAllPersons(key,page,limit){
            var params = {
                limit:limit,
                offset:page*limit-limit,
            }
            this.$store.dispatch('dictionary/QueryUserList',params).then(res=>{
                // console.log(res)
                if(res.data.success){
                    this[key]=this[key].concat(res.data.rows)
                    // console.log(this[key])
                }
            })
        },
        searchPerson(query){
            // console.log(query)
            var params = {
                limit:this.limit,
                offset:this.page*this.limit-this.limit,
                userName:query
            }
            this.$store.dispatch('dictionary/QueryUserList',params).then(res=>{
                // console.log(res)
                if(res.data.success){
                    // this[key]=this[key].concat(res.data.rows)
                    this.persons = res.data.rows
                    // console.log(this.persons)
                }
            })
        },
    },
    watch: {
        value(newV,oldV){
            // console.log(newV)
            if(newV!=null&&newV!=''){
                if(this.newValue=='others'){
                    this.newValue = ''
                }else{
                    var params = {
                        limit:this.limit,
                        offset:this.page*this.limit-this.limit,
                        userAccount:newV
                    }
                    // console.log(params)
                    this.$store.dispatch('dictionary/QueryUserList',params).then(res=>{
                        if(res.data.success){
                            this.newValue = res.data.rows[0].name
                            // console.log(res.data.rows[0].name)
                        }
                    })
                }
            }else{
                 this.newValue = ''
            }
        }
    },
    created(){
        if(this.value!=null&&this.value!=''){
            if(this.newValue=='others'){
                this.newValue = ''
            }else{
                var params = {
                    limit:this.limit,
                    offset:this.page*this.limit-this.limit,
                    userAccount:this.value
                }
                // console.log(params)
                this.$store.dispatch('dictionary/QueryUserList',params).then(res=>{
                    if(res.data.success){
                        this.newValue = res.data.rows[0].name
                        // console.log(res.data.rows[0].name)
                    }
                })
            }
        }
    },
    mounted(){
        var self = this;
        self.persons = []
        self.page = 1
        self.getAllPersons('persons',self.page,self.limit)
        var selectWrap = self.$refs.personBox.$el.parentNode.parentNode
        selectWrap.onscroll=function(){
            // console.log(this.scrollTop)
            if(self.page==1){
                if(this.scrollTop>118){
                    self.page += 1
                    self.getAllPersons('persons',self.page,self.limit)
                }
            }else{
                if(this.scrollTop>118+(320)*(self.page-1)){
                    self.page += 1
                    self.getAllPersons('persons',self.page,self.limit)
                } 
            }
        }
    }
}  
</script>
<style lang="scss">

</style>