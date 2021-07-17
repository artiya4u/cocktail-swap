let Contract = require('web3-eth-contract');

const GetBlockAPIKeys = require('../apikeys.json');
const endpoints = GetBlockAPIKeys.map(apikey => `https://bsc.getblock.io/mainnet/?api_key=${apikey}`);
const wrapBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const usdTokens = [
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
  '0x55d398326f99059fF775485246999027B3197955', // USDT
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
];
const priceAll = {};
const pairs = {};

const price = {};
price.price = async function price (token, blockNumber, router) {
  try {
    // USD token = 1 USD
    if (usdTokens.includes(token)) {
      return 1;
    }

    let p = priceAll[token];
    if (p !== undefined) {
      return p;
    }
    let tokenPrice = null;
    let ran = Math.floor(Math.random() * endpoints.length);
    let endpoint = endpoints[ran];
    Contract.setProvider(endpoint);

    let priceBNBUSD = priceAll[wrapBNBAddress];
    if (priceBNBUSD === undefined) {
      let pairBNBUSD = new Contract(require('../abi/pair.json'), '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16');
      let reserves;
      if (blockNumber === 0) {
        reserves = await pairBNBUSD.methods.getReserves().call();
      } else {
        reserves = await pairBNBUSD.methods.getReserves().call({}, blockNumber);
      }
      priceBNBUSD = reserves._reserve1 / reserves._reserve0;
      priceAll[wrapBNBAddress] = priceBNBUSD;
    }

    if (token === wrapBNBAddress) {
      tokenPrice = priceBNBUSD;
    } else {
      let pairAddress = pairs[token];
      if (pairAddress === undefined) {
        let routerContract = new Contract(require('../abi/router.json'), router);
        let factoryAddress = await routerContract.methods.factory().call();
        let factoryContract = new Contract(require('../abi/factory.json'), factoryAddress);
        pairAddress = await factoryContract.methods.getPair(token, wrapBNBAddress).call();
        if (pairAddress === '0x0000000000000000000000000000000000000000') {
          pairAddress = await factoryContract.methods.getPair(token, wrapBNBAddress).call();
        }
      }
      if (pairAddress !== '0x0000000000000000000000000000000000000000') {
        pairs[token] = pairAddress;
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
        tokenPrice = priceTOKENWBNB * priceBNBUSD;
      }
    }

    priceAll[token] = tokenPrice; // Caching price
    return tokenPrice;
  } catch (e) {
    return null;
  }
};

module.exports = price;
