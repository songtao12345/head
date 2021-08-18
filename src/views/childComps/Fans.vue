<template>
   <div>
       <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >粉丝管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card>
          <!-- <el-radio-group v-model="select">
            <el-radio-button label="粉丝列表"></el-radio-button>
            <el-radio-button label="粉丝画像"></el-radio-button>
         </el-radio-group> -->

          <div ref="main" style="width: 600px;height:400px;"></div>


      </el-card>


   </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'Fans',
    data() {
       return {
          select: '粉丝列表',
          option: {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
            }
       }
    },
    methods: {

    },
    mounted() {
       var myChart = echarts.init(this.$refs.main)

       myChart.setOption(this.option);
    }
}
</script>

<style scoped>
 
</style>