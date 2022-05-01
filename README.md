# MamaM
## Solana Hackathon Taiwan

### Serum trading strategies to provide liquidity within EMA-defined bands

Serum trading bots that implement a specific strategy (i.e “provide liquidity 5% above and below the 30 minute moving average"). Users would have the ability to deposit funds into the protocol, choosing from a few reasonable choices of parameters (EMA length, market depth, etc.) The strategy would ideally reference Pyth Network for pricing

https://guide.epochs.studio/3.0-hackathon-solana-series-2022/30-hours/serum


### How to run

anchor build

anchor deploy

yarn idl      
yarn build
yarn install

ts-node sdk/scripts/initializeExchange.ts

ts-node sdk/scripts/initializeMarket.ts 

market:  FrYYFp9d6pGkkavEKTT3YwJnUBX3Qiqjr1iSuHKR6pqe
paste to constant to sdk/constants.ts

ts-node sdk/scripts/initUserOnMarket.ts

ts-node sdk/scripts/placeOrder.ts      

ts-node sdk/scripts/loadOrderbook.ts

ts-node sdk/scripts/initializeAmm.ts

amm:  BLwsrXqvao29rKFLJ9D4Nj2HXCokc48YkafQwih78eZo
paste to constant to sdk/constants.ts

ts-node sdk/scripts/depositAmm.ts

ts-node sdk/scripts/updatePrice.ts