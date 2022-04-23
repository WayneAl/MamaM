mod errors;
mod instructions;
mod macros;
mod utils;
use anchor_lang::prelude::*;
use instructions::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mama_m {
    use super::*;
    pub fn initialize_exchange(ctx: Context<InitializeExchange>) -> ProgramResult {
        initialize_exchange::handle(ctx)
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
