use crate::utils::{get_serum_market_auth_pda, PREFIX_SERUM_MARKET_AUTH};
use anchor_lang::{prelude::*, AnchorDeserialize};
use serum_dex::instruction::init_open_orders;
use serum_dex::state::OpenOrders;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::invoke_signed;

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitUserOnMarket<'info> {
    pub exchange: AccountInfo<'info>,

    #[account(init,
            seeds = [
                "serum_open_orders".as_bytes(),
                exchange.key().as_ref(),
                serum_market.key().as_ref(),
                user.key().as_ref(),
            ],
            bump,
            payer = user,
            owner = serum_dex_program_id.key(),
            space = std::mem::size_of::<OpenOrders>() + 12,
            )] // TODO: figure out skip rent_exempt ???
    pub serum_open_orders: AccountInfo<'info>,

    pub serum_market: AccountInfo<'info>,

    /// serum market authority which is required when init open orders if it is Some()
    pub serum_market_authority: AccountInfo<'info>,

    pub serum_dex_program_id: AccountInfo<'info>,

    #[account(mut, signer)]
    pub user: AccountInfo<'info>,

    pub system_program: AccountInfo<'info>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<InitUserOnMarket>, _bump: u8) -> ProgramResult {
    let open_orders = &ctx.accounts.serum_open_orders;
    let serum_market = &ctx.accounts.serum_market;
    let serum_market_authority = &ctx.accounts.serum_market_authority;
    let serum_dex_program_id = &ctx.accounts.serum_dex_program_id;
    let exchange = &ctx.accounts.exchange;
    let rent = &ctx.accounts.rent.to_account_info();
    let user = &ctx.accounts.user;

    let init_open_orders_ix = init_open_orders(
        serum_dex_program_id.key,
        &open_orders.key,
        &user.key(),
        &serum_market.key,
        Some(serum_market_authority.key),
    )?;

    let (_, bump) = get_serum_market_auth_pda(&exchange.key(), ctx.program_id);
    msg!("Created init_open_orders instruction");
    invoke_signed(
        &init_open_orders_ix,
        &[
            open_orders.clone(),
            user.clone(),
            serum_market.clone(),
            rent.clone(),
            serum_market_authority.clone(),
            serum_dex_program_id.clone(),
        ],
        &[&[
            PREFIX_SERUM_MARKET_AUTH.as_bytes(),
            exchange.key().as_ref(),
            &[bump],
        ]],
    )?;

    Ok(())
}
