<template>
  <div class="line">
    <cvue-chart :width="width" :height="height" :option="option" :chartId="chartId" title="折线图"></cvue-chart>
  </div>
</template>
<script>
import cvueChart from '@/components/chart/cvue-chart'
export default {
  name: 'Line',
  components: {
    cvueChart
  },
  data () {
    return {
      msg: 'hello'
    }
  },
  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    chartId: {
      type: String,
      required: true,
      default: 'lineChart'
    },
    option: {
      type: Object,
      default: () => {
        return {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }]
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.line{
}
</style>
