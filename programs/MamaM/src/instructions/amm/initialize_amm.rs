use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use super::state::Exchange;

#[derive(Accounts)]
#[instruction(bump:u8)]
pub struct InitializeAmm<'info> {
    #[account(mut)]
    pub exchange: Account<'info, Exchange>,

    #[account(init,
        seeds=["MamaM".as_bytes(),"Amm".as_bytes()],
        payer=payer,
        bump,
        space = std::mem::size_of::<Amm>() + 256
    )]
    pub amm: Account<'info, Amm>,

    pub authority: AccountInfo<'info>,

    #[account(mut, signer)]
    pub payer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<InitializeAmm>) -> ProgramResult {
    let exchange = &mut ctx.accounts.exchange;

    exchange.authority = ctx.accounts.authority.key();

    msg!("exchange is initialized successfully");

    Ok(())
}
