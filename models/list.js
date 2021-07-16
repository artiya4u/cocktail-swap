const Swap = require('./swap');
const Price = require('./price');
const list = {};

list.totalGain = async function totalGain (listTrade) {
  let traderTx = {};
  for (let t of listTrade) {
    if (traderTx[t.swapper] === undefined) {
      traderTx[t.swapper] = {};
    }
    // Buy
    if (traderTx[t.swapper][t.tokenIn] === undefined) {
      traderTx[t.swapper][t.tokenIn] = { sum: 0, out: 0, buy: 0, sell: 0 };
    }
    if (traderTx[t.swapper][t.tokenOut] === undefined) {
      traderTx[t.swapper][t.tokenOut] = { sum: 0, out: 0, buy: 0, sell: 0 };
    }
    traderTx[t.swapper][t.tokenIn].sum += parseInt(t.amountIn);
    traderTx[t.swapper][t.tokenOut].sum -= parseInt(t.amountOut);
    traderTx[t.swapper][t.tokenOut].out += parseInt(t.amountOut);
    traderTx[t.swapper][t.tokenIn].token = {
      symbol: t.tokenInSymbol,
      name: t.tokenInName,
      decimal: t.tokenInDecimal,
    };
    traderTx[t.swapper][t.tokenOut].token = {
      symbol: t.tokenOutSymbol,
      name: t.tokenOutName,
      decimal: t.tokenOutDecimal,
    };
    traderTx[t.swapper][t.tokenIn].router = t.router;
    traderTx[t.swapper][t.tokenOut].router = t.router;
    traderTx[t.swapper][t.tokenIn].buy += 1;
    traderTx[t.swapper][t.tokenOut].sell += 1;
  }

  let result = [];
  for (const trader of Object.keys(traderTx)) {
    let traderPort = traderTx[trader];
    let allProfit = 0;
    let cost = 0;
    let traded = 0;
    let sell = 0;
    let buy = 0;

    for (const asset of Object.keys(traderPort)) {
      let decimal = traderPort[asset].token.decimal;
      let assetAmount = traderPort[asset].sum;
      let assetPrice = await Price.price(asset, 0, traderPort[asset].router);
      if (assetPrice === null) {
        continue;
      }
      allProfit += (assetAmount / Math.pow(10, decimal)) * assetPrice / Math.pow(10, 18 - decimal);
      cost += (traderPort[asset].out / Math.pow(10, decimal)) * assetPrice / Math.pow(10, 18 - decimal);
      traded += traderPort[asset].sell;
      traded += traderPort[asset].buy;
      sell += traderPort[asset].sell;
      buy += traderPort[asset].buy;
    }
    result.push(
      {
        trader: trader,
        profit: allProfit,
        cost: cost,
        percent: allProfit / cost * 100,
        traded: traded,
        buy: buy,
        sell: sell,
        assetsChange: traderPort,
      });
  }

  return result;
};

list.top = async function top (listTrade, sort) {
  let field = 'profit';
  if (sort !== undefined) {
    field = sort;
  }

  function compare (a, b) {
    let comparison = 0;
    if (a[field] > b[field]) {
      comparison = -1;
    } else if (a[field] < b[field]) {
      comparison = 1;
    }
    return comparison;
  }

  return (await list.totalGain(listTrade)).sort(compare);
};

list.getReturnHistory = async function getReturnHistory (period) {
  const periodMilliSec = period * 24 * 3600 * 1000;
  let end = new Date();
  let start = new Date(end.getTime() - periodMilliSec);
  let results = {};
  let length = 0;
  while (true) {
    let trades = await Swap.fetchBetween(start, end);
    if (trades.length === 0) {
      break;
    }
    let result = await this.totalGain(trades);
    for (let r of result) {
      if (results[r.trader] === undefined) {
        results[r.trader] = [];
      }
      results[r.trader].push(r);
    }
    end = start;
    start = new Date(end.getTime() - periodMilliSec);
    length += 1;
  }
  return { results: results, length: length };
};

list.totalReturn = async function totalReturn (period) {
  const { results, length } = await this.getReturnHistory(period);

  let compResults = [];
  for (const trader of Object.keys(results)) {
    let gains = [];
    let trc = 1;
    for (const traderReturn of results[trader]) {
      gains.push(traderReturn.percent);
      trc = trc * (1 + (traderReturn.percent / 100));
    }
    trc = (trc - 1) * 100;
    const n = gains.length;
    const mean = gains.reduce((a, b) => a + b) / n;
    const sd = Math.sqrt(gains.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    compResults.push({ trader: trader, meanReturn: mean, cumulativeReturn: trc, sd: sd, gains: gains });
  }

  function compare (a, b) {
    let field = 'meanReturn';
    let comparison = 0;
    if (a[field] > b[field]) {
      comparison = -1;
    } else if (a[field] < b[field]) {
      comparison = 1;
    }
    return comparison;
  }

  return compResults.filter(trader => trader.gains.length >= length - 1).sort(compare);
};

module.exports = list;
