<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>卡牌激活</span>
        <el-button class="button" type="text" @click="addData">新增</el-button>
      </div>
    </template>
    <el-table :data="arTableData" stripe height="743" style="width: 100%">
      <el-table-column label="激活时间">
        <template #default="data">
          <el-date-picker
            v-model="data.row.date"
            type="date"
            size="mini"
            @change="changeData(data)"
            style="width: 130px"
          >
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column prop="cost" label="成本（含合成费用）"/>
      <el-table-column prop="income" label="收益"/>
      <el-table-column label="操作" width="100">
        <template #default="data">
          <el-popover placement="left" :width="300" trigger="click">
            <template #reference>
              <el-button type="text" size="mini">详情</el-button>
            </template>
            <el-table :data="data.row.cards" style="width: 100%" height="500">
              <el-table-column prop="type" label="卡牌"/>
              <el-table-column label="数量" width="200">
                <template #default="cards">
                  <el-input-number v-model="cards.row.amount" :min="0" @change="changeData()"/>
                </template>
              </el-table-column>
            </el-table>
          </el-popover>
          <el-button type="text" size="mini" @click="removeData(data.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { cardCalc } from '../common/common.js'
import { getToday } from '../common/common.js'

export default {
  props: [
    'arData',
  ],
  data() {
    return {
      
    }
  },
  methods: {
    changeData: function(d) {//更新数据（bug：日期无法自动同步，传入表格对应行d进行手动赋值）
      var newArData = this.arData;
      if (d) {//如果传入d，则修改日期
        let date = new Date(d.row.date)
        newArData[d.$index].date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      }
      this.$emit('changeData', newArData)
    },
    addData: function() {//添加数据
      var newArData = this.arData;
      newArData.push({
        date: getToday(),
        cards: [
          {type: '白羊+射手', amount: 0},
          {type: '双子+水瓶', amount: 0},
          {type: '巨蟹+双鱼', amount: 0},
          {type: '金牛+摩羯', amount: 0},
          {type: '天秤+天蝎', amount: 0},
          {type: '狮子+天蝎', amount: 0},
          {type: '处女+天秤', amount: 0},
          {type: '白羊', amount: 0},
          {type: '金牛', amount: 0},
          {type: '双子', amount: 0},
          {type: '巨蟹', amount: 0},
          {type: '狮子', amount: 0},
          {type: '处女', amount: 0},
          {type: '天秤', amount: 0},
          {type: '天蝎', amount: 0},
          {type: '射手', amount: 0},
          {type: '摩羯', amount: 0},
          {type: '水瓶', amount: 0},
          {type: '双鱼', amount: 0},
        ]
      });
      this.$emit('changeData', newArData);
    },
    removeData: function(i) {//删除数据
      var newArData = this.arData;
      newArData.splice(i, 1);
      this.$emit('changeData', newArData);
    }
  },
  computed: {
    arTableData() {//生成表格数据
      var dataArray = []
      for (let i = 0; i < this.arData.length; i++) {
        let date = this.arData[i].date;
        let cost = cardCalc(this.arData[i].cards).cost;
        let income = cardCalc(this.arData[i].cards).income;
        let cards = this.arData[i].cards;

        let data = {
          date,
          cost,
          income,
          cards
        }
        dataArray.push(data);
      }
      return dataArray;
    }
  }
}
</script>

<style>

</style>