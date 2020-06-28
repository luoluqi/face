<template>
    <span ref="dooneNumber" :step="step" class="doone-number" :data-value="value" :class="cssClass" :time="time"><em ref="dNumber">0</em><slot name="unit"></slot></span>
</template>
<script>
export default {
    name:'dooneNumber',
    data () {
        return {
            message:''
        }
    },
    props:{
        step:{
            type:Number,
            default:2
        },
        value:{
            type:Number,
            default:0
        },
        cssClass:{
            type:String,
            default:''
        },
        time:{
            type:Number,
            default:50
        }
    },
    methods:{
        numberPlus(ele){
            var self = this;
            var step = self.step*self.value/100;
            var start = 0;
            var timer = setInterval(function(){
                start += step;
                if(start>=self.value||step==0){
                    clearInterval(timer);
                    start = self.value;
                    timer = null
                }
              self.$refs.dNumber.innerHTML = start.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
            },self.time)
        }
    },
    mounted() {
        this.numberPlus(this.$refs.dooneNumber)
    },
}
</script>
<style lang="scss">
</style>