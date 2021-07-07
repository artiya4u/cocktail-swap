let Web3 = require('web3');
let Contract = require('web3-eth-contract');
Contract.setProvider('wss://bsc-ws-node.nariox.org:443');
let web3 = new Web3('wss://bsc-ws-node.nariox.org:443');

const tokenInfoMap = {};
const wrapToken = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
const usdTokens = [
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
  '0x55d398326f99059fF775485246999027B3197955', // USDT
];
const reservesType = [
  {
    "internalType": "uint112",
    "name": "_reserve0",
    "type": "uint112"
  },
  {
    "internalType": "uint112",
    "name": "_reserve1",
    "type": "uint112"
  },
  {
    "internalType": "uint32",
    "name": "_blockTimestampLast",
    "type": "uint32"
  }
];

let subscription = web3.eth.subscribe('logs', {
  topics: ['0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822']
}, async function (error, result) {
  if (!error) {
    // console.log(result);
    // get the transaction
    let tx = await web3.eth.getTransactionReceipt(result.transactionHash);
    // console.log(tx);
    // parse transfer logs
    const swap = {
      valueUSD: null,
      txHash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      swapper: tx.from,
      router: tx.to,
    }

    for (const log of tx.logs) {
      // Transfer log event parse
      if (log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
        // transfer log
        let tokenInfo = tokenInfoMap[log.address];
        if (tokenInfo === undefined) {
          let contract = new Contract(require('./erc20.json'), log.address);
          let name = await contract.methods.name().call();
          let decimal = await contract.methods.decimals().call();
          let symbol = await contract.methods.symbol().call();
          tokenInfo = {symbol, name, decimal};
          tokenInfoMap[log.address] = tokenInfo;
        }
        let amount = (web3.eth.abi.decodeParameters(['uint256'], log.data))[0] / Math.pow(10, tokenInfo.decimal);
        if (log.topics[2].substr(26) === tx.from.substr(2) ||
          (log.topics[2].substr(26) === tx.to.substr(2) &&
            log.address.toLowerCase() === wrapToken)) {
          // transfer from swapper or transfer native from wrapper router.
          swap.tokenIn = log.address;
          swap.tokenInName = tokenInfo.name;
          swap.tokenInSymbol = tokenInfo.symbol;
          swap.amountIn = amount;
        } else if (log.topics[1].substr(26) === tx.from.substr(2) ||
          (log.topics[1].substr(26) === tx.to.substr(2) &&
            log.address.toLowerCase() === wrapToken)) {
          // transfer from swapper or transfer native from wrapper router.
          swap.tokenOut = log.address;
          swap.tokenOutName = tokenInfo.name;
          swap.tokenOutSymbol = tokenInfo.symbol;
          swap.amountOut = amount;
        }
      }

      // Sync log event parse
      if (log.topics[0] === '0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1') {

      }
    }

    if (swap.tokenIn !== undefined && swap.tokenOut !== undefined) {
      // Use USD value
      if (usdTokens.includes(swap.tokenIn)) {
        swap.valueUSD = swap.amountIn;
      }
      if (usdTokens.includes(swap.tokenOut)) {
        swap.valueUSD = swap.amountOut;
      }

      // Use Wrapped BNB / BUSD price to calculate value
      let pairBNB_USD = new Contract(require('./pair.json'), '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16');
      if ([swap.tokenOut, swap.tokenIn].includes('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')) {
        let reserves = await pairBNB_USD.methods.getReserves().call();
        let priceBNB_USD = reserves._reserve1 / reserves._reserve0;
        console.log(priceBNB_USD);
        if (swap.tokenIn === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c') {
          swap.valueUSD = swap.amountIn * priceBNB_USD;
        }
        if (swap.tokenOut === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c') {
          swap.valueUSD = swap.amountOut * priceBNB_USD;
        }
      }
    }
    console.log(swap);

    // find value in USD
  }
});
