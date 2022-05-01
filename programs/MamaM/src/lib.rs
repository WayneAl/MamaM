mod constants;
mod errors;
mod instructions;
mod macros;
mod utils;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("3HGwuAEzU8vtqZasvKsYWF34cdw7j4y3AbtWJo1BrN19");

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

    pub fn init_user_on_market(ctx: Context<InitUserOnMarket>, bump: u8) -> ProgramResult {
        init_user_on_market::handle(ctx, bump)
    }

    // Order
    pub fn place_order(
        ctx: Context<PlaceOrderContext>,
        side: u8,
        limit: u64,
        max_coin_qty: u64,
        max_pc_qty: u64,
    ) -> ProgramResult {
        place_order::handle(ctx, side, limit, max_coin_qty, max_pc_qty)
    }

    // AMM
    pub fn initialize_amm(
        ctx: Context<InitializeAmm>,
        bump: u8,
        length: u64,
        time_granularity: u64,
        range: u64,
    ) -> ProgramResult {
        amm::initialize_amm::handle(ctx, bump, length, time_granularity, range)
    }

    pub fn init_amm_on_market(ctx: Context<InitAmmOnMarket>, bump: u8) -> ProgramResult {
        init_amm_on_market::handle(ctx, bump)
    }

    pub fn deposit_amm(ctx: Context<DepositAmm>, value_1: u64, value_2: u64) -> ProgramResult {
        amm::deposit_amm::handle(ctx, value_1, value_2)
    }

    pub fn update_price(ctx: Context<UpdatePrice>) -> ProgramResult {
        amm::update_price::handle(ctx)
    }
}
