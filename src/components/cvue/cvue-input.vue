<template>
    <el-input v-model="newValue" 
              @blur="handleBlur" 
              ref="dText" 
              :type="inputType" 
              :class="cssClass"
              :disabled="disabled"
              :autosize="autosize"></el-input>
</template>
<script>
export default {
    name:'dooneInput',
    data(){
        return {
            newValue:'',
            // oldNum:'',
        }
    },
    props:['value','inputType','autosize','cssClass','disabled'],
    // props:{
    //     value:{
    //        type:Number,
    //        default:''  
    //     },
    //     inputType:{
    //         type:String,
    //         default:'input'
    //     },
    //     autosize:{
    //         type:Boolean,
    //         default:false
    //     },
    //     cssClass:{
    //         type:String,
    //         default:''
    //     },
    //     disabled:{
    //         type:Boolean,
    //         default:'false'
    //     }
    // },
    methods:{
        handleBlur($event){
            var valueData = this.rmoney1($event.target.value)
            this.newValue = this.numberFormat(valueData)
            //console.log(valueData)
            this.$emit('input',valueData)
            this.$emit('blur',null,null,null,null,null,true,null,null)
        },
        numberFormat(number, decimals, dec_point, thousands_sep) {
      　　 number = (number + '').replace(/[^0-9+-Ee.]/g, '');
      　　 var n = !isFinite(+number) ? 0 : +number,
      　　 prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        　　sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        　　dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        　　s = '',
      　　 toFixedFix = function(n, prec) {
        　　　　var k = Math.pow(10, prec);
        　　　　return '' + Math.ceil(n * k) / k;
        　　};
      
        　　s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      　　 var re = /(-?\d+)(\d{3})/;
      　　 while(re.test(s[0])) {
        　　　　s[0] = s[0].replace(re, "$1" + sep + "$2");
        　　}
      
        　　if((s[1] || '').length < prec) {
          　　 s[1] = s[1] || '';
            　　s[1] += new Array(prec - s[1].length + 1).join('0');
        　　}
        　 return s.join(dec);
        },
        rmoney1(e) { 
          if(isNaN(e)){
            return parseFloat(e.replace(/[^\d\.-]/g, "")).toFixed(2)
          }else{
            e=e?parseFloat(e).toFixed(2):0;
            return e;
          }
        },
    },
    watch:{
      value(newV,oldV){
        // console.log(this.value)
        this.newValue = this.numberFormat(this.value)
      }
    },
    created(){
      // console.log(this.value)
      this.newValue = this.numberFormat(this.value)
      this.$emit('input',parseFloat(this.value).toFixed(2))
    },
    updated(){
      this.$emit('input',parseFloat(this.value).toFixed(2))
    }
}  
</script>
<style lang="scss">

</style>