use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

#[account]
#[derive(Default)]
pub struct Exchange {
    pub authority: Pubkey,

    pub markets: Vec<MarketData>,
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