export function cardCalc(cards) {//传入卡片组，计算成本与收益
  var cost = 0;
  var income = 0;
  for (let i = 0; i < cards.length; i++) {
    switch (cards[i].type) {
      case '天秤':
      case '天蝎':
      case '射手':
      case '摩羯':
      case '水瓶':
      case '双鱼'://D卡
        income += 4 * cards[i].amount;
        break;

      case '白羊':
      case '双子':
      case '巨蟹'://C卡
        income += 6 * cards[i].amount;
        break;

      case '金牛':
      case '狮子'://B卡
        income += 30 * cards[i].amount;
        break;

      case '处女'://A卡
        income += 100 * cards[i].amount;
        break;

      case '白羊+射手':
      case '双子+水瓶':
      case '巨蟹+双鱼'://碰碰卡（普通）
        cost += 3 * cards[i].amount;
        income += 15 * cards[i].amount;
        break;
      
      case '金牛+摩羯'://碰碰卡（金牛）
        cost += cards[i].amount;
        income += 51 * cards[i].amount;
        break;

      case '天秤+天蝎'://对对卡（普通）
        cost += cards[i].amount;
        income += 16 * cards[i].amount;
        break;

      case '狮子+天蝎'://对对卡（狮子）
        cost += cards[i].amount;
        income += 68 * cards[i].amount;
        break;

      case '处女+天秤'://对对卡（处女）
        cost += cards[i].amount;
        income += 208 * cards[i].amount;
        break;
      default:
        break;
    }
    cost += 2 * cards[i].amount;
  }
  return {cost, income}
}

export function getToday() {//获取今日日期（字符串yy-mm-dd）
  let d = new Date();
  let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return date;
}

export function dateDifferenceCalc(dateA, dateB) {//传入两个日期文本，计算日期天数差
  let t1 = dateA + ' 00:00:00 GMT+0800';//生成中国时区时间，否则计算会有误差
  let t2 = dateB + ' 00:00:00 GMT+0800';
  let d1 = new Date(t1).getTime();
  let d2 = new Date(t2).getTime();
  return ((d2 - d1) / 86400000);
}

export function addDay(date, day) {//计算n天后的日期(返回字符串格式)
  let d = new Date(new Date(date).getTime() + day * 86400000);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
