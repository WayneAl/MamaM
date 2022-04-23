use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use pyth_client::Price;

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    pub oracle: Account<'info, Price>, //TODO: get oracle data from Pyth
}

pub fn handle(ctx: Context<UpdatePrice>) -> ProgramResult {
    Ok(())
}
