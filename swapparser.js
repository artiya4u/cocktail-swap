let Web3 = require('web3');
let Contract = require('web3-eth-contract');
const price = require('./models/price');

const tokenInfoMap = {};
const wrapBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const usdTokens = [
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
  '0x55d398326f99059fF775485246999027B3197955', // USDT
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
];

const swapparser = {};
const processed = {};

swapparser.parseSwapTx = async function parseSwapTx (tx, endpoints) {
  let swap;
  let ran = 0;
  for (let i = 0; i < endpoints.length; i++) {
    try {
      ran = Math.floor(Math.random() * (endpoints.length - 1)); // Random endpoint to prevent request limit.
      let endpoint = endpoints[ran];
      swap = await parseSwapTxByEndpoint(tx, endpoint);
      break;
    } catch (e) {
      console.log(e);
    }
  }
  return swap;
};

async function parseSwapTxByEndpoint (tx, endpoint) {
  if (processed[tx.transactionHash] !== undefined) {
    return 1;
  }
  processed[tx.transactionHash] = true;

  let web3 = new Web3(endpoint);
  Contract.setProvider(endpoint);

  const swap = {
    valueUSD: null,
    swapAt: new Date(),
    txHash: tx.transactionHash,
    blockNumber: tx.blockNumber,
    swapper: tx.from,
    router: tx.to,
    pair: null,
  };

  async function extractTokenInfo (log) {
    let contract = new Contract(require('./abi/erc20.json'), log.address);
    let name = await contract.methods.name().call();
    let decimal = await contract.methods.decimals().call();
    let symbol = await contract.methods.symbol().call();
    return { symbol, name, decimal };
  }

  for (const log of tx.logs) {
    // Transfer log event parse
    if (log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
      // transfer log
      let tokenInfo = tokenInfoMap[log.address];
      if (tokenInfo === undefined) {
        tokenInfo = await extractTokenInfo(log);
        tokenInfoMap[log.address] = tokenInfo;
      }
      let amount = (web3.eth.abi.decodeParameters(['uint256'], log.data))[0];
      let src = (web3.eth.abi.decodeParameters(['address'], log.topics[1]))[0].toLowerCase();
      let dst = (web3.eth.abi.decodeParameters(['address'], log.topics[2]))[0].toLowerCase();
      if (swap.swapper === dst || (dst === swap.router && log.address === wrapBNBAddress)) {
        // transfer from swapper or transfer native from wrapper router.
        if (swap.tokenIn === undefined) {
          swap.tokenIn = log.address;
          swap.tokenInName = tokenInfo.name;
          swap.tokenInSymbol = tokenInfo.symbol;
          swap.tokenInDecimal = tokenInfo.decimal;
          swap.amountIn = amount;
        } else if (swap.tokenIn === log.address) {
          if (parseInt(amount) > parseInt(swap.amountIn)) {
            swap.amountIn = amount;
          }
        }
      } else if (swap.swapper === src || (src === swap.router && log.address === wrapBNBAddress)) {
        // transfer from swapper or transfer native from wrapper router.
        if (swap.tokenOut === undefined) {
          swap.tokenOut = log.address;
          swap.tokenOutName = tokenInfo.name;
          swap.tokenOutDecimal = tokenInfo.decimal;
          swap.tokenOutSymbol = tokenInfo.symbol;
          swap.amountOut = amount;
        } else if (swap.tokenOut === log.address) {
          if (parseInt(amount) > parseInt(swap.amountOut)) {
            swap.amountOut = amount;
          }
        }
      }
    }
  }

  if (swap.tokenIn === undefined || swap.tokenOut === undefined) {
    return 0;
  }

  // Use USD value
  if (usdTokens.includes(swap.tokenIn)) {
    swap.valueUSD = swap.amountIn / Math.pow(10, swap.tokenInDecimal);
  }
  if (usdTokens.includes(swap.tokenOut)) {
    swap.valueUSD = swap.amountOut / Math.pow(10, swap.tokenOutDecimal);
  }

  if (swap.valueUSD === null) {
    let tokenToGetPrice = swap.tokenIn;
    let tokenToGetPriceDecimal = swap.tokenInDecimal;
    let tokenAmount = swap.amountIn;
    let tokenPrice = await price.price(tokenToGetPrice, 0, swap.router);
    if (tokenPrice === null) {
      tokenToGetPrice = swap.tokenOut;
      tokenToGetPriceDecimal = swap.tokenOutDecimal;
      tokenAmount = swap.amountOut;
      tokenPrice = await price.price(tokenToGetPrice, 0, swap.router);
    }
    const amountRounded = tokenAmount / Math.pow(10, tokenToGetPriceDecimal);
    swap.valueUSD = amountRounded * tokenPrice / Math.pow(10, 18 - tokenToGetPriceDecimal);
  }

  if (swap.tokenIn === swap.tokenOut) {
    // Arbitrage tx ignored.
    return 0;
  }
  // if (swap.valueUSD === null) {
  //   return 0;
  // }
  return swap;
}

module.exports = swapparser;
