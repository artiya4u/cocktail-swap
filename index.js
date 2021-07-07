let Web3 = require('web3');
let Contract = require('web3-eth-contract');
Contract.setProvider('wss://bsc-ws-node.nariox.org:443');
let web3 = new Web3('wss://bsc-ws-node.nariox.org:443');

const tokenInfoMap = {};
const wrapToken = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';

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
      txHash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      swapper: tx.from,
      router: tx.to,
    }
    for (const log of tx.logs) {
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
    }

    console.log(swap);

    // find value in USD
  }
});
