create table swaps
(
    txHash          varchar(66)     not null primary key,
    swapAt          timestamp       not null,
    blockNumber     int             not null,
    valueUSD        decimal(48, 16) not null,
    swapper         varchar(42)     not null,
    router          varchar(42)     not null,

    tokenOut        varchar(42)     not null,
    tokenOutName    varchar(42)     not null,
    tokenOutDecimal int             not null,
    tokenOutSymbol  varchar(20)     not null,
    amountOut       varchar(80)     not null,

    tokenIn         varchar(42)     not null,
    tokenInName     varchar(42)     not null,
    tokenInSymbol   varchar(20)     not null,
    tokenInDecimal  int             not null,
    amountIn        varchar(80)     not null
) charset = latin1;

