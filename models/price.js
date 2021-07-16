let Contract = require('web3-eth-contract');

const GetBlockAPIKeys = require('../apikeys.json');
const endpoints = GetBlockAPIKeys.map(apikey => `https://bsc.getblock.io/mainnet/?api_key=${apikey}`);
const wrapBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

const price = {};
price.price = async function price (token, blockNumber, router) {
  try {
    let ran = Math.floor(Math.random() * endpoints.length);
    let endpoint = endpoints[ran];
    Contract.setProvider(endpoint);
    let pairBNBUSD = new Contract(require('./abi/pair.json'), '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16');
    let reserves;
    if (blockNumber === 0) {
      reserves = await pairBNBUSD.methods.getReserves().call();
    } else {
      reserves = await pairBNBUSD.methods.getReserves().call({}, blockNumber);
    }
    let priceBNBUSD = reserves._reserve1 / reserves._reserve0;

    if (token === wrapBNBAddress) {
      return priceBNBUSD;
    }

    let routerContract = new Contract(require('../abi/router.json'), router);
    let factoryAddress = await routerContract.methods.factory().call();
    let factoryContract = new Contract(require('../abi/factory.json'), factoryAddress);
    let pairAddress = await factoryContract.methods.getPair(token, wrapBNBAddress).call();
    if (pairAddress === '0x0000000000000000000000000000000000000000') {
      pairAddress = await factoryContract.methods.getPair(token, wrapBNBAddress).call();
    }
    if (pairAddress !== '0x0000000000000000000000000000000000000000') {
      let pairTOKENWBNB = new Contract(require('../abi/pair.json'), pairAddress);
      let reserves;
      if (blockNumber === 0) {
        reserves = await pairTOKENWBNB.methods.getReserves().call();
      } else {
        reserves = await pairTOKENWBNB.methods.getReserves().call({}, blockNumber);
      }
      let priceTOKENWBNB = reserves._reserve1 / reserves._reserve0;
      let token0 = await pairTOKENWBNB.methods.token0().call();
      if (token0.toLowerCase() === wrapBNBAddress.toLowerCase()) {
        priceTOKENWBNB = reserves._reserve0 / reserves._reserve1;
      }
      return priceTOKENWBNB * priceBNBUSD;
    }
  } catch (e) {
    return null;
  }

  return null;
};

module.exports = price;
