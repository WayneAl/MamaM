use anchor_lang::prelude::*;

pub const PREFIX_SERUM_MARKET_AUTH: &str = "serum_market_auth";

/// get serum market and prune authority pda
pub fn get_serum_market_auth_pda(exchange: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[PREFIX_SERUM_MARKET_AUTH.as_bytes(), exchange.as_ref()],
        program_id,
    )
}
