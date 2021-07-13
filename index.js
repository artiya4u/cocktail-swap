let Web3 = require('web3');
const nodeURL = 'wss://bsc-ws-node.nariox.org:443';
let web3 = new Web3(nodeURL);

const Parser = require('./swapparser');
const Swap = require('./models/swap');

// const GetBlockAPIKeys = require('./apikeys.json');
// const endpoints = GetBlockAPIKeys.map(apikey => `https://bsc.getblock.io/mainnet/?api_key=${apikey}`);

// Use all endpoint to prevent calling limit
const endpoints = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/',
  'https://bsc-dataseed2.defibit.io/',
  'https://bsc-dataseed3.defibit.io/',
  'https://bsc-dataseed4.defibit.io/',
  'https://bsc-dataseed2.ninicoin.io/',
  'https://bsc-dataseed3.ninicoin.io/',
  'https://bsc-dataseed4.ninicoin.io/',
  'https://bsc-dataseed1.binance.org/',
  'https://bsc-dataseed2.binance.org/',
  'https://bsc-dataseed3.binance.org/',
  'https://bsc-dataseed4.binance.org/',
];

// Filter swap log event.
let subscription = web3.eth.subscribe('logs', {
  topics: ['0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'],
}, async function (error, result) {
  if (!error) {
    // wait for 30s for other node to have tx info.
    setTimeout(async function () {
      // get the transaction
      let tx = await web3.eth.getTransactionReceipt(result.transactionHash);
      let swap = await Parser.parseSwapTx(tx, endpoints);
      if (swap === 0) {
        console.log(tx.transactionHash, swap);
      } else if (swap === 1) {
        // dup
      } else {
        console.log(swap);
        await Swap.add(swap);
      }
    }, 1000);
  }
});
