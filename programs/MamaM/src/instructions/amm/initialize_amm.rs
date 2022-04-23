use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use crate::instructions::state::{Amm, EmaConfig, Exchange};

#[derive(Accounts)]
#[instruction(bump:u8, config: EmaConfig)]
pub struct InitializeAmm<'info> {
    #[account(mut)]
    pub exchange: Account<'info, Exchange>,

    #[account(init,
        seeds=[
            "Amm".as_bytes(),
            market.key().as_ref(),
            config.to_string().as_bytes()
            ],
        payer=payer,
        bump,
        space = std::mem::size_of::<Amm>() + 256
    )]
    pub amm: Account<'info, Amm>,

    pub market: AccountInfo<'info>,

    #[account(mut, signer)]
    pub payer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<InitializeAmm>, _bump: u8, config: EmaConfig) -> ProgramResult {
    let exchange = &mut ctx.accounts.exchange;
    let amm = &mut ctx.accounts.amm;

    Ok(())
}
