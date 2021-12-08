<template>
   <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>卡牌类型比例</span>
      </div>
    </template>
    <div ref="chart" style="height: 315px"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: [
    'arData',
  ],
  mounted() {
    this.init();
  },
  methods: {
    //初始化图标
    init: function() {
      let myChart = echarts.init(this.$refs.chart);
      myChart.setOption({
        title: {
          // text: '卡片占比'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            color: ['#63b2ee','#76da91','#f8cb7f','#f89588','#7cd6cf','#9192ab',
            '#7898e1','#efa666','#eddd86', '#9987ce','#63b2cc', '#76da91'],
            data: this.chartData(),
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
      });

      window.addEventListener('resize',() => {myChart.resize()});

      setInterval(() => {// 每隔500ms刷新数据
        myChart.setOption({
          series: [
            {
              data: this.chartData(),
            }
          ]
        });
      }, 500);
    },
    //计算图标所需数据
    chartData: function() {
      let data = [
        {value: 0, name: '白羊'},
        {value: 0, name: '金牛'},
        {value: 0, name: '双子'},
        {value: 0, name: '巨蟹'},
        {value: 0, name: '狮子'},
        {value: 0, name: '处女'},
        {value: 0, name: '天秤'},
        {value: 0, name: '天蝎'},
        {value: 0, name: '射手'},
        {value: 0, name: '摩羯'},
        {value: 0, name: '水瓶'},
        {value: 0, name: '双鱼'},
      ];
      for (let i = 0; i < this.arData.length; i++) {
        let cards = this.arData[i].cards
        for (let j = 0; j < cards.length; j++) {
          //计算普通卡张数
          for (let k = 0; k < data.length; k++) {
            if (data[k].name == cards[j].type) {
              data[k].value += cards[j].amount;
            }
          }
          //计算合成卡原卡张数
          let condition = (
            cards[j].type == '白羊+射手' || 
            cards[j].type == '双子+水瓶' || 
            cards[j].type == '巨蟹+双鱼' || 
            cards[j].type == '金牛+摩羯' ||
            cards[j].type == '天秤+天蝎' || 
            cards[j].type == '狮子+天蝎' || 
            cards[j].type == '处女+天秤' 
          );
          if (condition) {
            let nameA = cards[j].type.split('+')[0];
            let nameB = cards[j].type.split('+')[1];
            setValue(nameA, cards[j].amount);
            setValue(nameB, cards[j].amount);
          }
        }
        this.arData[i]
      }
      //函数：给name为指定值的对象增加value值
      function setValue(name, value) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].name == name) {
            data[i].value += value;
          }
        }
      }
      //删除value为0的数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].value == 0) {
          data.splice(i, 1);
          i--;
        }
      }

      return data;
    }
  },
}
</script>

<style>

</style>