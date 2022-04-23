use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use pyth_client::PriceConf;

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    // #[account(mut)]
    // pub amm: Account<'info, Amm>,
    pub oracle_1: AccountInfo<'info>,

    pub oracle_2: AccountInfo<'info>,
}

pub fn handle(ctx: Context<UpdatePrice>) -> ProgramResult {
    let price_1 = {
        let oracle_data = ctx.accounts.oracle_1.try_borrow_data()?;
        let price_account = pyth_client::load_price(&oracle_data).unwrap();

        let price: PriceConf = price_account.get_current_price().unwrap();
        msg!(
            "price: ({} +- {}) x 10^{}",
            price.price,
            price.conf,
            price.expo
        );
        price.price
    };
    let price_2 = {
        let oracle_data = ctx.accounts.oracle_2.try_borrow_data()?;
        let price_account = pyth_client::load_price(&oracle_data).unwrap();

        let price: PriceConf = price_account.get_current_price().unwrap();
        msg!(
            "price: ({} +- {}) x 10^{}",
            price.price,
            price.conf,
            price.expo
        );
        price.price
    };

    let price = price_1 as f32 / price_2 as f32;

    msg!("price {}", price);

    Ok(())
}
