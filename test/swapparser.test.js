require('chai')
  .use(require('chai-as-promised'))
  .should();

const SwapParser = require('../swapparser');

describe('Parse swap transactions', function () {
  this.timeout(10000);

  it('swap alt-alt', async function () {
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

  it('swap alt-alt different decimal', async function () {
    let tx = {
      "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
      "blockNumber": 8971641,
      "contractAddress": null,
      "cumulativeGasUsed": 9803565,
      "from": "0x0b29e548fc08c53065ddd21cdb1782a774af8bf6",
      "gasUsed": 329736,
      "logs": [
        {
          "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000000b29e548fc08c53065ddd21cdb1782a774af8bf6",
            "0x0000000000000000000000000ed7e52944161450477ee417de9cd3a859b14fd0"
          ],
          "data": "0x0000000000000000000000000000000000000000000000056bc79d5fa4d927fb",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 201,
          "removed": false,
          "id": "log_d4bdab5f"
        },
        {
          "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x0000000000000000000000000b29e548fc08c53065ddd21cdb1782a774af8bf6",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0xfffffffffffffffffffffffffffffffffffffffffffffda45ac089bba07a2441",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 202,
          "removed": false,
          "id": "log_88d489c5"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000000ed7e52944161450477ee417de9cd3a859b14fd0",
            "0x00000000000000000000000093d94fcb0dcc8a88257b2d2eec7a2615ebedb542"
          ],
          "data": "0x0000000000000000000000000000000000000000000000003f4a79d14d1840ab",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 203,
          "removed": false,
          "id": "log_58463280"
        },
        {
          "address": "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x00000000000000000000000000000000000000000011da63e742851d8d39a4fb00000000000000000000000000000000000000000000d0f546fcb16001b0c0b3",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 204,
          "removed": false,
          "id": "log_fcd5b4a6"
        },
        {
          "address": "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e",
            "0x00000000000000000000000093d94fcb0dcc8a88257b2d2eec7a2615ebedb542"
          ],
          "data": "0x0000000000000000000000000000000000000000000000056bc79d5fa4d927fb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003f4a79d14d1840ab",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 205,
          "removed": false,
          "id": "log_be2528f7"
        },
        {
          "address": "0xC7D43F2B51F44f09fBB8a691a0451E8FFCF36c0a",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x00000000000000000000000093d94fcb0dcc8a88257b2d2eec7a2615ebedb542",
            "0x0000000000000000000000000b29e548fc08c53065ddd21cdb1782a774af8bf6"
          ],
          "data": "0x00000000000000000000000000000000000000000000000205d8ac615a533412",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 206,
          "removed": false,
          "id": "log_5c2eab8e"
        },
        {
          "address": "0x93D94Fcb0dcC8a88257B2d2eec7A2615EBEdB542",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x000000000000000000000000000000000000000000000235da5c63b4c045f3ca00000000000000000000000000000000000000000000145ccbf6b936ea874887",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 207,
          "removed": false,
          "id": "log_da2d17aa"
        },
        {
          "address": "0x93D94Fcb0dcC8a88257B2d2eec7A2615EBEdB542",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e",
            "0x0000000000000000000000000b29e548fc08c53065ddd21cdb1782a774af8bf6"
          ],
          "data": "0x0000000000000000000000000000000000000000000000003f4a79d14d1840ab000000000000000000000000000000000000000000000000011e83f1b600c81b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000245d990c96e1e34c0",
          "blockNumber": 8971641,
          "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
          "transactionIndex": 53,
          "blockHash": "0x21368ac9846e55471d0bcb430039f06ac43a49aa06b87601feb8606ff8486f08",
          "logIndex": 208,
          "removed": false,
          "id": "log_0da3fc98"
        }
      ],
      "logsBloom": "0x00200300080000000000000080000400000000000000000000000000000000000000000004000000000000000000000200000000000000020000000000200000000000000000000004000008000000204000000000000002000400000200000000000000000000000000000000000000000000000000000000000010000000008000000000000000000000000000000000240000000000082000014000000000020000000000004800000008020000000000800000000000002000000000000000000002000000000000000000000000000000000000801000000000000090000010000000000000000000000000000000000008000000000000000000000000",
      "status": true,
      "to": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "transactionHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
      "transactionIndex": 53,
      "type": "0x0"
    };
    const expected = {
      "valueUSD": 1430.1187649887238,
      "swapAt": new Date("2021-07-08T08:24:26.000Z"),
      "txHash": "0x50f0b6c83087391943a743c5a101df8f0b6917e04a82d934e76115abe5cf6e6f",
      "blockNumber": 8971641,
      "swapper": "0x0b29e548fc08c53065ddd21cdb1782a774af8bf6",
      "router": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "tokenOut": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      "tokenOutName": "PancakeSwap Token",
      "tokenOutDecimal": "18",
      "tokenOutSymbol": "Cake",
      "amountOut": "100000069485084616699",
      "tokenIn": "0xC7D43F2B51F44f09fBB8a691a0451E8FFCF36c0a",
      "tokenInName": "EverRise",
      "tokenInSymbol": "RISE",
      "tokenInDecimal": "9",
      "amountIn": "37314764246705452050"
    };

    let swap = await SwapParser.parseSwapTx(tx);
    swap.should.deep.eq(expected);
  });


  it('swap alt-bnb', async function () {
    let tx = {
      "blockHash": "0x59a2d9b7e8775beff88ad7154374b3b3f110db7c55595231157e72c273a97996",
      "blockNumber": 8971743,
      "contractAddress": null,
      "cumulativeGasUsed": 1982720,
      "from": "0x3d7b5ce54bea8a496d2ac58cf0b972d04f0a9c47",
      "gasUsed": 138574,
      "logs": [
        {
          "address": "0xed0294dbd2a0e52a09c3F38a09F6e03de2C44fCf",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000003d7b5ce54bea8a496d2ac58cf0b972d04f0a9c47",
            "0x00000000000000000000000077885c3effe70e31a975e73046438d0badb8ccb5"
          ],
          "data": "0x000000000000000000000000000000000000000000000000ebec21ee1da40000",
          "blockNumber": 8971743,
          "transactionHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
          "transactionIndex": 22,
          "blockHash": "0x59a2d9b7e8775beff88ad7154374b3b3f110db7c55595231157e72c273a97996",
          "logIndex": 67,
          "removed": false,
          "id": "log_c94c9d1f"
        },
        {
          "address": "0xed0294dbd2a0e52a09c3F38a09F6e03de2C44fCf",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x0000000000000000000000003d7b5ce54bea8a496d2ac58cf0b972d04f0a9c47",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0xffffffffffffffffffffffffffffffffffffffffffffffeed0bdc389b92bffff",
          "blockNumber": 8971743,
          "transactionHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
          "transactionIndex": 22,
          "blockHash": "0x59a2d9b7e8775beff88ad7154374b3b3f110db7c55595231157e72c273a97996",
          "logIndex": 68,
          "removed": false,
          "id": "log_cdaf7d2e"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x00000000000000000000000077885c3effe70e31a975e73046438d0badb8ccb5",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0x00000000000000000000000000000000000000000000000000112fe83feda833",
          "blockNumber": 8971743,
          "transactionHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
          "transactionIndex": 22,
          "blockHash": "0x59a2d9b7e8775beff88ad7154374b3b3f110db7c55595231157e72c273a97996",
          "logIndex": 69,
          "removed": false,
          "id": "log_0ba08982"
        },
        {
          "address": "0x77885c3EFfe70e31A975e73046438d0BADb8Ccb5",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000065a53a472f8a040000000000000000000000000000000000000000000000065bb05158b9fca397",
          "blockNumber": 8971743,
          "transactionHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
          "transactionIndex": 22,
          "blockHash": "0x59a2d9b7e8775beff88ad7154374b3b3f110db7c55595231157e72c273a97996",
          "logIndex": 70,
          "removed": false,
          "id": "log_166857e4"
        },
        {
          "address": "0x77885c3EFfe70e31A975e73046438d0BADb8Ccb5",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ebec21ee1da4000000000000000000000000000000000000000000000000000000112fe83feda8330000000000000000000000000000000000000000000000000000000000000000",
          "blockNumber": 8971743,
          "transactionHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
          "transactionIndex": 22,
          "blockHash": "0x59a2d9b7e8775beff88ad7154374b3b3f110db7c55595231157e72c273a97996",
          "logIndex": 71,
          "removed": false,
          "id": "log_b3b812ab"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0x00000000000000000000000000000000000000000000000000112fe83feda833",
          "blockNumber": 8971743,
          "transactionHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
          "transactionIndex": 22,
          "blockHash": "0x59a2d9b7e8775beff88ad7154374b3b3f110db7c55595231157e72c273a97996",
          "logIndex": 72,
          "removed": false,
          "id": "log_6994ad85"
        }
      ],
      "logsBloom": "0x00200200000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000200000000000004008000000200000000000400000000400000000000000000000000000000000000000000000000008000000050000000010000000000000000000000000000000000000000000240200000000080000004000000000020000000020000000000000020000000000000000000000000000000000000000000002000000000000000000000000000000000000001000000002000080000010080000000000000000000000000000000000000000080008000001008000",
      "status": true,
      "to": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "transactionHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
      "transactionIndex": 22,
      "type": "0x0"
    };
    const expected = {
      "valueUSD": 1.511215437624045300,
      "swapAt": new Date("2021-07-08T08:29:32.000Z"),
      "txHash": "0x6c6d37322d42ff19939a0449d4d4ff8539d3b0c1b3e6740d8349ee256aee6b6b",
      "blockNumber": 8971743,
      "swapper": "0x3d7b5ce54bea8a496d2ac58cf0b972d04f0a9c47",
      "router": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "tokenOut": "0xed0294dbd2a0e52a09c3F38a09F6e03de2C44fCf",
      "tokenOutName": "ChaingeToken",
      "tokenOutDecimal": "18",
      "tokenOutSymbol": "CHNG",
      "amountOut": "17000000000000000000",
      "tokenIn": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "tokenInName": "Wrapped BNB",
      "tokenInSymbol": "WBNB",
      "tokenInDecimal": "18",
      "amountIn": "4837749155538995"
    };

    let swap = await SwapParser.parseSwapTx(tx);
    swap.should.deep.eq(expected);
  });

  it('swap alt-usdt', async function () {
    let tx = {
      "blockHash": "0x6dad41901d08c5dc0ed23dbafc07817a999b4fffc41522288735c3e968db3ba5",
      "blockNumber": 8971994,
      "contractAddress": null,
      "cumulativeGasUsed": 14526449,
      "from": "0x28e526e9589ebf343ed721424716a4b1a1a13e09",
      "gasUsed": 111081,
      "logs": [
        {
          "address": "0x084bb94e93891D74579B54Ab63ED24C4ef9cd5Ef",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x00000000000000000000000028e526e9589ebf343ed721424716a4b1a1a13e09",
            "0x00000000000000000000000052560ebc7920617c9b7328186d1f4a136eaf07f4"
          ],
          "data": "0x00000000000000000000000000000000000000000000021e19e0c9bab2400000",
          "blockNumber": 8971994,
          "transactionHash": "0xabf7f4a13e72cac78212ada2a1a2c340f7a17bf5612a463cffa48896814f433c",
          "transactionIndex": 107,
          "blockHash": "0x6dad41901d08c5dc0ed23dbafc07817a999b4fffc41522288735c3e968db3ba5",
          "logIndex": 457,
          "removed": false,
          "id": "log_0ce8c06a"
        },
        {
          "address": "0x084bb94e93891D74579B54Ab63ED24C4ef9cd5Ef",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x00000000000000000000000028e526e9589ebf343ed721424716a4b1a1a13e09",
            "0x0000000000000000000000000f4610ab02920a99f639f675085a5d3e24b0d7ae"
          ],
          "data": "0xffffffffffffffffffffffffffffffffffffffffffff6877ccbb1a8d522324d0",
          "blockNumber": 8971994,
          "transactionHash": "0xabf7f4a13e72cac78212ada2a1a2c340f7a17bf5612a463cffa48896814f433c",
          "transactionIndex": 107,
          "blockHash": "0x6dad41901d08c5dc0ed23dbafc07817a999b4fffc41522288735c3e968db3ba5",
          "logIndex": 458,
          "removed": false,
          "id": "log_9f04f9c2"
        },
        {
          "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x00000000000000000000000052560ebc7920617c9b7328186d1f4a136eaf07f4",
            "0x00000000000000000000000028e526e9589ebf343ed721424716a4b1a1a13e09"
          ],
          "data": "0x000000000000000000000000000000000000000000000030b1ee9165cddaa0c6",
          "blockNumber": 8971994,
          "transactionHash": "0xabf7f4a13e72cac78212ada2a1a2c340f7a17bf5612a463cffa48896814f433c",
          "transactionIndex": 107,
          "blockHash": "0x6dad41901d08c5dc0ed23dbafc07817a999b4fffc41522288735c3e968db3ba5",
          "logIndex": 459,
          "removed": false,
          "id": "log_40d561c6"
        },
        {
          "address": "0x52560eBc7920617c9b7328186D1F4A136eAF07F4",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x00000000000000000000000000000000000000000002221091e171c33c15e7590000000000000000000000000000000000000000000030fbbb7f040f856242ac",
          "blockNumber": 8971994,
          "transactionHash": "0xabf7f4a13e72cac78212ada2a1a2c340f7a17bf5612a463cffa48896814f433c",
          "transactionIndex": 107,
          "blockHash": "0x6dad41901d08c5dc0ed23dbafc07817a999b4fffc41522288735c3e968db3ba5",
          "logIndex": 460,
          "removed": false,
          "id": "log_0c4c2aef"
        },
        {
          "address": "0x52560eBc7920617c9b7328186D1F4A136eAF07F4",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x0000000000000000000000000f4610ab02920a99f639f675085a5d3e24b0d7ae",
            "0x00000000000000000000000028e526e9589ebf343ed721424716a4b1a1a13e09"
          ],
          "data": "0x00000000000000000000000000000000000000000000021e19e0c9bab240000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030b1ee9165cddaa0c6",
          "blockNumber": 8971994,
          "transactionHash": "0xabf7f4a13e72cac78212ada2a1a2c340f7a17bf5612a463cffa48896814f433c",
          "transactionIndex": 107,
          "blockHash": "0x6dad41901d08c5dc0ed23dbafc07817a999b4fffc41522288735c3e968db3ba5",
          "logIndex": 461,
          "removed": false,
          "id": "log_84b40320"
        }
      ],
      "logsBloom": "0x0060000000000010000000008000000000000000000000c000000000000000000000000000200000000000000000000000000000000000000000000000200000000000000000000000000008000000200000000000000000000000000000000000000000000000000000000000000000010000000000000000800010000000000000000000010000000000000000000000000000000000080200004000000000020000000000000000000000200000000000000000000000000000000000000000000002002000020000000000001000000000000020001000000000000000000010000000000000000000000000002080000000000000000080000002000000",
      "status": true,
      "to": "0x0f4610ab02920a99f639f675085a5d3e24b0d7ae",
      "transactionHash": "0xabf7f4a13e72cac78212ada2a1a2c340f7a17bf5612a463cffa48896814f433c",
      "transactionIndex": 107,
      "type": "0x0"
    };
    const expected = {
      "valueUSD": 898.265060593660240070,
      "swapAt": new Date("2021-07-08T08:42:05.000Z"),
      "txHash": "0xabf7f4a13e72cac78212ada2a1a2c340f7a17bf5612a463cffa48896814f433c",
      "blockNumber": 8971994,
      "swapper": "0x28e526e9589ebf343ed721424716a4b1a1a13e09",
      "router": "0x0f4610ab02920a99f639f675085a5d3e24b0d7ae",
      "tokenOut": "0x084bb94e93891D74579B54Ab63ED24C4ef9cd5Ef",
      "tokenOutName": "Foodcourt Coupon",
      "tokenOutDecimal": "18",
      "tokenOutSymbol": "COUPON",
      "amountOut": "10000000000000000000000",
      "tokenIn": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      "tokenInName": "BUSD Token",
      "tokenInSymbol": "BUSD",
      "tokenInDecimal": "18",
      "amountIn": "898265060593660240070"
    };

    let swap = await SwapParser.parseSwapTx(tx);
    swap.should.deep.eq(expected);
  });

  it('swap usdt-alt', async function () {
    let tx = {
      "blockHash": "0x82e31417f2721f02c36aca5a5b531920ac8121866a929e518bf170c6b61fbc7b",
      "blockNumber": 8972139,
      "contractAddress": null,
      "cumulativeGasUsed": 3720229,
      "from": "0xe626383bb631a69ca897dafff63dcee1d40e5917",
      "gasUsed": 176729,
      "logs": [
        {
          "address": "0x55d398326f99059fF775485246999027B3197955",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000e626383bb631a69ca897dafff63dcee1d40e5917",
            "0x000000000000000000000000bf7cd39d07adaa953e1e0be47f97315955c9381b"
          ],
          "data": "0x000000000000000000000000000000000000000000000002b5e3af16b1880000",
          "blockNumber": 8972139,
          "transactionHash": "0xf3b1fcfd04cfd7d9dd78297bd75ebe0fbe57913390c72982e3ff770d133584a1",
          "transactionIndex": 18,
          "blockHash": "0x82e31417f2721f02c36aca5a5b531920ac8121866a929e518bf170c6b61fbc7b",
          "logIndex": 104,
          "removed": false,
          "id": "log_a86d4da4"
        },
        {
          "address": "0x55d398326f99059fF775485246999027B3197955",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x000000000000000000000000e626383bb631a69ca897dafff63dcee1d40e5917",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0xfffffffffffffffffffffffffffffffffffffffffffffffd3c3b9a35a713ffff",
          "blockNumber": 8972139,
          "transactionHash": "0xf3b1fcfd04cfd7d9dd78297bd75ebe0fbe57913390c72982e3ff770d133584a1",
          "transactionIndex": 18,
          "blockHash": "0x82e31417f2721f02c36aca5a5b531920ac8121866a929e518bf170c6b61fbc7b",
          "logIndex": 105,
          "removed": false,
          "id": "log_09f5928a"
        },
        {
          "address": "0xc748673057861a797275CD8A068AbB95A902e8de",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000bf7cd39d07adaa953e1e0be47f97315955c9381b",
            "0x000000000000000000000000e626383bb631a69ca897dafff63dcee1d40e5917"
          ],
          "data": "0x000000000000000000000000000000000000000000000000ee5bd4172e219cb0",
          "blockNumber": 8972139,
          "transactionHash": "0xf3b1fcfd04cfd7d9dd78297bd75ebe0fbe57913390c72982e3ff770d133584a1",
          "transactionIndex": 18,
          "blockHash": "0x82e31417f2721f02c36aca5a5b531920ac8121866a929e518bf170c6b61fbc7b",
          "logIndex": 106,
          "removed": false,
          "id": "log_a9dded79"
        },
        {
          "address": "0xBF7cd39D07aDAa953E1E0bE47F97315955c9381B",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x000000000000000000000000000000000000000000002efab7706fe73d0faaed0000000000000000000000000000000000000000000011f8d05d667a94c7b1b6",
          "blockNumber": 8972139,
          "transactionHash": "0xf3b1fcfd04cfd7d9dd78297bd75ebe0fbe57913390c72982e3ff770d133584a1",
          "transactionIndex": 18,
          "blockHash": "0x82e31417f2721f02c36aca5a5b531920ac8121866a929e518bf170c6b61fbc7b",
          "logIndex": 107,
          "removed": false,
          "id": "log_a77e4aae"
        },
        {
          "address": "0xBF7cd39D07aDAa953E1E0bE47F97315955c9381B",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e",
            "0x000000000000000000000000e626383bb631a69ca897dafff63dcee1d40e5917"
          ],
          "data": "0x000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000057d9d32025b76c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000108d7cf363341ca8a",
          "blockNumber": 8972139,
          "transactionHash": "0xf3b1fcfd04cfd7d9dd78297bd75ebe0fbe57913390c72982e3ff770d133584a1",
          "transactionIndex": 18,
          "blockHash": "0x82e31417f2721f02c36aca5a5b531920ac8121866a929e518bf170c6b61fbc7b",
          "logIndex": 108,
          "removed": false,
          "id": "log_d2186693"
        }
      ],
      "logsBloom": "0x00280200000000000000000080000000000000000000000000000000000001000000000000000000000000000000000000000200000000000000000000200000000000000000000001000008000000200000000000000000000000000000000000000000000000000000000000000000000004000000000000000011000000000020000000000000008000000000000000200000000000080000004008000000020000000000000000000000020000000000000000000000000000000000000001000002000000000000000000000000200000000800001000000000000000000010080000000000020000000000000000000002000000000000000000000000",
      "status": true,
      "to": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "transactionHash": "0xf3b1fcfd04cfd7d9dd78297bd75ebe0fbe57913390c72982e3ff770d133584a1",
      "transactionIndex": 18,
      "type": "0x0"
    };
    const expected = {
      "valueUSD": 50,
      "swapAt": new Date("2021-07-08T08:49:20.000Z"),
      "txHash": "0xf3b1fcfd04cfd7d9dd78297bd75ebe0fbe57913390c72982e3ff770d133584a1",
      "blockNumber": 8972139,
      "swapper": "0xe626383bb631a69ca897dafff63dcee1d40e5917",
      "router": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "tokenOut": "0x55d398326f99059fF775485246999027B3197955",
      "tokenOutName": "Tether USD",
      "tokenOutDecimal": "18",
      "tokenOutSymbol": "USDT",
      "amountOut": "50000000000000000000",
      "tokenIn": "0xc748673057861a797275CD8A068AbB95A902e8de",
      "tokenInName": "Baby Doge Coin",
      "tokenInSymbol": "BabyDoge",
      "tokenInDecimal": "9",
      "amountIn": "17175554799930809520"
    };

    let swap = await SwapParser.parseSwapTx(tx);
    swap.should.deep.eq(expected);
  });

  it('swap alt-bnb different decimal', async function () {
    let tx = {
      "blockHash": "0xc77253cc19f5026ff5a51047ff4a4a460fe39595ff7b2deec69774cb2b947d65",
      "blockNumber": 8972218,
      "contractAddress": null,
      "cumulativeGasUsed": 15729562,
      "from": "0xcd7f1da74301ed8e7f4ce3a76517bfffcae554e2",
      "gasUsed": 192058,
      "logs": [
        {
          "address": "0xc748673057861a797275CD8A068AbB95A902e8de",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000cd7f1da74301ed8e7f4ce3a76517bfffcae554e2",
            "0x000000000000000000000000c736ca3d9b1e90af4230bd8f9626528b3d4e0ee0"
          ],
          "data": "0x0000000000000000000000000000000000000000000000291560a2c4b205ea42",
          "blockNumber": 8972218,
          "transactionHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
          "transactionIndex": 91,
          "blockHash": "0xc77253cc19f5026ff5a51047ff4a4a460fe39595ff7b2deec69774cb2b947d65",
          "logIndex": 346,
          "removed": false,
          "id": "log_c50c30fb"
        },
        {
          "address": "0xc748673057861a797275CD8A068AbB95A902e8de",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x000000000000000000000000cd7f1da74301ed8e7f4ce3a76517bfffcae554e2",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0xfffffffffffffffffffffffffffffffffffffffffffffe66a69dd8ab45861222",
          "blockNumber": 8972218,
          "transactionHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
          "transactionIndex": 91,
          "blockHash": "0xc77253cc19f5026ff5a51047ff4a4a460fe39595ff7b2deec69774cb2b947d65",
          "logIndex": 347,
          "removed": false,
          "id": "log_d4fb1198"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000c736ca3d9b1e90af4230bd8f9626528b3d4e0ee0",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0x00000000000000000000000000000000000000000000000057e6c8bd68c44e3a",
          "blockNumber": 8972218,
          "transactionHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
          "transactionIndex": 91,
          "blockHash": "0xc77253cc19f5026ff5a51047ff4a4a460fe39595ff7b2deec69774cb2b947d65",
          "logIndex": 348,
          "removed": false,
          "id": "log_df679e72"
        },
        {
          "address": "0xc736cA3d9b1E90Af4230BD8F9626528B3D4e0Ee0",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x000000000000000000000000000000000000000000000da09293adcd4b463d51000000000000000000000000000000000000000000065c3b51da007d5b950825",
          "blockNumber": 8972218,
          "transactionHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
          "transactionIndex": 91,
          "blockHash": "0xc77253cc19f5026ff5a51047ff4a4a460fe39595ff7b2deec69774cb2b947d65",
          "logIndex": 349,
          "removed": false,
          "id": "log_e393abf1"
        },
        {
          "address": "0xc736cA3d9b1E90Af4230BD8F9626528B3D4e0Ee0",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000029201310a9fd1d664e00000000000000000000000000000000000000000000000057e6c8bd68c44e3a0000000000000000000000000000000000000000000000000000000000000000",
          "blockNumber": 8972218,
          "transactionHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
          "transactionIndex": 91,
          "blockHash": "0xc77253cc19f5026ff5a51047ff4a4a460fe39595ff7b2deec69774cb2b947d65",
          "logIndex": 350,
          "removed": false,
          "id": "log_561d7762"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65",
            "0x00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e"
          ],
          "data": "0x00000000000000000000000000000000000000000000000057e6c8bd68c44e3a",
          "blockNumber": 8972218,
          "transactionHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
          "transactionIndex": 91,
          "blockHash": "0xc77253cc19f5026ff5a51047ff4a4a460fe39595ff7b2deec69774cb2b947d65",
          "logIndex": 351,
          "removed": false,
          "id": "log_7d9c937e"
        }
      ],
      "logsBloom": "0x00200200000000000000000180000000000000000000040008000000000000000000000000000000000000000000000001000000000000000000000000200000000400000800000000000008000001200000000000400000000400000000000000000000000000000000000000000000000000000000040000000010000000000000000000000000000000000000000000240000000008080000004000000000020000000000000000000000020000000000000000000000000000000000000001000002000000000000000000000001000000000000001000000002000080000010080000000000020000000000000000000000000000000000000000000000",
      "status": true,
      "to": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "transactionHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
      "transactionIndex": 91,
      "type": "0x0"
    };
    const expected = {
      "valueUSD": 1989.2822618287498,
      "swapAt": new Date("2021-07-08T08:53:17.000Z"),
      "txHash": "0x15e5b1884a0f6e914bb71db6e01338dad762fb8a37c38f95a9a558d8068c462f",
      "blockNumber": 8972218,
      "swapper": "0xcd7f1da74301ed8e7f4ce3a76517bfffcae554e2",
      "router": "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      "tokenOut": "0xc748673057861a797275CD8A068AbB95A902e8de",
      "tokenOutName": "Baby Doge Coin",
      "tokenOutDecimal": "9",
      "tokenOutSymbol": "BabyDoge",
      "amountOut": "757856917060336347714",
      "tokenIn": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "tokenInName": "Wrapped BNB",
      "tokenInSymbol": "WBNB",
      "tokenInDecimal": "18",
      "amountIn": "6333970641775251002"
    };

    let swap = await SwapParser.parseSwapTx(tx);
    swap.should.deep.eq(expected);
  });

  it('swap arbitrage - ignored', async function () {
    let tx = {
      "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
      "blockNumber": 8972468,
      "contractAddress": null,
      "cumulativeGasUsed": 1012158,
      "from": "0x4a20b99e455f902a1ee6124cfd853529f7f0c0a0",
      "gasUsed": 167648,
      "logs": [
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000009303613fefaf05a573d046cfedd2519b776bc29f",
            "0x000000000000000000000000a3388df2be3c629d11ada295c980c7a4677078de"
          ],
          "data": "0x000000000000000000000000000000000000000000000000041f1ec4c29454b9",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 34,
          "removed": false,
          "id": "log_e0fa1ca3"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000a3388df2be3c629d11ada295c980c7a4677078de",
            "0x000000000000000000000000c3ed1ebf16c11e28c6477c78577ae455d21577ca"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000412e4e1c0b524c0",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 35,
          "removed": false,
          "id": "log_13d5a90f"
        },
        {
          "address": "0x85c128eE1feEb39A59490c720A9C563554B51D33",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000c3ed1ebf16c11e28c6477c78577ae455d21577ca",
            "0x0000000000000000000000009303613fefaf05a573d046cfedd2519b776bc29f"
          ],
          "data": "0x000000000000000000000000000000000000000000000000436e95cbc5001ba6",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 36,
          "removed": false,
          "id": "log_0a61c175"
        },
        {
          "address": "0xc3ED1ebF16c11e28c6477C78577aE455D21577CA",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x00000000000000000000000000000000000000000000001906e5344ea19b9f7a000000000000000000000000000000000000000000000001865cec0c6d978652",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 37,
          "removed": false,
          "id": "log_2a524710"
        },
        {
          "address": "0xc3ED1ebF16c11e28c6477C78577aE455D21577CA",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x000000000000000000000000a3388df2be3c629d11ada295c980c7a4677078de",
            "0x0000000000000000000000009303613fefaf05a573d046cfedd2519b776bc29f"
          ],
          "data": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000412e4e1c0b524c0000000000000000000000000000000000000000000000000436e95cbc5001ba60000000000000000000000000000000000000000000000000000000000000000",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 38,
          "removed": false,
          "id": "log_86f52d6a"
        },
        {
          "address": "0x9303613fefAf05a573d046CFEdd2519B776BC29F",
          "topics": [
            "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
          ],
          "data": "0x0000000000000000000000000000000000000000000000de32432ca8b41f4e4e00000000000000000000000000000000000000000000000d9953e68c74d751c1",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 39,
          "removed": false,
          "id": "log_fcce6f26"
        },
        {
          "address": "0x9303613fefAf05a573d046CFEdd2519B776BC29F",
          "topics": [
            "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
            "0x000000000000000000000000a3388df2be3c629d11ada295c980c7a4677078de",
            "0x000000000000000000000000a3388df2be3c629d11ada295c980c7a4677078de"
          ],
          "data": "0x000000000000000000000000000000000000000000000000436e95cbc5001ba600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041f1ec4c29454b9",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 40,
          "removed": false,
          "id": "log_8bbc2aa9"
        },
        {
          "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000a3388df2be3c629d11ada295c980c7a4677078de",
            "0x00000000000000000000000057a5501d7ba50772e00b9a44390f8463a56d26d4"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000c39e301df2ff9",
          "blockNumber": 8972468,
          "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
          "transactionIndex": 6,
          "blockHash": "0xe15ededda3b104d68b1fea8587a4fece1d9f3c1bef86392d832e58987c2c6c21",
          "logIndex": 41,
          "removed": false,
          "id": "log_8d30d623"
        }
      ],
      "logsBloom": "0x00200000000000100000000080000000000000000000400000000010040000040000040000000000000000080000000000000800000000000000000080000000000004010000080000000008000000200000000000000000000400000000000000000000000000002000000000000000000000000000000000000010000080000000000000000000000000001000000000042000000000080000004000000000000000000002000000000000100000000010000000000000000000000000000000000002000000000000000000000000000000000000001000000000400080000000000000000000000000000000000000000000000000000000020000000000",
      "status": true,
      "to": "0xa3388df2be3c629d11ada295c980c7a4677078de",
      "transactionHash": "0xcc2f10beff1e2fccf51a733adbed67b9a2125db936709a2706c1912f4a977762",
      "transactionIndex": 6,
      "type": "0x0"
    };
    const expected = 0;

    let swap = await SwapParser.parseSwapTx(tx);
    swap.should.equal(expected);
  });
});
