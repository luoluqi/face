<template>
        <div class="item-p">
            <chart
            :options="line"
            :init-options="initOptions"
            ref="bar"
            autoresize
            />
        </div>
</template>
<script>
/* eslint-disable */
import ECharts from '@/components/echarts/ECharts.vue'

import 'echarts/lib/chart/line'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'



import line from './line'
export default {
    components: {
        chart: ECharts
    },
   props:{
        //[
	//{legend:"推荐量",color:"#34243",series:[{name:"1",value:123},{name:"2",value:12321}]},
	//{legend:"阅读量",color:"#34243",series:[{name:"1",value:123},{name:"2",value:12321}]},
    //]
        data: {
            type:Array,
            default:[]
        },
        title: {
             type:String,
            default:''
        }
    },
    watch:{
        data(newVal,oldVue){
           this.init()
        }
    },
    data(){
        return {
           
             line:{
                title: {
                    text: this.title
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:[]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    // {
                    //     name:'邮件营销',
                    //     type:'line',
                    //     stack: '总量',
                    //     data:[120, 132, 101, 134, 90, 230, 210],
                    //     itemStyle:{
                    //         normal:{color:'#0288d1'},
                            
                    //         }
                    //     }
                   
                ]
            },
            initOptions: {
                renderer: 'canvas'
            },
        }
    },
    methods: {
        init() {
           
            var legendData = []
            var xAxisData = []
            var series = []
            for(var item of this.data[0].series){
                xAxisData.push(item.name)
            }
           for(var item of this.data){
               legendData.push(item.legend)
               series.push({
                   name:item.legend,
                    type:'line',
                   
                    data:item.series.map(obj => obj.value),
                    itemStyle:{
                     normal:{color:item.color}
                    
                    }
               })
           }
           this.line.legend.data = legendData
           this.line.xAxis.data = xAxisData
           this.line.series = series
        }
    },
    mounted(){
              this.init()
    }
}
</script>
<style scoped>
.item-p{
  width: 100%;
    height: 100%;
}
</style>