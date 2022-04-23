use crate::utils::{get_serum_market_auth_pda, PREFIX_SERUM_MARKET_AUTH};
use anchor_lang::{prelude::*, solana_program::program::invoke_signed};
use serum_dex::critbit::{LeafNode, Slab, SlabView};
use serum_dex::instruction::{
    cancel_order, cancel_order_by_client_order_id, consume_events, match_orders, new_order, prune,
    settle_funds, SelfTradeBehavior,
};
use serum_dex::matching::{OrderType, Side};
use serum_dex::state::OpenOrders;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::invoke;
use std::cell::RefMut;
use std::num::NonZeroU64;
use std::ops::DerefMut;

pub fn serum_new_order_with_client_order_id<'info>(
    signers_seeds: &[&[&[u8]]],
    serum_market: &AccountInfo<'info>,
    open_orders_account: &AccountInfo<'info>,
    request_queue: &AccountInfo<'info>,
    event_queue: &AccountInfo<'info>,
    market_bids: &AccountInfo<'info>,
    market_asks: &AccountInfo<'info>,
    order_payer: &AccountInfo<'info>,
    open_orders_account_owner: &AccountInfo<'info>,
    coin_vault: &AccountInfo<'info>,
    pc_vault: &AccountInfo<'info>,
    token_program: &AccountInfo<'info>,
    rent: &AccountInfo<'info>,
    dex_program: &AccountInfo<'info>,
    side: Side,
    limit_price: u64,
    max_coin_qty: u64,
    order_type: OrderType,
    client_order_id: u64,
    max_pc_qty: u64,
) -> ProgramResult {
    let new_order_ix = new_order(
        serum_market.key,
        open_orders_account.key,
        request_queue.key,
        event_queue.key,
        market_bids.key,
        market_asks.key,
        order_payer.key,
        open_orders_account_owner.key,
        coin_vault.key,
        pc_vault.key,
        token_program.key,
        rent.key,
        None, // SRM ATA for the open_orders_account_owner
        dex_program.key,
        side,
        NonZeroU64::new(limit_price).unwrap(),
        NonZeroU64::new(max_coin_qty).unwrap(),
        order_type,
        client_order_id, // Also not sure about this one, client_order_id - Jet has this as a constant 0, so we'll try that.
        SelfTradeBehavior::AbortTransaction,
        65535,
        NonZeroU64::new(max_pc_qty).unwrap(),
        i64::MAX,
    )?;
    msg!(
        "Created new order instruction, side: {:?}, price: {}, size: {}, value: {}, order_type: {:?}, client_order_id: {}",
        side,
        limit_price,
        max_coin_qty,
        max_pc_qty,
        order_type,
        client_order_id
    );
    invoke_signed(
        &new_order_ix,
        &[
            serum_market.clone(),
            open_orders_account.clone(),
            request_queue.clone(),
            event_queue.clone(),
            market_bids.clone(),
            market_asks.clone(),
            order_payer.clone(),
            open_orders_account_owner.clone(),
            coin_vault.clone(),
            pc_vault.clone(),
            token_program.clone(),
            rent.clone(),
            dex_program.clone(),
        ],
        signers_seeds,
    )
}

pub fn serum_match_order<'info>(
    serum_market: &AccountInfo<'info>,
    request_queue: &AccountInfo<'info>,
    event_queue: &AccountInfo<'info>,
    market_bids: &AccountInfo<'info>,
    market_asks: &AccountInfo<'info>,
    dex_program: &AccountInfo<'info>,
    coin_fee_receivable_account: &AccountInfo<'info>,
    pc_fee_receivable_account: &AccountInfo<'info>,
) -> ProgramResult {
    let match_orders_ix = match_orders(
        dex_program.key,
        serum_market.key,
        request_queue.key,
        market_bids.key,
        market_asks.key,
        event_queue.key,
        coin_fee_receivable_account.key,
        pc_fee_receivable_account.key,
        2,
    )?;

    invoke(
        &match_orders_ix,
        &[
            dex_program.clone(),
            serum_market.clone(),
            request_queue.clone(),
            market_bids.clone(),
            market_asks.clone(),
            event_queue.clone(),
            coin_fee_receivable_account.clone(),
            pc_fee_receivable_account.clone(),
        ],
    )
}

pub fn serum_consume_events<'info>(
    open_orders_account: &AccountInfo<'info>,
    serum_market: &AccountInfo<'info>,
    event_queue: &AccountInfo<'info>,
    dex_program: &AccountInfo<'info>,
    coin_fee_receivable_account: &AccountInfo<'info>,
    pc_fee_receivable_account: &AccountInfo<'info>,
) -> ProgramResult {
    let consume_events_ix = consume_events(
        dex_program.key,
        vec![open_orders_account.key],
        serum_market.key,
        event_queue.key,
        coin_fee_receivable_account.key,
        pc_fee_receivable_account.key,
        1024,
    )?;

    invoke(
        &consume_events_ix,
        &[
            dex_program.clone(),
            open_orders_account.clone(),
            serum_market.clone(),
            event_queue.clone(),
            coin_fee_receivable_account.clone(),
            pc_fee_receivable_account.clone(),
        ],
    )
}

pub fn serum_cancel_order_with_client_order_id<'info>(
    signers_seeds: &[&[&[u8]]],
    dex_program: &AccountInfo<'info>,
    serum_market: &AccountInfo<'info>,
    market_bids: &AccountInfo<'info>,
    market_asks: &AccountInfo<'info>,
    open_orders_account: &AccountInfo<'info>,
    open_orders_account_owner: &AccountInfo<'info>,
    event_queue: &AccountInfo<'info>,
    side: Side,
    client_order_id: u64,
) -> ProgramResult {
    let cancel_order_ix = cancel_order_by_client_order_id(
        dex_program.key,
        serum_market.key,
        market_bids.key,
        market_asks.key,
        open_orders_account.key,
        open_orders_account_owner.key,
        event_queue.key,
        client_order_id,
    )?;
    msg!("Created cancel order instruction, invoking...");

    invoke_signed(
        &cancel_order_ix,
        &[
            dex_program.clone(),
            serum_market.clone(),
            market_bids.clone(),
            market_asks.clone(),
            open_orders_account.clone(),
            open_orders_account_owner.clone(),
            event_queue.clone(),
        ],
        signers_seeds,
    )
}

pub fn serum_cancel_order<'info>(
    signers_seeds: &[&[u8]],
    dex_program: &AccountInfo<'info>,
    serum_market: &AccountInfo<'info>,
    market_bids: &AccountInfo<'info>,
    market_asks: &AccountInfo<'info>,
    open_orders_account: &AccountInfo<'info>,
    open_orders_account_owner: &AccountInfo<'info>,
    event_queue: &AccountInfo<'info>,
    side: Side,
    order_id: u128,
) -> ProgramResult {
    let cancel_order_ix = cancel_order(
        dex_program.key,
        serum_market.key,
        market_bids.key,
        market_asks.key,
        open_orders_account.key,
        open_orders_account_owner.key,
        event_queue.key,
        side,
        order_id,
    )?;
    // msg!("Created cancel order instruction, invoking...");

    invoke_signed(
        &cancel_order_ix,
        &[
            dex_program.clone(),
            serum_market.clone(),
            market_bids.clone(),
            market_asks.clone(),
            open_orders_account.clone(),
            open_orders_account_owner.clone(),
            event_queue.clone(),
        ],
        &[&signers_seeds],
    )
}

pub fn serum_settle_funds_for_user<'info>(
    // user: &Pubkey,
    signers_seeds: &[&[u8]],
    dex_program: &AccountInfo<'info>,
    serum_market: &AccountInfo<'info>,
    token_program: &AccountInfo<'info>,
    open_orders_account: &AccountInfo<'info>,
    open_orders_account_owner: &AccountInfo<'info>,
    // open_orders_account_owner_bump: u8,
    coin_vault: &AccountInfo<'info>,
    coin_wallet: &AccountInfo<'info>,
    pc_vault: &AccountInfo<'info>,
    pc_wallet: &AccountInfo<'info>,
    vault_signer: &AccountInfo<'info>,
    program_id: &Pubkey,
    // exchange: &Pubkey,
) -> ProgramResult {
    let settle_funds_ix = settle_funds(
        dex_program.key,
        serum_market.key,
        token_program.key,
        open_orders_account.key,
        open_orders_account_owner.key,
        coin_vault.key,
        coin_wallet.key,
        pc_vault.key,
        pc_wallet.key,
        Some(pc_wallet.key), // Some(&Pubkey::from_str(REFERRAL_USDC).unwrap())
        vault_signer.key,
    )?;
    // msg!("Created settle funds instruction");

    invoke_signed(
        &settle_funds_ix,
        &[
            dex_program.clone(),
            serum_market.clone(),
            token_program.clone(),
            open_orders_account.clone(),
            open_orders_account_owner.clone(),
            coin_vault.clone(),
            coin_wallet.clone(),
            pc_vault.clone(),
            pc_wallet.clone(),
            vault_signer.clone(),
        ],
        // &[&[
        //     PREFIX_USER_ACCOUNT.as_bytes(),
        //     exchange.key().as_ref(),
        //     user.key().as_ref(),
        //     &[open_orders_account_owner_bump],
        // ]],
        &[&signers_seeds],
    )
}

/// 0. `[writable]` market
/// 1. `[writable]` bids
/// 2. `[writable]` asks
/// 3. `[signer]` prune authority
/// 4. `[]` open orders.
/// 5. `[]` open orders owner.
/// 6. `[writable]` event queue.
pub fn serum_prune_orders_for_user<'info>(
    dex_program: &AccountInfo<'info>,
    serum_market: &AccountInfo<'info>,
    bids: &AccountInfo<'info>,
    asks: &AccountInfo<'info>,
    prune_authority: &AccountInfo<'info>,
    open_orders_account: &AccountInfo<'info>,
    open_orders_account_owner: &AccountInfo<'info>,
    open_orders_account_owner_bump: u8,
    event_queue: &AccountInfo<'info>,
    program_id: &Pubkey,
    exchange: &Pubkey,
) -> ProgramResult {
    let settle_funds_ix = prune(
        dex_program.key,
        serum_market.key,
        bids.key,
        asks.key,
        prune_authority.key,
        open_orders_account.key,
        open_orders_account_owner.key,
        event_queue.key,
        10, // u16::MAX,
    )?;
    // msg!("Created prune orders instruction");

    let (_serum_prune_auth, bump) = get_serum_market_auth_pda(exchange, program_id);

    invoke_signed(
        &settle_funds_ix,
        &[
            dex_program.clone(),
            serum_market.clone(),
            bids.clone(),
            asks.clone(),
            prune_authority.clone(),
            open_orders_account.clone(),
            open_orders_account_owner.clone(),
            event_queue.clone(),
        ],
        &[&[
            PREFIX_SERUM_MARKET_AUTH.as_bytes(),
            exchange.key().as_ref(),
            &[bump],
        ]],
    )
}

/// find the slot of the given client order id in open orders
pub fn find_slot_for_client_order_id(
    open_orders: &RefMut<OpenOrders>,
    client_order_id: u64,
) -> Option<usize> {
    if client_order_id == 0 {
        None
    } else {
        open_orders
            .client_order_ids
            .iter()
            .position(|&r| r == client_order_id)
    }
}

/// find the leaf node of the given client order id
pub fn find_node_by_client_order_id(
    open_orders: &RefMut<OpenOrders>,
    slab: &mut RefMut<Slab>,
    client_order_id: u64,
) -> Option<LeafNode> {
    if client_order_id == 0 {
        None
    } else if let Some(slot) = open_orders
        .client_order_ids
        .iter()
        .position(|&r| r == client_order_id)
    {
        msg!("cp3 - slot: {:?}", slot);

        let order_id = open_orders.orders[slot];

        msg!("cp4 - order_id: {:?}", order_id);

        if let Some(key) = slab.find_by_key(order_id) {
            let node = slab.deref_mut().get(key).unwrap().as_leaf().unwrap();
            return Some(*node);
        } else {
            None
        }
    } else {
        None
    }
}
