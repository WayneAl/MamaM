use crate::instructions::state::Amm;
use crate::utils::{get_amm_pda, get_serum_market_auth_pda, PREFIX_SERUM_MARKET_AUTH};
use anchor_lang::{prelude::*, AnchorDeserialize};
use serum_dex::instruction::init_open_orders;
use serum_dex::state::OpenOrders;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::invoke_signed;

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitAmmOnMarket<'info> {
    pub exchange: AccountInfo<'info>,

    #[account(init,
            seeds = [
                "serum_open_orders".as_bytes(),
                exchange.key().as_ref(),
                serum_market.key().as_ref(),
                amm.key().as_ref(),
            ],
            bump,
            payer = payer,
            owner = serum_dex_program_id.key(),
            space = std::mem::size_of::<OpenOrders>() + 12,
        )]
    pub serum_open_orders: AccountInfo<'info>,

    pub serum_market: AccountInfo<'info>,

    pub serum_market_authority: AccountInfo<'info>,

    pub serum_dex_program_id: AccountInfo<'info>,

    pub amm: Account<'info, Amm>,

    #[account(mut, signer)]
    pub payer: AccountInfo<'info>,

    pub system_program: AccountInfo<'info>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<InitAmmOnMarket>, _bump: u8) -> ProgramResult {
    let open_orders = &ctx.accounts.serum_open_orders;
    let serum_market = &ctx.accounts.serum_market;
    let serum_market_authority = &ctx.accounts.serum_market_authority;
    let serum_dex_program_id = &ctx.accounts.serum_dex_program_id;
    let exchange = &ctx.accounts.exchange;
    let rent = &ctx.accounts.rent.to_account_info();
    let amm = &ctx.accounts.amm;

    let init_open_orders_ix = init_open_orders(
        serum_dex_program_id.key,
        &open_orders.key,
        &amm.key(),
        &serum_market.key,
        Some(serum_market_authority.key),
    )?;

    let (_, bump) = get_serum_market_auth_pda(&exchange.key(), ctx.program_id);
    msg!("Created init_open_orders instruction");

    let length: u64 = amm.length;
    let time_granularity: u64 = amm.time_granularity;
    let range: u64 = amm.range;
    let config_str = length.to_string() + &time_granularity.to_string() + &range.to_string();

    let (amm_pda, bump2) = get_amm_pda(serum_market.key, ctx.program_id, config_str.clone());

    assert_eq!(amm_pda, amm.key());

    invoke_signed(
        &init_open_orders_ix,
        &[
            open_orders.clone(),
            amm.to_account_info(),
            serum_market.clone(),
            rent.clone(),
            serum_market_authority.clone(),
            serum_dex_program_id.clone(),
        ],
        &[
            &[
                "Amm".as_bytes(),
                serum_market.key().as_ref(),
                config_str.as_bytes(),
                &[bump2],
            ],
            &[
                PREFIX_SERUM_MARKET_AUTH.as_bytes(),
                exchange.key().as_ref(),
                &[bump],
            ],
        ],
    )?;

    Ok(())
}
