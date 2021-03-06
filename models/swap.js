const mysql = require('./mysql');
const swap = {};

swap.add = async function add (swap) {
  return mysql.query(`
      INSERT IGNORE INTO swaps
      (txHash,
       swapAt,
       blockNumber,
       valueUSD,
       swapper,
       router,
       tokenOut,
       tokenOutName,
       tokenOutDecimal,
       tokenOutSymbol,
       amountOut,
       tokenIn,
       tokenInName,
       tokenInSymbol,
       tokenInDecimal,
       amountIn)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    swap.txHash,
    swap.swapAt,
    swap.blockNumber,
    swap.valueUSD,
    swap.swapper,
    swap.router,
    swap.tokenOut,
    swap.tokenOutName,
    swap.tokenOutDecimal,
    swap.tokenOutSymbol,
    swap.amountOut,
    swap.tokenIn,
    swap.tokenInName,
    swap.tokenInSymbol,
    swap.tokenInDecimal,
    swap.amountIn,
    swap.pair,
  ]);
};

swap.fetch = async function fetch () {
  return mysql.query(`
      SELECT txHash,
             valueUSD,
             blockNumber,
             swapAt,
             swapper,
             router,
             tokenOut,
             tokenOutName,
             tokenOutDecimal,
             tokenOutSymbol,
             amountOut,
             tokenIn,
             tokenInName,
             tokenInDecimal,
             tokenInSymbol,
             amountIn
      FROM swaps
      WHERE valueUSD > 0 -- ignore error
        AND swapAt BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW()
        AND router = '0x10ed43c718714eb63d5aa57b78b54704e256024e'
      ORDER BY swapAt
  `);
};

swap.fetchBetween = async function fetchBetween (startTime, endTime) {
  return mysql.query(`
      SELECT txHash,
             valueUSD,
             blockNumber,
             swapAt,
             swapper,
             router,
             tokenOut,
             tokenOutName,
             tokenOutDecimal,
             tokenOutSymbol,
             amountOut,
             tokenIn,
             tokenInName,
             tokenInDecimal,
             tokenInSymbol,
             amountIn
      FROM swaps
      WHERE valueUSD > 0 -- ignore error
        AND swapAt BETWEEN ? AND ?
      ORDER BY swapAt;
  `, [startTime, endTime]);
};

module.exports = swap;
