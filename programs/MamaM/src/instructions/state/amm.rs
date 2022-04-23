use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

use super::MarketData;

#[account]
pub struct Amm {
    pub market: MarketData,

    pub ema: Ema,
}

#[derive(Clone, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
pub struct Ema {
    pub value: u64,
    pub length: u64,
    pub time_granularity: u64, // in secs
    pub timestamp: u64,        // in secs
}

impl Ema {
    /// init Ema
    pub fn new(&mut self, length: u64, time_granularity: u64) {
        self.length = length;
        self.time_granularity = time_granularity;
        self.timestamp = Clock::get().unwrap().unix_timestamp as u64;

        self.value = 0; // TODO
    }

    /// update Ema
    pub fn next(&mut self, price: f64) {
        // calculation
        let alpha: f64 = (2 / (self.length + 1)) as f64;
        self.value = ((alpha * price + (1 as f64 - alpha) * (self.value as f64)) * (10 ^ 6) as f64)
            .round() as u64;
    }
}
