use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

use crate::u_to_f_repr;

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
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MarketData {
    pub address: Pubkey,
    pub pair_name: String,
    pub asset_1: AssetData,
    pub asset_2: AssetData,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
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
#[derive(Debug)]
pub struct Amm {
    pub market: MarketData,

    // temp
    pub market_address: Pubkey,

    pub vault_1: Pubkey,
    pub vault_2: Pubkey,

    pub ema: u64,
    pub timestamp: u64, // in secs

    pub length: u64,
    pub time_granularity: u64, // in secs
    pub range: u64,            // in bps (f_to_u)
}

impl Amm {
    pub fn to_string(&self) -> String {
        self.length.to_string() + &self.time_granularity.to_string() + &self.range.to_string()
    }

    /// update Ema
    pub fn ema_next(&mut self, price: f32) -> f32 {
        // calculation
        let alpha = 2_f32 / (self.length + 1) as f32;
        let ema = alpha * price + (1_f32 - alpha) * u_to_f_repr!(self.ema);
        ema
    }
}
