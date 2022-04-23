mod errors;
mod instructions;
mod macros;
mod utils;
use anchor_lang::prelude::*;
use instructions::*;

declare_id!("9458qWTEKJxEWTCaFTCrz4w3HdgT8LxRpHieGRLXSnwQ");

#[program]
pub mod mamam {
    use super::*;
    pub fn initialize_exchange(ctx: Context<InitializeExchange>, bump: u8) -> ProgramResult {
        initialize_exchange::handle(ctx, bump)
    }

    pub fn initialize_market(
        ctx: Context<InitializeMarket>,
        serum_data: SerumData,
        asset_data_1: AssetData,
        asset_data_2: AssetData,
    ) -> ProgramResult {
        initialize_market::handle(ctx, serum_data, asset_data_1, asset_data_2)
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
