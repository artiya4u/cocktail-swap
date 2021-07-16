const Swap = require('./models/swap');
const List = require('./models/list');

async function top () {
  let listTrade = await Swap.fetch();
  let top = await List.top(listTrade, 'profit');
  top = top.slice(0, 10);
  console.dir(top);
}

top().then();
