let Web3 = require('web3');
const nodeURL = 'wss://bsc-mainnet.nodereal.io/ws/v1/ab63ba11285c4d998f1c8da1a79f1c8f';
let web3 = new Web3(nodeURL);

const Parser = require('./swapparser');
const Swap = require('./models/swap');

const GetBlockAPIKeys = require('./apikeys.json');
const endpoints0 = GetBlockAPIKeys.map(apikey => `https://bsc.getblock.io/mainnet/?api_key=${apikey}`);

// Use all endpoint to prevent calling limit
let endpoints = [
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

endpoints = endpoints.concat(endpoints0);

// Filter swap log event.
web3.eth.subscribe('logs', {
  topics: ['0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'],
}, async function (error, result) {
  if (!error) {
    // wait for 3s for other node to have tx info.
    setTimeout(async function () {
      // get the transaction
      let tx = await web3.eth.getTransactionReceipt(result.transactionHash);
      let swap;
      for (let i = 0; i < 5; i++) { // try 5 times
        try {
          swap = await Parser.parseSwapTx(tx, endpoints); // parse the transaction
          break; // Break the loop if swap is parsed.
        } catch (e) { // Try again.
        }
      }

      if (swap === 0) {
        console.log(tx.transactionHash, swap);
      } else if (swap === 1) {
        // dup
      } else {
        console.log(swap);
        await Swap.add(swap);
      }
      let end = new Date();
    }, 3000);
  } else {
    console.log(error);
  }
});
