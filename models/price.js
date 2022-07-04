let Contract = require('web3-eth-contract');

const GetBlockAPIKeys = require('../apikeys.json');
const endpointsGetBlock = GetBlockAPIKeys.map(apikey => `https://bsc.getblock.io/mainnet/?api_key=${apikey}`);
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

endpoints = endpointsGetBlock.concat(endpoints);
const wrapBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const usdTokens = [
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
  '0x55d398326f99059fF775485246999027B3197955', // USDT
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
];

const pairs = {};
const price = {};
price.price = async function price (token, blockNumber, router) {
  let start = new Date();
  let tokenPrice = null;
  let ran = 0;
  for (let i = 0; i < endpoints.length; i++) {
    try {
      ran = Math.floor(Math.random() * (endpoints.length - 1)); // Random endpoint to prevent request limit.
      let endpoint = endpoints[ran];
      Contract.setProvider(endpoint);
      tokenPrice = await priceByEndpoint(token, blockNumber, router, endpoint);
      break;
    } catch (e) {
    }
  }

  if (isNaN(tokenPrice)) {
    tokenPrice = null;
  }

  let end = new Date();
  console.log(`Token ${token} Router ${router} Used ${end - start}ms ${tokenPrice}`);
  return tokenPrice;
};

async function priceByEndpoint (token, blockNumber, router, endpoint) {
  // USD token = 1 USD
  if (usdTokens.includes(token)) {
    return 1;
  }

  let tokenPrice = null;
  Contract.setProvider(endpoint);

  let pairBNBUSD = new Contract(require('../abi/pair.json'), '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16');
  let reserves;
  if (blockNumber === 0) {
    reserves = await pairBNBUSD.methods.getReserves().call();
  } else {
    reserves = await pairBNBUSD.methods.getReserves().call({}, blockNumber);
  }
  let priceBNBUSD = reserves._reserve1 / reserves._reserve0;

  if (token === wrapBNBAddress) {
    tokenPrice = priceBNBUSD;
  } else {
    let pairAddress = pairs[token];
    let isUSDPair = false;
    if (pairAddress === undefined) {
      let routerContract = new Contract(require('../abi/router.json'), router);
      let factoryAddress = await routerContract.methods.factory().call();
      let factoryContract = new Contract(require('../abi/factory.json'), factoryAddress);
      pairAddress = await factoryContract.methods.getPair(token, wrapBNBAddress).call();
      if (pairAddress === '0x0000000000000000000000000000000000000000') {
        // Try usd pairs
        for (const usdToken of usdTokens) {
          pairAddress = await factoryContract.methods.getPair(token, usdToken).call();
          if (pairAddress !== '0x0000000000000000000000000000000000000000') {
            isUSDPair = true;
            break;
          }
        }
      }
    }
    if (pairAddress !== '0x0000000000000000000000000000000000000000') {
      pairs[token] = pairAddress;
      let pairTOKEN = new Contract(require('../abi/pair.json'), pairAddress);
      let reserves;
      if (blockNumber === 0) {
        reserves = await pairTOKEN.methods.getReserves().call();
      } else {
        reserves = await pairTOKEN.methods.getReserves().call({}, blockNumber);
      }
      let priceTOKEN = reserves._reserve1 / reserves._reserve0;
      let token0 = await pairTOKEN.methods.token0().call();
      if (token0.toLowerCase() === wrapBNBAddress.toLowerCase()) {
        priceTOKEN = reserves._reserve0 / reserves._reserve1;
      }
      if (isUSDPair) {
        tokenPrice = priceTOKEN;
      } else {
        tokenPrice = priceTOKEN * priceBNBUSD;
      }
    }
  }

  return tokenPrice;
}

module.exports = price;
