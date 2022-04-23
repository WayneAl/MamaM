import { PublicKey } from "@solana/web3.js";

export enum SolanaEndpoint {
    Mainnet = "https://api.mainnet-beta.solana.com",
    Devnet = "https://api.devnet.solana.com",
    Testnet = "https://api.testnet.solana.com"
}

// Serum market constants
export const COIN_LOT_SIZE: number = 1;
export const PC_LOT_SIZE: number = 1;
export const PC_DUST_THRESHOLD: number = 2;

export const ProgramID = new PublicKey("AYNnLtb3oTu9KWLuiaGzDQs4NKmUqJ73FP8w4rg5e3zP");

export const SERUM_DEX_PROGRAM_ID = new PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY");

export const BTC = new PublicKey("8Kq8uW5HQ7Ge2zhyYns9k1yMNaHy6tfWfFJPjhqxgTVE");
export const USDC = new PublicKey("GTc2YHEFLW7ZgGxBtSCMMGXK9RDJHA6q5YWPdSjU9fsM");
export const BTC_ORACLE = new PublicKey("HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J");
export const USDC_ORACLE = new PublicKey("5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7");