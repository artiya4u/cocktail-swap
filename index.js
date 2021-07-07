let Web3 = require('web3');
let Contract = require('web3-eth-contract');
const nodeURL = 'wss://bsc.getblock.io/mainnet/?api_key=0be84439-05b5-4fc4-b98f-45e23dddd124'
Contract.setProvider(nodeURL);
let web3 = new Web3(nodeURL);

const blockTime = {};
const tokenInfoMap = {};
const wrapBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const usdTokens = [
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
  '0x55d398326f99059fF775485246999027B3197955', // USDT
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
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
    let timestamp = blockTime[tx.blockNumber]
    if (timestamp === undefined) {
      timestamp = (await web3.eth.getBlock(tx.blockNumber)).timestamp;
      blockTime[tx.blockNumber] = timestamp;
    }

    const swap = {
      valueUSD: null,
      swapAt: new Date(timestamp * 1000),
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
          let contract = new Contract(require('./abi/erc20.json'), log.address);
          let name = await contract.methods.name().call();
          let decimal = await contract.methods.decimals().call();
          let symbol = await contract.methods.symbol().call();
          tokenInfo = {symbol, name, decimal};
          tokenInfoMap[log.address] = tokenInfo;
        }
        let amount = (web3.eth.abi.decodeParameters(['uint256'], log.data))[0] / Math.pow(10, tokenInfo.decimal);
        let address0 = (web3.eth.abi.decodeParameters(['address'], log.topics[2]))[0].toLowerCase();
        let address1 = (web3.eth.abi.decodeParameters(['address'], log.topics[1]))[0].toLowerCase();
        if (address0 === tx.from || (address0 === tx.to && log.address === wrapBNBAddress)) {
          // transfer from swapper or transfer native from wrapper router.
          swap.tokenIn = log.address;
          swap.tokenInName = tokenInfo.name;
          swap.tokenInSymbol = tokenInfo.symbol;
          swap.amountIn = amount;
        } else if (address1 === tx.from || (address1 === tx.to && log.address === wrapBNBAddress)) {
          // transfer from swapper or transfer native from wrapper router.
          swap.tokenOut = log.address;
          swap.tokenOutName = tokenInfo.name;
          swap.tokenOutSymbol = tokenInfo.symbol;
          swap.amountOut = amount;
        }
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

      try {
        // Use Wrapped BNB / BUSD price to calculate value
        let pairBNB_USD = new Contract(require('./abi/pair.json'), '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16');
        let reserves = await pairBNB_USD.methods.getReserves().call({}, tx.blockNumber);
        let priceBNB_USD = reserves._reserve1 / reserves._reserve0;
        if ([swap.tokenOut, swap.tokenIn].includes(wrapBNBAddress)) {
          if (swap.tokenIn === wrapBNBAddress) {
            swap.valueUSD = swap.amountIn * priceBNB_USD;
          }
          if (swap.tokenOut === wrapBNBAddress) {
            swap.valueUSD = swap.amountOut * priceBNB_USD;
          }
        }
        if (swap.valueUSD === null) { // Try TOKEN-USD and TOKEN-BNB
          let routerContract = new Contract(require('./abi/router.json'), swap.router);
          let factoryAddress = await routerContract.methods.factory().call();
          let factoryContract = new Contract(require('./abi/factory.json'), factoryAddress);
          let pairAddress = await factoryContract.methods.getPair(swap.tokenOut, wrapBNBAddress).call();
          let amount = swap.amountOut;
          if (pairAddress === '0x0000000000000000000000000000000000000000') {
            // cannot find out token pair to bnb, switch to token in.
            amount = swap.amountIn;
            pairAddress = await factoryContract.methods.getPair(swap.tokenIn, wrapBNBAddress).call();
          }
          if (pairAddress !== '0x0000000000000000000000000000000000000000') {
            let pairTOKEN_WBNB = new Contract(require('./abi/pair.json'), pairAddress);
            let reserves = await pairTOKEN_WBNB.methods.getReserves().call({}, tx.blockNumber);
            let priceTOKEN_WBNB = reserves._reserve1 / reserves._reserve0;
            swap.valueUSD = amount * priceTOKEN_WBNB * priceBNB_USD;
            console.log(swap);
          }
        }

      } catch (e) {
        console.log(e.message);
        console.log(swap.txHash);
      }

    }

    // find value in USD
  }
});
