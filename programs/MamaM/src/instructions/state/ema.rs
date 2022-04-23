use anchor_lang::prelude::*;

#[derive(Clone, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
struct EMA {
    pub ema: u64,
    pub length: u64,
    pub time_granularity: u64, // in secs
    pub timestamp: u64,        // in secs
    prices: Vec<u64>,
}

impl EMA {
    /// init EMA
    pub fn new(&mut self, length: u64, time_granularity: u64) {
        self.length = length;
        self.time_granularity = time_granularity;
        self.timestamp = Clock::get().unwrap().unix_timestamp as u64;

        self.ema = 0;
    }

    /// update EMA
    pub fn next(price: f64) {
        // calculation
    }
}
