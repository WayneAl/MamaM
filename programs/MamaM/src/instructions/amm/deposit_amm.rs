use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use crate::instructions::state::{Amm, EmaConfig, Exchange};

#[derive(Accounts)]
pub struct DepositAmm<'info> {
    #[account(mut)]
    pub exchange: Account<'info, Exchange>,

    #[account(mut)]
    pub amm: Account<'info, Amm>,

    pub vault_1: AccountInfo<'info>,
    pub vault_2: AccountInfo<'info>,

    #[account(mut, signer)]
    pub payer: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handle(ctx: Context<DepositAmm>, value_1: u64, value_2: u64) -> ProgramResult {
    let exchange = &mut ctx.accounts.exchange;
    let amm = &mut ctx.accounts.amm;

    Ok(())
}
