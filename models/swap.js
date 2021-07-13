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
  ]);
};

module.exports = swap;
