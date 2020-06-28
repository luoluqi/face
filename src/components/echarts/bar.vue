<template>
        <div class="item-p">
            <chart
            :options="bar"
            :init-options="initOptions"
            ref="bar"
            theme="ovilia-green"
            autoresize
            />
        </div>
</template>
<script>
/* eslint-disable */
import ECharts from '@/components/echarts/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
export default {
    components: {
        chart: ECharts
    },
    props:{
        //[{name:"推荐量",color:"#34243",value:123},
	//{name:"阅读量",color:"#34243",value:123},
	//{name:"转发量",color:"#34243",value:123},
	//{name:"收藏量",color:"#34243",value:123}
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
          
            bar:{
                title: {
                    text: this.title,
                    x: 'center',
                    textStyle:{
                        color: '#666',
                        fontSize: 12
                    },
                    bottom:25
                },
                // tooltip: {
                //     trigger: 'axis',
                //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                //     }
                // },
                legend: {
                    bottom: 3,
                    left: 'center'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '20%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show:false,
                            alignWithLabel: true,
                            lineStyle: {
                                color:'#666666',
                            }
                        },
                        axisLabel: {
                            color: '#666666',
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color:'#666666'
                            } 
                        }
                        
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show:true,
                        axisTick: {
                            show:false,
                            alignWithLabel: true,
                            lineStyle: {
                                color:'#666666'
                            }
                        },
                        axisLabel: {
                            color: '#666666',
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color:'#666666'
                            } 
                        }
                    }
                ],
                series: [
                    // {
                    //     name: '',
                    //     type: 'bar',
                    //     barWidth: '40%',
                    //     label: {
                    //         show: false,
                    //         position: 'top'
                    //     },
                    //     data: [
                             
                    //     ]
                        
                    // }
                ]
            },
            
            initOptions: {
                renderer: 'canvas'
            },
        }
    },
    methods: {
        init() {
            var list = []
            var xAxisData = [] 
            var colorData = []
            var k = 0;
            for(var item of this.data){
                var dataArr = []
                for (var i = 0; i<this.data.length; i++) { // 初始化数组
                    dataArr.push(0)
                }
                k++;
                dataArr[k-1] = item.value // 改变数组每个位置的数值
                var name = item.name;
                var color = item.color;
                list.push( {
                    name: name,
                    type: 'bar',
                    barWidth: '40%',
                    label: {
                        show: false,
                        position: 'top',
                    },
                    barGap: '-100%',
                    data:dataArr
                    // itemStyle:{
                    //     normal:{color:color}
                    // }
                })
                xAxisData.push(name)
                colorData.push(color)
            }
            this.bar.series = list   
            this.bar.xAxis[0].data = xAxisData
            this.bar.color = colorData
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