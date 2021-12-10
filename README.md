# ME Card Manager
![ME card manager](https://github.com/wxShawn/Media-Lib/blob/main/images/1639125514.png)
## 介绍
&emsp;&emsp;这是一个用来辅助计算 ME([什么是ME](http://official.memetaverse.art/)) 卡牌收益的 Web app，添加或导入卡牌激活记录程序会自动计算出每天的收益产出、未产出等数据。
## 使用方法
&emsp;&emsp;点击卡牌激活记录模块的 `新增` 按钮，然后设置对应的日期、卡牌数量即可看到其他模块的数据实时更新。同时，也可以使用批量导入功能，导入如下格式的 `json` 文件:
```javascript
{
"arData": [//卡牌激活记录
  {
    "date": "2021-12-04",//激活时间
    "cards": [//卡牌类型与数量
      {"type": '白羊+射手', "amount": 10},
      {"type": '双子+水平', "amount": 0},
      {"type": '巨蟹+双鱼', "amount": 0},
      {"type": '金牛+摩羯', "amount": 0},
      {"type": '天秤+天蝎', "amount": 0},
      {"type": '狮子+天蝎', "amount": 0},
      {"type": '处女+天秤', "amount": 0},
      {"type": '白羊', "amount": 0},
      {"type": '金牛', "amount": 0},
      {"type": '双子', "amount": 0},
      {"type": '巨蟹', "amount": 0},
      {"type": '狮子', "amount": 0},
      {"type": '处女', "amount": 0},
      {"type": '天秤', "amount": 0},
      {"type": '天蝎', "amount": 0},
      {"type": '射手', "amount": 0},
      {"type": '摩羯', "amount": 0},
      {"type": '水平', "amount": 0},
      {"type": '双鱼', "amount": 0},
    ]
  },
  ......
],
}
```
## 运行项目
### Development
终端输入：
- `npm install`  
- `npm run serve`
### Build
1. 创建 Vue.config.js 文件：
```javascript
module.exports = {
    publicPath: './',
}
```
2. 终端输入:
- `npm install`
- `npm run build`
