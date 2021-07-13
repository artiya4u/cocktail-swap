let Web3 = require('web3');
let Contract = require('web3-eth-contract');

const tokenInfoMap = {};
const wrapBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const usdTokens = [
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
  '0x55d398326f99059fF775485246999027B3197955', // USDT
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
];

const providerSelector = async (endpoints, blockNumber) => {
  let selectedProvider = null;
  for (let i = 0; i < endpoints.length; i++) {
    let endpoint = endpoints[i];
    let web3 = new Web3(endpoint);
    let b = null;
    await web3.eth.getBlock(blockNumber)
      .then((block) => {
        selectedProvider = web3;
        b = block;
      })
      .catch(() => {
        console.log(`Provider ${endpoint} not available`);
      });
    if (b) {
      return { selectedProvider, timestamp: b.timestamp, endpoint };
    }
  }
  return false;
};

const swapparser = {};
swapparser.parseSwapTx = async function parseSwapTx (tx, endpoints) {
  let p = await providerSelector(endpoints, tx.blockNumber);
  let web3 = null;
  if (p) {
    web3 = p.selectedProvider;
    Contract.setProvider(p.endpoint);
  } else {
    return;
  }

  const swap = {
    valueUSD: null,
    swapAt: new Date(p.timestamp * 1000),
    txHash: tx.transactionHash,
    blockNumber: tx.blockNumber,
    swapper: tx.from,
    router: tx.to,
  };

  for (const log of tx.logs) {
    // Transfer log event parse
    if (log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
      // transfer log
      let tokenInfo = tokenInfoMap[log.address];
      if (tokenInfo === undefined) {
        let contract = new Contract(require('./abi/erc20.json'), log.address);
        let name = await contract.methods.name().call();
        let decimal = await contract.methods.decimals().call();
        let symbol = await contract.methods.symbol().call();
        tokenInfo = { symbol, name, decimal };
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

  if (swap.tokenIn !== undefined && swap.tokenOut !== undefined) {
    // Use USD value
    if (usdTokens.includes(swap.tokenIn)) {
      swap.valueUSD = swap.amountIn / Math.pow(10, swap.tokenInDecimal);
    }
    if (usdTokens.includes(swap.tokenOut)) {
      swap.valueUSD = swap.amountOut / Math.pow(10, swap.tokenOutDecimal);
    }

    try {
      // Use Wrapped BNB / BUSD price to calculate value
      let pairBNBUSD = new Contract(require('./abi/pair.json'), '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16');
      let reserves = await pairBNBUSD.methods.getReserves().call({}, tx.blockNumber);
      let priceBNBUSD = reserves._reserve1 / reserves._reserve0;
      if ([swap.tokenOut, swap.tokenIn].includes(wrapBNBAddress)) {
        if (swap.tokenIn === wrapBNBAddress) {
          swap.valueUSD = swap.amountIn / Math.pow(10, swap.tokenInDecimal) * priceBNBUSD;
        }
        if (swap.tokenOut === wrapBNBAddress) {
          swap.valueUSD = swap.amountOut / Math.pow(10, swap.tokenOutDecimal) * priceBNBUSD;
        }
      }
      if (swap.valueUSD === null) { // Try TOKEN-USD and TOKEN-BNB
        let routerContract = new Contract(require('./abi/router.json'), swap.router);
        let factoryAddress = await routerContract.methods.factory().call();
        let factoryContract = new Contract(require('./abi/factory.json'), factoryAddress);
        let baseToken = swap.tokenOut;
        let amount = swap.amountOut;
        let decimal = swap.tokenOutDecimal;
        let pairAddress = await factoryContract.methods.getPair(baseToken, wrapBNBAddress).call();
        if (pairAddress === '0x0000000000000000000000000000000000000000') {
          // cannot find out token pair to bnb, switch to token in.
          baseToken = swap.tokenIn;
          amount = swap.amountIn;
          decimal = swap.tokenInDecimal;
          pairAddress = await factoryContract.methods.getPair(baseToken, wrapBNBAddress).call();
        }
        if (pairAddress !== '0x0000000000000000000000000000000000000000') {
          let pairTOKENWBNB = new Contract(require('./abi/pair.json'), pairAddress);
          let reserves = await pairTOKENWBNB.methods.getReserves().call({}, tx.blockNumber);
          let priceTOKENWBNB = reserves._reserve1 / reserves._reserve0;
          let token0 = await pairTOKENWBNB.methods.token0().call();
          if (token0.toLowerCase() === wrapBNBAddress.toLowerCase()) {
            priceTOKENWBNB = reserves._reserve0 / reserves._reserve1;
          }
          swap.valueUSD = (amount / Math.pow(10, decimal)) * priceTOKENWBNB * priceBNBUSD / Math.pow(10, 18 - decimal);
          console.log(swap);
        }
      }
    } catch (e) {
      console.log(`swap.txHash: ${e.message}`);
    }
  }
  if (swap.tokenIn === swap.tokenOut) {
    // Arbitrage tx ignored.
    return 0;
  }
  // if (swap.valueUSD === null) {
  //   return 0;
  // }
  return swap;
};

module.exports = swapparser;
