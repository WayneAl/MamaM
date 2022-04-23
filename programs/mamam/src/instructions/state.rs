use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

#[account]
#[derive(Default)]
pub struct Exchange {
    pub authority: Pubkey,

    pub markets: Vec<MarketData>,
    pub amms: Vec<AmmData>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AmmData {
    pub address: Pubkey,
    pub market_address: Pubkey,
    pub config: EmaConfig,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MarketData {
    pub address: Pubkey,
    pub pair_name: String,
    pub asset_1: AssetData,
    pub asset_2: AssetData,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AssetData {
    pub symbol: Symbol,
    pub token_mint: Pubkey,
    pub spot_oracle: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone, Eq, PartialEq)]
#[repr(u8)]
pub enum Symbol {
    BTC,
    ETH,
    USDC,
}

impl Exchange {
    pub fn find_market_data(&self) {}
}

#[account]
pub struct Amm {
    pub market: MarketData,

    pub ema: u64,
    pub timestamp: u64, // in secs
    pub config: EmaConfig,
}

#[derive(Clone, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
pub struct EmaConfig {
    pub length: u64,
    pub time_granularity: u64, // in secs
}

impl EmaConfig {
    pub fn to_string(&self) -> String {
        self.length.to_string() + &self.time_granularity.to_string()
    }
}

// impl Amm {
//     /// update Ema
//     pub fn ema_next(&mut self, price: f64, timestamp: u64) {
//         // calculation
//         let alpha: f64 = (2 / (self.length + 1)) as f64;
//         self.value = ((alpha * price + (1 as f64 - alpha) * (self.value as f64)) * (10 ^ 6) as f64)
//             .round() as u64;
//     }
// }
