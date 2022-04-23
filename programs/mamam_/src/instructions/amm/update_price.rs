use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    pub oracle: AccountInfo<'info>, //TODO: get oracle data from Pyth
}

pub fn handle(ctx: Context<UpdatePrice>) -> ProgramResult {
    let oracle_data = ctx.accounts.oracle.try_borrow_data()?;
    let price_account = pyth_client::load_price(&oracle_data).unwrap();

    Ok(())
}
