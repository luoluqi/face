<template>
    <div class="con-cah">
        <chart
					:options="pie"
					:init-options="initOptions"
					ref="pie"
					autoresize
					/>
    </div>
</template>
<script>
/* eslint-disable */
import ECharts from '@/components/echarts/ECharts.vue'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
export default {
    components:{
        chart:ECharts
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
            default:'昨日宿舍考勤情况'
        }
    },
    watch:{
        data(newVal,oldVue){
           this.init()
        }
    },
    data(){
        return {
            initOptions: {
                renderer: 'canvas'
            },
            pie:{
                title: {
                    text: this.title,
                    x: 'center',
                    textStyle:{
                        color: '#666',
                        fontSize: 12
                    },
                    bottom:25
                },
                grid: {
                    top:0,
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{a} <br/>{b} : {c} ({d}%)'
                // },
                legend: {
                    // orient: 'vertical',
                    left: 'center',
                    bottom: 3
                },
                series: [
                    {
                        name: this.title,
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            }
                        },
                        data: [

                        ],
                        itemStyle: {
                            emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
                }
        }
    },
    methods: {
        init() {
            var list = []
            for(var item of this.data){
                var value = item.value;
                var name = item.name;
                var color = item.color;
                list.push({
                    value: item.value, 
                    name: item.name ,
                    itemStyle:{
                        normal:{color:item.color}
                    
                    }
                })
            }
            this.pie.series[0].data = list   
        }
    },
    mounted(){
              this.init()
    }
}
</script>
<style  scoped>
.con-cah{
    width: 100%;
    height: 100%;
}
</style>