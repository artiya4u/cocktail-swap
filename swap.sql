create table swaps
(
    txHash          varchar(66)     not null primary key,
    valueUSD        decimal(48, 16) not null,
    blockNumber     int             not null,
    swapAt          timestamp       not null,
    tokenOutDecimal int             not null,
    swapper         varchar(42)     not null,
    router          varchar(42)     not null,
    tokenOut        varchar(42)     not null,
    tokenOutName    varchar(42)     not null,
    tokenOutSymbol  varchar(20)     not null,
    amountOut       varchar(80)     not null,
    tokenIn         varchar(42)     not null,
    tokenInName     varchar(42)     not null,
    tokenInDecimal  int             not null,
    tokenInSymbol   varchar(20)     not null,
    amountIn        varchar(80)     not null
) charset = latin1;

