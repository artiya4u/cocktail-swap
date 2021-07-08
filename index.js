let Web3 = require('web3');
const nodeURL = 'wss://bsc.getblock.io/mainnet/?api_key=0be84439-05b5-4fc4-b98f-45e23dddd124';
let web3 = new Web3(nodeURL);

let Parser = require('./swapparser');

// Filter swap log event.
let subscription = web3.eth.subscribe('logs', {
  topics: ['0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'],
}, async function (error, result) {
  if (!error) {
    // console.log(result);
    // get the transaction
    let tx = await web3.eth.getTransactionReceipt(result.transactionHash);
    let swap = await Parser.parseSwapTx(tx);
    // TODO insert swap record to DB
  }
});
