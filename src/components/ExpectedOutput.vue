<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>ME 产出预计</span>
      </div>
    </template>
    <div :style="`height: ${chartHeight}px`" ref="chart"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
import { cardCalc } from '../common/common';
import { dateDifferenceCalc } from '../common/common.js';
import { getToday } from '../common/common.js';
import { addDay } from '../common/common.js';

export default {
  props: [
    'arData',
    'height',
  ],
  data() { 
    return { 
      
    } 
  },
  mounted() { 
    this.init();
  },
  methods: {
    init: function() {
      let myChart = echarts.init(this.$refs.chart);
      let options = {
        title: {
          // text: 'ME 产出预计'
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          data: this.chartData().dateList,
        },
        yAxis: {},
        series: [
          {
            name: 'ME产出',
            type: 'line',
            data: this.chartData().incomeList,
          }
        ],
        grid: {
          x: 30,
          y: 30,
          x2: 30,
          y2: 50
        },
      }
      myChart.setOption(options);

      window.addEventListener('resize',() => {myChart.resize()});

      setInterval(() => {// 每隔500ms刷新数据
        myChart.setOption({
          xAxis: {
            data: this.chartData().dateList,
          },
          series: [
            {
              name: 'ME 产出',
              type: 'line',
              data: this.chartData().incomeList,
            }
          ]
        });
      }, 500);
    },
    chartData: function() {
      let dateList = [];
      let incomeList = [];
      let today = getToday();
      for (let i = 0; i < 30; i++) {
        let income = 0;
        for (let j = 0; j < this.arData.length; j++) {
          let dateDif = dateDifferenceCalc(this.arData[j].date, today);
          if (dateDif > (0 - i) && dateDif <= (40 - i)) {//激活日期距今天在1-40（天）这个范围才会产生收益
            income += (cardCalc(this.arData[j].cards).income) / 40;
          }
        }
        income = parseFloat(income.toFixed(4));//保留4位小数并删除末尾无效的'0'（解决js浮点数运算丢失精度的问题）
        incomeList.push(income);
        dateList.push(addDay(today, i));
      }
      return {
        incomeList,
        dateList
      }
    }
  },
  computed: {
    chartHeight() {
      let h = 0;
      if (this.height) {
        h = parseInt(this.height) - 100;
      } else {
        h = 300;
      }
      return h;
    }
  }
}
</script>

<style>

</style>