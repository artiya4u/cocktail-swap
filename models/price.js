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
  let start = new Date();
  try {
    // USD token = 1 USD
    if (usdTokens.includes(token)) {
      let end = new Date();
      console.log(`Token ${token} Router ${router} Used ${end - start}ms 1.0 (USD)`);
      return 1;
    }

    let p = priceAll[token];
    if (p !== undefined) {
      let end = new Date();
      console.log(`Token ${token} Router ${router} Used ${end - start}ms ${p} (CACHED)`);
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

    priceAll[token] = tokenPrice; // Caching price
    let end = new Date();
    console.log(`Token ${token} Router ${router} Used ${end - start}ms ${tokenPrice}`);
    return tokenPrice;
  } catch (e) {
    return null;
  }
};

module.exports = price;
