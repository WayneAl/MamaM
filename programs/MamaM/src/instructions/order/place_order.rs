use std::convert::TryFrom;

use crate::instructions::order::serum_utils::serum_new_order_with_client_order_id;
use crate::utils::{get_serum_market_auth_pda, PREFIX_SERUM_MARKET_AUTH};
use crate::Exchange;
use anchor_lang::prelude::*;
use anchor_spl::token;
use serum_dex::matching::{OrderType, Side};
use solana_program::entrypoint::ProgramResult;

/// Accounts used to place orders on the DEX
#[derive(Accounts, Clone)]
pub struct PlaceOrderContext<'info> {
    pub exchange: Account<'info, Exchange>,

    #[account(signer)]
    pub user: AccountInfo<'info>,

    /// the serum market(orderbook)
    #[account(mut)]
    pub market: AccountInfo<'info>,

    /// the user's open orders account
    #[account(mut)]
    pub open_orders: AccountInfo<'info>,

    // pub open_orders_owner: AccountInfo<'info>,
    #[account(mut)]
    pub request_queue: AccountInfo<'info>,

    #[account(mut)]
    pub event_queue: AccountInfo<'info>,

    #[account(mut)]
    pub bids: AccountInfo<'info>,

    #[account(mut)]
    pub asks: AccountInfo<'info>,

    /// The vault for the "base" currency
    #[account(mut)]
    pub coin_vault: AccountInfo<'info>,

    /// The vault for the "quote" currency
    #[account(mut)]
    pub pc_vault: AccountInfo<'info>,

    pub serum_dex_program_id: AccountInfo<'info>,

    #[account(address = token::ID)]
    pub token_program: AccountInfo<'info>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(
    ctx: Context<PlaceOrderContext>,
    side: u8,
    limit: u64,
    max_coin_qty: u64,
    max_pc_qty: u64,
) -> ProgramResult {
    let exchange = &ctx.accounts.exchange;
    let user = &ctx.accounts.user;
    let market = &ctx.accounts.market;
    let open_orders = &ctx.accounts.open_orders;
    let request_queue = &ctx.accounts.request_queue;
    let event_queue = &ctx.accounts.event_queue;
    let market_bids = &ctx.accounts.bids;
    let market_asks = &ctx.accounts.asks;
    let coin_vault = &ctx.accounts.coin_vault;
    let pc_vault = &ctx.accounts.pc_vault;
    let token_program = &ctx.accounts.token_program;
    let rent = &ctx.accounts.rent.to_account_info();
    let dex_program = &ctx.accounts.serum_dex_program_id;

    // order_payer account should be usdc vault(margin account) if order is Bid
    // and long token vault for
    let order_type = OrderType::Limit;

    let now = Clock::get().unwrap().unix_timestamp as u64;

    let exchange_key = exchange.clone().key();
    let (_market_auth, bump) = get_serum_market_auth_pda(&exchange_key, ctx.program_id);
    let signer_seeds: &[&[&[u8]]] = &[&[
        PREFIX_SERUM_MARKET_AUTH.as_bytes(),
        exchange_key.as_ref(),
        &[bump],
    ]];

    let client_order_id = now;

    let side = Side::try_from(side).unwrap();

    serum_new_order_with_client_order_id(
        signer_seeds,
        market,
        open_orders,
        request_queue,
        event_queue,
        market_bids,
        market_asks,
        user,
        user,
        coin_vault,
        pc_vault,
        token_program,
        rent,
        dex_program,
        side,
        limit,
        max_coin_qty,
        order_type,
        client_order_id,
        max_pc_qty,
    )?;

    Ok(())
}
