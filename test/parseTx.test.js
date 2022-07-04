const Parser = require('../swapparser');
require('chai')
  .use(require('chai-as-promised'))
  .should();

let Web3 = require('web3');
const nodeURL = 'https://bsc.getblock.io/mainnet/?api_key=9826cf91-1e59-4f05-8687-3f66d9d14c1c';
const web3 = new Web3(nodeURL);

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

describe('Parser ', function () {
  this.timeout(300000);
  it('it should able to parse a real transaction', async function () {
    const txHash = '0x0e06a57fc898991f8bab74396f0c460352595ee3a2e4289f912de546eec50ba2';
    let tx = await web3.eth.getTransactionReceipt(txHash);
    let swap = await Parser.parseSwapTx(tx, endpoints); // parse the transaction
    console.log(swap);
  });
});
