use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

use super::MarketData;

#[account]
pub struct Amm {
    pub market: MarketData,

    pub ema: u64,
}
