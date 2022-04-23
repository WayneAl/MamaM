export type MamamIDL = {"version":"0.0.0","name":"mamam","instructions":[{"name":"initializeExchange","accounts":[{"name":"exchange","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"bump","type":"u8"}]},{"name":"initializeMarket","accounts":[{"name":"exchange","isMut":true,"isSigner":false},{"name":"market","isMut":true,"isSigner":false},{"name":"coinMintPk","isMut":false,"isSigner":false},{"name":"pcMintPk","isMut":false,"isSigner":false},{"name":"coinVaultPk","isMut":true,"isSigner":false},{"name":"pcVaultPk","isMut":true,"isSigner":false},{"name":"bidsPk","isMut":true,"isSigner":true},{"name":"asksPk","isMut":true,"isSigner":true},{"name":"reqQPk","isMut":true,"isSigner":true},{"name":"eventQPk","isMut":true,"isSigner":true},{"name":"serumMarketAuthority","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false},{"name":"serumDexProgram","isMut":false,"isSigner":false}],"args":[{"name":"serumData","type":{"defined":"SerumData"}},{"name":"assetData1","type":{"defined":"AssetData"}},{"name":"assetData2","type":{"defined":"AssetData"}}]},{"name":"placeOrder","accounts":[{"name":"exchange","isMut":false,"isSigner":false},{"name":"user","isMut":false,"isSigner":true},{"name":"market","isMut":true,"isSigner":false},{"name":"openOrders","isMut":true,"isSigner":false},{"name":"requestQueue","isMut":true,"isSigner":false},{"name":"eventQueue","isMut":true,"isSigner":false},{"name":"bids","isMut":true,"isSigner":false},{"name":"asks","isMut":true,"isSigner":false},{"name":"coinVault","isMut":true,"isSigner":false},{"name":"pcVault","isMut":true,"isSigner":false},{"name":"serumDexProgramId","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"side","type":"u8"},{"name":"limit","type":"u64"},{"name":"maxCoinQty","type":"u64"},{"name":"maxPcQty","type":"u64"}]}],"accounts":[{"name":"exchange","type":{"kind":"struct","fields":[{"name":"authority","type":"publicKey"},{"name":"markets","type":{"vec":{"defined":"MarketData"}}},{"name":"amms","type":{"vec":{"defined":"AmmData"}}}]}},{"name":"amm","type":{"kind":"struct","fields":[{"name":"market","type":{"defined":"MarketData"}},{"name":"ema","type":"u64"},{"name":"timestamp","type":"u64"},{"name":"config","type":{"defined":"EmaConfig"}}]}}],"types":[{"name":"SerumData","type":{"kind":"struct","fields":[{"name":"coinLotSize","type":"u64"},{"name":"pcLotSize","type":"u64"},{"name":"vaultSignerNonce","type":"u64"},{"name":"pcDustThreshold","type":"u64"}]}},{"name":"AmmData","type":{"kind":"struct","fields":[{"name":"address","type":"publicKey"},{"name":"marketAddress","type":"publicKey"},{"name":"config","type":{"defined":"EmaConfig"}}]}},{"name":"MarketData","type":{"kind":"struct","fields":[{"name":"address","type":"publicKey"},{"name":"pairName","type":"string"},{"name":"asset1","type":{"defined":"AssetData"}},{"name":"asset2","type":{"defined":"AssetData"}}]}},{"name":"AssetData","type":{"kind":"struct","fields":[{"name":"symbol","type":{"defined":"Symbol"}},{"name":"tokenMint","type":"publicKey"},{"name":"spotOracle","type":"publicKey"}]}},{"name":"EmaConfig","type":{"kind":"struct","fields":[{"name":"length","type":"u64"},{"name":"timeGranularity","type":"u64"}]}},{"name":"ErrorCode","type":{"kind":"enum","variants":[{"name":"SampleError"}]}},{"name":"Symbol","type":{"kind":"enum","variants":[{"name":"BTC"},{"name":"ETH"},{"name":"USDC"}]}}]};
import { IdlAccounts } from '@project-serum/anchor';

export type ErrorCode = Record<string, Record<string, any>>
export const ErrorCode = {
  SampleError: { sampleerror: {} }
}
    

export type Symbol = Record<string, Record<string, any>>
export const Symbol = {
  BTC: { btc: {} },
  ETH: { eth: {} },
  USDC: { usdc: {} }
}
    

  

export type Exchange = IdlAccounts<MamamIDL>["exchange"]

export type Amm = IdlAccounts<MamamIDL>["amm"]
  
          