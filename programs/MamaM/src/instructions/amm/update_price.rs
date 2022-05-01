use crate::instructions::order::serum_utils::serum_prune_orders_for_user;
use crate::{serum_new_order_with_client_order_id, u_to_f_repr};
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_spl::token;
use pyth_client::PriceConf;
use serum_dex::matching::{OrderType, Side};
use std::convert::TryFrom;

use crate::f_to_u_repr;
use crate::instructions::state::{Amm, Exchange};
use crate::utils::{get_amm_pda, get_serum_market_auth_pda, PREFIX_SERUM_MARKET_AUTH};

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    #[account(mut)]
    pub exchange: Account<'info, Exchange>,

    #[account(mut)]
    pub amm: Account<'info, Amm>,

    pub oracle_1: AccountInfo<'info>,
    pub oracle_2: AccountInfo<'info>,

    #[account(mut)]
    pub vault_1: AccountInfo<'info>,
    #[account(mut)]
    pub vault_2: AccountInfo<'info>,

    #[account(mut)]
    pub market: AccountInfo<'info>,
    #[account(mut)]
    pub open_orders: AccountInfo<'info>,
    #[account(mut)]
    pub request_queue: AccountInfo<'info>,
    #[account(mut)]
    pub event_queue: AccountInfo<'info>,
    #[account(mut)]
    pub bids: AccountInfo<'info>,
    #[account(mut)]
    pub asks: AccountInfo<'info>,
    #[account(mut)]
    pub coin_vault: AccountInfo<'info>,
    #[account(mut)]
    pub pc_vault: AccountInfo<'info>,
    pub prune_authority: AccountInfo<'info>,
    pub serum_dex_program_id: AccountInfo<'info>,
    #[account(address = token::ID)]
    pub token_program: AccountInfo<'info>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<UpdatePrice>) -> ProgramResult {
    let amm = &mut ctx.accounts.amm;

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
        // let oracle_data = ctx.accounts.oracle_2.try_borrow_data()?;
        // let price_account = pyth_client::load_price(&oracle_data).unwrap();

        // let price: PriceConf = price_account.get_current_price().unwrap();
        // msg!(
        //     "price: ({} +- {}) x 10^{}",
        //     price.price,
        //     price.conf,
        //     price.expo
        // );
        // price.price
        100000000
    };

    let price = price_1 as f32 / price_2 as f32;

    let ema: f32 = amm.ema_next(price);

    amm.ema = f_to_u_repr!(ema);

    msg!("price {}  ema {}", price, ema);

    // Update orders
    let exchange = &ctx.accounts.exchange;
    let market = &ctx.accounts.market;
    let open_orders = &ctx.accounts.open_orders;
    let request_queue = &ctx.accounts.request_queue;
    let event_queue = &ctx.accounts.event_queue;
    let market_bids = &ctx.accounts.bids;
    let market_asks = &ctx.accounts.asks;
    let coin_vault = &ctx.accounts.coin_vault;
    let pc_vault = &ctx.accounts.pc_vault;
    let prune_authority = &ctx.accounts.prune_authority;
    let token_program = &ctx.accounts.token_program;
    let rent = &ctx.accounts.rent.to_account_info();
    let dex_program = &ctx.accounts.serum_dex_program_id;
    let vault_1 = &ctx.accounts.vault_1;
    let vault_2 = &ctx.accounts.vault_2;

    let order_type = OrderType::PostOnly;

    let now = Clock::get().unwrap().unix_timestamp as u64;

    let exchange_key = exchange.clone().key();

    let (_market_auth, bump) = get_serum_market_auth_pda(&exchange_key, ctx.program_id);

    let length: u64 = amm.length;
    let time_granularity: u64 = amm.time_granularity;
    let range: u64 = amm.range;
    let config_str = length.to_string() + &time_granularity.to_string() + &range.to_string();
    let market_key = market.key();
    let (amm_pda, bump2) = get_amm_pda(&market_key, ctx.program_id, config_str.clone());

    assert_eq!(amm_pda, amm.key());

    // Prune previous orders
    for _ in 0..2 {
        serum_prune_orders_for_user(
            dex_program,
            market,
            market_bids,
            market_asks,
            prune_authority,
            open_orders,
            &amm.to_account_info(),
            event_queue,
            &ctx.program_id,
            &exchange.key(),
        )?;
    }

    // Place new orders

    let signer_seeds: &[&[&[u8]]] = &[
        &[
            "Amm".as_bytes(),
            market_key.as_ref(),
            config_str.as_bytes(),
            &[bump2],
        ],
        &[
            PREFIX_SERUM_MARKET_AUTH.as_bytes(),
            exchange_key.as_ref(),
            &[bump],
        ],
    ];

    let range = u_to_f_repr!(amm.range);
    // Update Bid
    {
        let client_order_id = now;
        let side = Side::try_from(0).unwrap();
        let limit = ema * (1.0 - range);
        let max_coin_qty = 10_u64.pow(9);
        let max_pc_qty = (limit * max_coin_qty as f32) as u64;

        serum_new_order_with_client_order_id(
            signer_seeds,
            market,
            open_orders,
            request_queue,
            event_queue,
            market_bids,
            market_asks,
            vault_2,
            &ctx.accounts.amm.to_account_info(),
            coin_vault,
            pc_vault,
            token_program,
            rent,
            dex_program,
            side,
            limit as u64,
            max_coin_qty,
            order_type,
            client_order_id,
            max_pc_qty,
        )?;
    }

    // Update Ask
    {
        let client_order_id = now;
        let side = Side::try_from(1).unwrap();
        let limit = ema * (1.0 + range);
        let max_coin_qty = 10_u64.pow(9);
        let max_pc_qty = (limit * max_coin_qty as f32) as u64;

        serum_new_order_with_client_order_id(
            signer_seeds,
            market,
            open_orders,
            request_queue,
            event_queue,
            market_bids,
            market_asks,
            vault_1,
            &ctx.accounts.amm.to_account_info(),
            coin_vault,
            pc_vault,
            token_program,
            rent,
            dex_program,
            side,
            limit as u64,
            max_coin_qty,
            order_type,
            client_order_id,
            max_pc_qty,
        )?;
    }

    Ok(())
}
