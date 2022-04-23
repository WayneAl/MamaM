use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use pyth_client::PriceConf;

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    pub oracle: AccountInfo<'info>, //TODO: get oracle data from Pyth
}

pub fn handle(ctx: Context<UpdatePrice>) -> ProgramResult {
    let oracle_data = ctx.accounts.oracle.try_borrow_data()?;
    let price_account = pyth_client::load_price(&oracle_data).unwrap();

    let price: PriceConf = price_account.get_current_price().unwrap();
    println!(
        "price: ({} +- {}) x 10^{}",
        price.price, price.conf, price.expo
    );

    Ok(())
}
