use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use super::state::Exchange;

#[derive(Accounts)]
#[instruction(bump:u8)]
pub struct InitializeExchange<'info> {
    #[account(init,
         seeds=["MamaM".as_bytes()], payer=payer, bump, space=10240)]
    pub exchange: Account<'info, Exchange>,

    #[account(mut, signer)]
    pub payer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<InitializeExchange>, _bump: u8) -> ProgramResult {
    let exchange = &mut ctx.accounts.exchange;

    exchange.authority = ctx.accounts.payer.key();

    msg!("exchange is initialized successfully");

    Ok(())
}
