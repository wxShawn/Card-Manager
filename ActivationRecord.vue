<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>卡牌激活</span>
        <div>
          <el-button type="text" @click="addData">新增</el-button>
          <el-button type="text" @click="dialogVisible = true">批量导入</el-button>
          <el-dialog v-model="dialogVisible" title="卡牌激活记录导入">
            <el-upload action="#" :auto-upload="false" :file-list="fileList" :on-change="loadJsonFile">
              <el-button size="small" type="primary">选择文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  支持导入json文件,格式：
                  {"arData": [{"date": "yy-mm-dd", cards: ["白羊": 2, "双子": 0, ......]}, ......]}
                </div>
              </template>
            </el-upload>
            <div style="color: #f00">{{ tip }}</div>
          </el-dialog>
        </div>
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
      dialogVisible: false,
      fileList: [],
      tip: '',
    }
  },
  methods: {
    loadJsonFile: function(file,fileList) {
      this.tip = '';
      if (fileList.length > 0) {//替换前面上传的文件
        this.fileList = [fileList[fileList.length - 1]];
      }
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        try {//验证文件的数据格式
          let format = false;
          let dataList = JSON.parse(e.target.result)['arData'];
          if (dataList) {
            for (let i = 0; i < dataList.length; i++) {
              if (dataList[i].date && dataList[i].cards) {
                let cards = dataList[i].cards
                for (let j = 0; j < cards.length; j++) {
                  if (cards[j].type) {
                    switch (cards[j].type) {
                      case '白羊+射手':
                      case '双子+水瓶':
                      case '巨蟹+双鱼':
                      case '金牛+摩羯':
                      case '天秤+天蝎':
                      case '狮子+天蝎':
                      case '处女+天秤':
                      case '白羊':
                      case '金牛':
                      case '双子':
                      case '巨蟹':
                      case '狮子':
                      case '处女':
                      case '天秤':
                      case '天蝎':
                      case '射手':
                      case '摩羯':
                      case '水瓶':
                      case '双鱼':
                        if ((cards[j].amount || cards[j].amount == 0) && (typeof cards[j].amount === 'number')) {
                          format = true;//格式验证成功
                        } else {
                          format = false;
                          this.tip = `arData[${i}].cards[${j}].amount属性格式错误或不存在`;
                          console.log(this.tip);
                        }
                        break;
                      default:
                        format = false;
                        this.tip = `arData[${i}].cards[${j}].type属性格式错误`;
                        console.log(this.tip);
                        break;
                    }
                  }else {
                    format = false;
                    this.tip = `arData[${i}].cards[${j}].amount属性格式不存在`;
                    console.log(this.tip);
                  }
                }
              } else {
                format = false;
                this.tip = `arData[${i}].date 或 arData[${i}].cards属性格式不存在`;
                console.log(this.tip);
              }
            }
          }
          if (format) {//验证成功，将数据上传至父组件
            this.$emit('changeData', dataList);
          }
        } catch (error) {
          this.tip = '文件格式不正确!';
          console.log(this.tip);
        }
      }
    },
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