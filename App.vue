<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="20">ME. Card Manager</el-col>
        <el-col :span="4" style="text-align:right; line-height:60px">
          <el-popover
            placement="bottom"
            :title="helpInfo.title"
            :width="200"
            trigger="click"
            :content="helpInfo.content"
          >
            <template #reference>
              <el-button type="text" style="color:#ededed">Help ?</el-button>
            </template>
          </el-popover>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="16">
        <el-col :span="24" :lg="12" :xl="16">
          <el-row :gutter="16">
            <el-col :span="24" :sm="12">
              <output-info :arData="arData" style="height: 430px" />
            </el-col>
            <el-col :span="24" :sm="12" class="top-gutter-xs">
              <card-ratio :arData="arData" style="height: 430px" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="top-gutter">
              <ExpectedOutput :arData="arData" :height="416"/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" :lg="12" :xl="8" class="top-gutter-sm">
          <activation-record
          :arData="arData"
          @changeData="update"
          style="height: 860px"
          />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import ActivationRecord from './components/ActivationRecord.vue'
import ExpectedOutput from './components/ExpectedOutput.vue'
import OutputInfo from './components/OutputInfo'
import CardRatio from './components/CardRatio'

export default {
  name: 'App',
  components: {
    ActivationRecord,
    ExpectedOutput,
    OutputInfo,
    CardRatio,
  },
  data() {
    return {
      arData: [//卡牌激活记录list
        // {
        //   date: '2021-12-16',//激活时间
        //   cards: [
        //     {type: '白羊+射手', amount: 0},
        //     {type: '双子+水平', amount: 0},
        //     {type: '巨蟹+双鱼', amount: 0},
        //     {type: '金牛+摩羯', amount: 0},
        //     {type: '天秤+天蝎', amount: 0},
        //     {type: '狮子+天蝎', amount: 0},
        //     {type: '处女+天秤', amount: 0},
        //     {type: '白羊', amount: 0},
        //     {type: '金牛', amount: 0},
        //     {type: '双子', amount: 0},
        //     {type: '巨蟹', amount: 0},
        //     {type: '狮子', amount: 0},
        //     {type: '处女', amount: 0},
        //     {type: '天秤', amount: 0},
        //     {type: '天蝎', amount: 0},
        //     {type: '射手', amount: 0},
        //     {type: '摩羯', amount: 0},
        //     {type: '水瓶', amount: 0},
        //     {type: '双鱼', amount: 0},
        //   ]
        // },
      ],
      helpInfo: {
        title: '使用指南',
        content: '添加激活的卡牌信息、数量以及日期，程序将会自动生成产出收益等相关信息。'
      }
    }
  },
  mounted() {
    this.loadData();
    window.addEventListener("beforeunload", () => {
      this.saveData();
    });
  },
  methods: {
    update: function(data) {//更新数据
      this.arData = data;
    },
    saveData: function() {//保存数据至localStorage
      let data = JSON.stringify({arData: this.arData});
      localStorage.setItem('arData', data);
    },
    loadData: function() {//从localStorage上读取数据
      if (localStorage.getItem('arData')) {
        let data = JSON.parse(localStorage.getItem('arData'))['arData'];
        this.arData.splice[0, this.arData.length];
        for (let i = 0; i < data.length; i++) {
          this.arData.push(data[i]);
        }
      }
    },
  }
}
</script>

<style>
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #7e94a1;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background   : #ededed;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header {
  background-color: #2b3a44;
  color: #c8ced9;
  line-height: 60px;
  font-size: 30px;
  font-weight: bold;
}
.el-main {
  color: var(--el-text-color-primary);
  height: calc(100vh - 60px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header > span {
  font-weight: bold;
}


.top-gutter {/*增加顶部间距*/
  padding-top: 16px;
}

@media screen and (max-width: 767px) {
  .top-gutter-xs {/*小屏幕增加顶部间距*/
    margin-top: 16px;
  }
}

@media screen and (max-width: 1199px) {
  .top-gutter-sm {/*中小屏幕增加顶部间距*/
    margin-top: 16px;
  }
}

</style>
