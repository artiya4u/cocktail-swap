const List = require('../models/list');
const Swap = require('../models/swap');
require('chai')
  .use(require('chai-as-promised'))
  .should();

describe('1 week gain', function () {
  this.timeout(300000);
  it('it should able to calculate 1 week gain', async function () {
    let listTrade = await Swap.fetch();
    let top = await List.top(listTrade, 'profit');
    top = top.slice(0, 10);
    console.dir(top);
    top[0].trader.should.eq('0xa4196d94f5dd58eb5e1f178081dced280eb773b3');
  });
});
