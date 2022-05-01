# MamaM

## Solana Hackathon Taiwan

### Serum trading strategies to provide liquidity within EMA-defined bands

Serum trading bots that implement a specific strategy (i.e “provide liquidity 5% above and below the 30 minute moving average"). Users would have the ability to deposit funds into the protocol, choosing from a few reasonable choices of parameters (EMA length, market depth, etc.) The strategy would ideally reference Pyth Network for pricing

[https://guide.epochs.studio/3.0-hackathon-solana-series-2022/30-hours/serum](https://guide.epochs.studio/3.0-hackathon-solana-series-2022/30-hours/serum)

## How to run

### Generate your BTC, USDC

`spl-token create-token`

`spl-token create-account <token_mint>`

`spl-token mint <token_mint> 100000000`

### **Program (Optional)**

`anchor build`

`solana-keygen pubkey target/deploy/MamaM-keypair.json`

Use your program id to replace `3HGwuAEzU8vtqZasvKsYWF34cdw7j4y3AbtWJo1BrN19`

`anchor build`

`anchor deploy`

### **SDK**

`yarn install`

`yarn idl`

`yarn build`

**Initialize exchange and market**

`ts-node sdk/scripts/initializeExchange.ts`

`ts-node sdk/scripts/initializeMarket.ts`

market:  FrYYFp9d6pGkkavEKTT3YwJnUBX3Qiqjr1iSuHKR6pqe
→ paste `sdk/constants.ts`

**Initialize user on market and place order**

`ts-node sdk/scripts/initUserOnMarket.ts`

`ts-node sdk/scripts/placeOrder.ts`

`ts-node sdk/scripts/loadOrderbook.ts` 

→ see your order on orderbook

**Initialize AMM**

`ts-node sdk/scripts/initializeAmm.ts`

amm:  BLwsrXqvao29rKFLJ9D4Nj2HXCokc48YkafQwih78eZo
→ paste `sdk/constants.ts`

**Deposit to AMM** 

`ts-node sdk/scripts/depositAmm.ts`

**Run AMM once**

`ts-node sdk/scripts/updatePrice.ts`

**Run AMM continuosly**

`ts-node sdk/scripts/crankUpdatePrice.ts`


## Todo

AMM LP token

withdraw from AMM

