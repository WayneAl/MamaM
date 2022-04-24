use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use crate::instructions::state::{Amm, Exchange};

#[derive(Accounts)]
#[instruction(
    bump:u8,
    length: u64,
    time_granularity: u64,
    range: u64
)]
pub struct InitializeAmm<'info> {
    #[account(mut)]
    pub exchange: Account<'info, Exchange>,

    #[account(init,
        seeds=[
            "Amm".as_bytes(),
            market.key().as_ref(),
            (length.to_string() + &time_granularity.to_string() + &range.to_string()).as_bytes()
            ],
        payer=payer,
        bump,
        space = std::mem::size_of::<Amm>() + 256
    )]
    pub amm: Account<'info, Amm>,

    pub vault_1: AccountInfo<'info>,
    pub vault_2: AccountInfo<'info>,

    pub market: AccountInfo<'info>,

    pub oracle_1: AccountInfo<'info>,
    pub oracle_2: AccountInfo<'info>,

    #[account(mut, signer)]
    pub payer: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(
    ctx: Context<InitializeAmm>,
    _bump: u8,
    length: u64,
    time_granularity: u64,
    range: u64,
) -> ProgramResult {
    let exchange = &mut ctx.accounts.exchange;
    let amm = &mut ctx.accounts.amm;

    amm.length = length;
    amm.time_granularity = time_granularity;
    amm.range = range;

    amm.timestamp = Clock::get().unwrap().unix_timestamp as u64;

    Ok(())
}
