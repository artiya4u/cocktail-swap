let Web3 = require('web3');
const nodeURL = 'https://bsc-dataseed.binance.org/';
let web3 = new Web3(nodeURL);

const Parser = require('./swapparser');
const Swap = require('./models/swap');

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

async function run () {
  let blockNumber = await web3.eth.getBlockNumber();
  while (true) {
    console.log(blockNumber);
    let block = await web3.eth.getBlock(blockNumber);
    blockNumber += 1;
    for (const transactionHash of block.transactions) {
      let tx = await web3.eth.getTransactionReceipt(transactionHash);
      for (const log of tx.logs) {
        for (const topic of log.topics) {
          if (topic === '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822') {
            // Swap topic
            let swap;
            for (let i = 0; i < 5; i++) { // try 5 times
              try {
                // get the transaction
                swap = await Parser.parseSwapTx(tx, endpoints); // parse the transaction
                if (swap.valueUSD === 0) {
                  continue; // Try more...
                }
                break; // Break the loop if swap is parsed.
              } catch (e) { // Try again.
              }
            }

            if (swap === 0) {
              console.log(transactionHash, swap);
            } else if (swap === 1) {
              // dup
            } else {
              // console.log(swap);
              await Swap.add(swap);
            }
            break;
          }
        }
      }
    }
  }
}

run().then().catch();
