use anchor_lang::prelude::*;

#[derive(Clone, Copy, Debug, PartialEq, AnchorSerialize, AnchorDeserialize)]
struct EMA {
    pub ema: u64,
    pub variable_1: u64,
    pub variable_2: u64,
}

impl EMA {
    /// init EMA
    pub fn new(&mut self, variable_1: u64, variable_2: u64) {
        self.variable_1 = variable_1;
        self.variable_2 = variable_2;

        self.ema = 0;
    }

    /// update EMA
    pub fn next(price: f64) {
        // calculation
    }
}
