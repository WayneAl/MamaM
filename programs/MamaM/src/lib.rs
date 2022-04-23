mod constants;
mod errors;
mod instructions;
mod macros;
mod utils;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("AYNnLtb3oTu9KWLuiaGzDQs4NKmUqJ73FP8w4rg5e3zP");

#[program]
pub mod mamam {
    use super::*;
    pub fn initialize_exchange(ctx: Context<InitializeExchange>, bump: u8) -> ProgramResult {
        initialize_exchange::handle(ctx, bump)
    }

    pub fn initialize_market(
        ctx: Context<InitializeMarket>,
        vault_signer_nonce: u64,
        // serum_data: SerumData,
        // asset_data_1: AssetData,
        // asset_data_2: AssetData
    ) -> ProgramResult {
        initialize_market::handle(ctx, vault_signer_nonce)
    }

    pub fn place_order(
        ctx: Context<PlaceOrderContext>,
        side: u8,
        limit: u64,
        max_coin_qty: u64,
        max_pc_qty: u64,
    ) -> ProgramResult {
        place_order::handle(ctx, side, limit, max_coin_qty, max_pc_qty)
    }
}
