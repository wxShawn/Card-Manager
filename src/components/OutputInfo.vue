<template>
  <el-card class="box-card">
    <template #header>
    <div class="card-header">
        <span>信息概览</span>
    </div>
    </template>
    <el-descriptions border :column="1">
      <el-descriptions-item label="产出总量">
        <span class="number">{{ totalOutput }}</span> ME
      </el-descriptions-item>
      <el-descriptions-item label="已产出">
        <span class="number">{{ outputed }}</span> ME
      </el-descriptions-item>
      <el-descriptions-item label="剩余未产出总量">
        <span class="number">{{ notOutput }}</span> ME
      </el-descriptions-item>
      <el-descriptions-item label="明日产出">
        <span class="number">{{ nextOutput }}</span> ME
      </el-descriptions-item>
    </el-descriptions>
</el-card>
</template>

<script>
import { cardCalc } from '../common/common.js'
import { getToday } from '../common/common.js'
import { dateDifferenceCalc } from '../common/common.js'

export default {
  props: [
    'arData',
  ],
  computed: {
    totalOutput() {//产出总量
      let num = 0;
      for (let i = 0; i < this.arData.length; i++) {
        num += cardCalc(this.arData[i].cards).income;
      }
      return num;
    },
    outputed() {//已产出
      let num = 0;
      let today = getToday();
      for (let i = 0; i < this.arData.length; i++) {
        let dateDif = dateDifferenceCalc(this.arData[i].date, today);
        if (dateDif > 0 && dateDif <= 40) {
          num += cardCalc(this.arData[i].cards).income / 40 * dateDif;
        } else if (dateDif > 40) {
          num += cardCalc(this.arData[i].cards).income;
        }
      }
      return parseFloat(num.toFixed(4));//保留4位小数并删除末尾无效的'0'（解决js浮点数运算丢失精度的问题）
    },
    notOutput() {//未产出
      let num = 0;
      let today = getToday();
      for (let i = 0; i < this.arData.length; i++) {
        let dateDif = dateDifferenceCalc(this.arData[i].date, today);
        if (dateDif <= 0) {
          num += cardCalc(this.arData[i].cards).income;
        } else if (dateDif > 0 && dateDif <= 40) {
          num += cardCalc(this.arData[i].cards).income / 40 * (40 - dateDif);
        }
      }
      return parseFloat(num.toFixed(4));
    },
    nextOutput() {//明日产出
      let num = 0
      let today = getToday();
      for (let i = 0; i < this.arData.length; i++) {
        let dateDif = dateDifferenceCalc(this.arData[i].date, today);
        if (dateDif > -1 && dateDif <= 39) {
          num += cardCalc(this.arData[i].cards).income / 40;
        }
      }
      return parseFloat(num.toFixed(4));
    }
  }
}
</script>

<style scoped>
.number {
  color: #6e8ba9;
  font-weight: bold;
}
</style>