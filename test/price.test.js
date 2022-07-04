const Price = require('../models/price');
require('chai')
  .use(require('chai-as-promised'))
  .should();

describe('Get token price in USD', function () {
  this.timeout(300000);
  it('it should able to get current FIST price (decimal = 6)', async function () {
    const decimal = 6;
    let price = await Price.price(
      '0xC9882dEF23bc42D53895b8361D0b1EDC7570Bc6A',
      0,
      '0x1b6c9c20693afde803b27f8782156c0f892abc2d');
    let priceRounded = price / Math.pow(10, 18 - decimal);
    console.log(price);
    console.log(priceRounded);
  });

  it('it should able to get current BNB price', async function () {
    const decimal = 18;
    let price = await Price.price(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      0,
      '0x1b6c9c20693afde803b27f8782156c0f892abc2d');
    let priceRounded = price / Math.pow(10, 18 - decimal);
    console.log(price);
    console.log(priceRounded);
  });
});
