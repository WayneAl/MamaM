pub use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_lang::{prelude::*, solana_program::program::invoke};
use serum_dex::error::DexError;
use serum_dex::error::DexError::ProgramError;
use serum_dex::instruction::initialize_market;
use solana_program::program_error::ProgramError as SolanaProgramError;
use std::error::Error;

use crate::instructions::state::MarketData;
use crate::utils::get_serum_market_auth_pda;

use super::state::{AssetData, Exchange};

#[derive(Accounts)]
#[instruction(bump:u8)]
pub struct InitializeMarket<'info> {
    #[account(mut)]
    pub exchange: Account<'info, Exchange>,
    #[account(mut)]
    pub market: AccountInfo<'info>,
    pub coin_mint_pk: AccountInfo<'info>,
    pub pc_mint_pk: AccountInfo<'info>,
    #[account(mut)]
    pub coin_vault_pk: AccountInfo<'info>,
    #[account(mut)]
    pub pc_vault_pk: AccountInfo<'info>,
    #[account(mut, signer)]
    pub bids_pk: AccountInfo<'info>,
    #[account(mut, signer)]
    pub asks_pk: AccountInfo<'info>,
    #[account(mut, signer)]
    pub req_q_pk: AccountInfo<'info>,
    #[account(mut, signer)]
    pub event_q_pk: AccountInfo<'info>,
    pub serum_market_authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    pub serum_dex_program: AccountInfo<'info>,
}

#[derive(Default, AnchorSerialize, AnchorDeserialize)]
pub struct SerumData {
    coin_lot_size: u64,
    pc_lot_size: u64,
    vault_signer_nonce: u64,
    pc_dust_threshold: u64,
}

pub fn handle(
    ctx: Context<InitializeMarket>,
    serum_data: SerumData,
    asset_data_1: AssetData,
    asset_data_2: AssetData,
) -> ProgramResult {
    let exchange = &mut ctx.accounts.exchange;
    let market = &ctx.accounts.market;
    let coin_mint_pk = &ctx.accounts.coin_mint_pk;
    let pc_mint_pk = &ctx.accounts.pc_mint_pk;
    let coin_vault_pk = &ctx.accounts.coin_vault_pk;
    let pc_vault_pk = &ctx.accounts.pc_vault_pk;
    let bids_pk = &ctx.accounts.bids_pk;
    let asks_pk = &ctx.accounts.asks_pk;
    let req_q_pk = &ctx.accounts.req_q_pk;
    let event_q_pk = &ctx.accounts.event_q_pk;
    let serum_dex_program = &ctx.accounts.serum_dex_program;
    let rent = &ctx.accounts.rent.to_account_info();
    let serum_market_authority = &ctx.accounts.serum_market_authority;

    let (market_auth, _bump) = get_serum_market_auth_pda(&exchange.key(), ctx.program_id);

    let ix_res = initialize_market(
        market.key,
        serum_dex_program.key,
        coin_mint_pk.key,
        pc_mint_pk.key,
        coin_vault_pk.key,
        pc_vault_pk.key,
        Some(&market_auth),
        Some(&market_auth),
        None,
        bids_pk.key,
        asks_pk.key,
        req_q_pk.key,
        event_q_pk.key,
        serum_data.coin_lot_size,
        serum_data.pc_lot_size,
        serum_data.vault_signer_nonce,
        serum_data.pc_dust_threshold,
    );

    if ix_res.is_err() {
        msg!("Got error trying to form market creation instruction");
        let err: DexError = ix_res.expect_err("Ix res wasn't error");
        match err {
            ProgramError(i) => {
                msg!("{} was program error", i);
            }
            DexError::ErrorCode(i) => {
                msg!("Code was {}", i);
                let source = i.source();
                match source {
                    None => {
                        msg!("Couldn't resolve source of error")
                    }
                    Some(e) => {
                        msg!("Got source {} of error", e);
                    }
                }
            }
        }
        return Err(SolanaProgramError::Custom(1));
    }
    let init_serum_market_ix = ix_res?;

    msg!("Ix was valid, Calling the serum dex program to initialize a market");
    invoke(
        &init_serum_market_ix,
        &[
            market.clone(),
            req_q_pk.clone(),
            event_q_pk.clone(),
            bids_pk.clone(),
            asks_pk.clone(),
            coin_vault_pk.clone(),
            pc_vault_pk.clone(),
            coin_mint_pk.clone(),
            pc_mint_pk.clone(),
            rent.clone(),
            serum_market_authority.clone(),
            serum_market_authority.clone(),
            serum_dex_program.clone(),
        ],
    )?;
    msg!("serum market initialized successfully");

    let pair_name = format!("{:?}/{:?}", asset_data_1.symbol, asset_data_2.symbol);

    let market_data = MarketData {
        address: market.key(),
        pair_name,
        asset_1: asset_data_1,
        asset_2: asset_data_2,
    };

    exchange.markets.push(market_data);

    Ok(())
}
