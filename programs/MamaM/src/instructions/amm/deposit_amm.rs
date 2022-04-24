use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_spl::token::{self, Transfer};

use crate::instructions::state::{Amm, Exchange};

#[derive(Accounts)]
pub struct DepositAmm<'info> {
    #[account(mut)]
    pub exchange: Account<'info, Exchange>,

    #[account(mut)]
    pub amm: Account<'info, Amm>,

    #[account(mut)]
    pub vault_1: AccountInfo<'info>,

    #[account(mut)]
    pub vault_2: AccountInfo<'info>,

    #[account(mut)]
    pub user_token_1: AccountInfo<'info>,

    #[account(mut)]
    pub user_token_2: AccountInfo<'info>,

    #[account(mut, signer)]
    pub user: AccountInfo<'info>,

    #[account(address = token::ID)]
    pub token_program: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> DepositAmm<'info> {
    fn transfer_context_1(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        CpiContext::new(
            self.token_program.clone(),
            Transfer {
                from: self.user_token_1.clone(),
                to: self.vault_1.clone(),
                authority: self.user.clone(),
            },
        )
    }
    fn transfer_context_2(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        CpiContext::new(
            self.token_program.clone(),
            Transfer {
                from: self.user_token_2.clone(),
                to: self.vault_2.clone(),
                authority: self.user.clone(),
            },
        )
    }
}

pub fn handle(ctx: Context<DepositAmm>, value_1: u64, value_2: u64) -> ProgramResult {
    let exchange = &mut ctx.accounts.exchange;
    let amm = &mut ctx.accounts.amm;

    if value_1 > 0 {
        let transfer_context = ctx.accounts.transfer_context_1();

        token::transfer(transfer_context, value_1)?;
    }

    if value_2 > 0 {
        let transfer_context = ctx.accounts.transfer_context_2();

        token::transfer(transfer_context, value_2)?;
    }

    Ok(())
}
