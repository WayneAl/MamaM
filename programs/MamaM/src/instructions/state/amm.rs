use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

use crate::u_to_f_repr;

use super::MarketData;

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

impl Amm {
    /// update Ema
    pub fn ema_next(&mut self, price: f64, timestamp: u64) {
        // calculation
        let alpha: f64 = (2 / (self.length + 1)) as f64;
        self.value = ((alpha * price + (1 as f64 - alpha) * (self.value as f64)) * (10 ^ 6) as f64)
            .round() as u64;
    }
}
