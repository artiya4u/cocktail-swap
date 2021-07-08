require('chai')
  .use(require('chai-as-promised'))
  .should();

const SwapParser = require('../swapparser');

describe('Parse swap transactions', function () {
  this.timeout(5000);

  it('swap with both alt token', async function () {
    let tx = {
      "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
      "blockNumber": 8971024,
      "contractAddress": null,
      "cumulativeGasUsed": 12573156,
      "from": "0x1ba1629b641b8ae89a10fda9887cc61386226420",
      "gasUsed": 176433,
      "logs": [
        {
          "address": "0x617724974218A18769020A70162165A539c07E8a",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000001ba1629b641b8ae89a10fda9887cc61386226420",
            "0x00000000000000000000000051123dd7bf791929bbfa75e913f7632a0ef1b82c"
          ],
          "data": "0x0000000000000000000000000000000000000000000000117fe65c6c40c5c42c",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 307,
          "removed": false,
          "id": "log_92d7f51d"
        },
        {
          "address": "0x617724974218A18769020A70162165A539c07E8a",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x0000000000000000000000001ba1629b641b8ae89a10fda9887cc61386226420",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0xffffffffffffffffffffffffffffffffffffffffffffffc5d7c2613f58423bd3",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 308,
          "removed": false,
          "id": "log_553d2d1d"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x00000000000000000000000051123dd7bf791929bbfa75e913f7632a0ef1b82c",
            "0x00000000000000000000000002fe6dbeefc6aa4b3ec86e7ef2574b060ea64127"
          ],
          "data": "0x00000000000000000000000000000000000000000000000004281fcda55d8265",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 309,
          "removed": false,
          "id": "log_a02ecfdd"
        },
        {
          "address": "0x51123Dd7BF791929BBfA75E913f7632A0eF1B82c",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x0000000000000000000000000000000000000000000096189a0f533cb3843f00000000000000000000000000000000000000000000000023b9d1ffab8e73d2b1",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 310,
          "removed": false,
          "id": "log_b1401ceb"
        },
        {
          "address": "0x51123Dd7BF791929BBfA75E913f7632A0eF1B82c",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e",
            "0x00000000000000000000000002fe6dbeefc6aa4b3ec86e7ef2574b060ea64127"
          ],
          "data": "0x0000000000000000000000000000000000000000000000117fe65c6c40c5c42c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004281fcda55d8265",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 311,
          "removed": false,
          "id": "log_27db0a8d"
        },
        {
          "address": "0xA244Ef3f07699b4b929C17e99DDB39BeC238465B",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x00000000000000000000000002fe6dbeefc6aa4b3ec86e7ef2574b060ea64127",
            "0x0000000000000000000000001ba1629b641b8ae89a10fda9887cc61386226420"
          ],
          "data": "0x0000000000000000000000000000000000000000000001453d5e90c7d4adce72",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 312,
          "removed": false,
          "id": "log_d4bbd1d8"
        },
        {
          "address": "0x02Fe6DBEEfC6AA4b3ec86E7eF2574b060EA64127",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x00000000000000000000000000000000000000000000fa183f3ea50000c4db56000000000000000000000000000000000000000000000003345fee94d87116bd",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 313,
          "removed": false,
          "id": "log_1f00de1b"
        },
        {
          "address": "0x02Fe6DBEEfC6AA4b3ec86E7eF2574b060EA64127",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e",
            "0x0000000000000000000000001ba1629b641b8ae89a10fda9887cc61386226420"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004281fcda55d82650000000000000000000000000000000000000000000001453d5e90c7d4adce720000000000000000000000000000000000000000000000000000000000000000",
          "blockNumber": 8971024,
          "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
          "transactionIndex": 84,
          "blockHash": "0xcf242411d1f30823fde01a9802fc766263b4b1a50ca338e25b62367fafb0cf30",
          "logIndex": 314,
          "removed": false,
          "id": "log_6166e88d"
        }
      ],
      "logsBloom": "0x00200200200000000000100080000000000000000000000000000000000000000000000080000000000000000000000000000000000000000400000000200000000000000000000000000008000000200000000000000000010400000000010000000001000000000000000000000000000000000000000000200010000000800000000000000000000000020000400000240000000000180000004000000001020000000000000000000400020000000000002000800000000000000000000000080002004000000000000800000000000000000000001000000000000080000010000000000000000000000000000000000000000000000000000000001000",
      "status": true,
      "to": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "transactionHash": "0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572",
      "transactionIndex": 84,
      "type": "0x0"
    };
    const expected = {
      valueUSD: 93.74537795829828,
      swapAt: new Date('2021-07-08T07:53:35.000Z'),
      txHash: '0x60d59b26719995a42c3afd0310bc000300cb7b457afbe1ede6fa65ce73343572',
      blockNumber: 8971024,
      swapper: '0x1ba1629b641b8ae89a10fda9887cc61386226420',
      router: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      tokenOut: '0x617724974218A18769020A70162165A539c07E8a',
      tokenOutName: 'OliveCash Token',
      tokenOutDecimal: '18',
      tokenOutSymbol: 'OLIVE',
      amountOut: '322810804560535602220',
      tokenIn: '0xA244Ef3f07699b4b929C17e99DDB39BeC238465B',
      tokenInName: 'EggChain',
      tokenInSymbol: 'EGGC',
      tokenInDecimal: '18',
      amountIn: '5999613955027669732978'
    };

    let swap = await SwapParser.parseSwapTx(tx);
    swap.should.deep.eq(expected);
  });
});
