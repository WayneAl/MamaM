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

export const ProgramID = new PublicKey("3HGwuAEzU8vtqZasvKsYWF34cdw7j4y3AbtWJo1BrN19");

export const SERUM_DEX_PROGRAM_ID = new PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY");

export const BTC_ORACLE = new PublicKey("HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J");
export const USDC_ORACLE = new PublicKey("5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7");

// Temp Path

// Decimals 9
export const BTC = new PublicKey("8Kq8uW5HQ7Ge2zhyYns9k1yMNaHy6tfWfFJPjhqxgTVE");
export const USDC = new PublicKey("GTc2YHEFLW7ZgGxBtSCMMGXK9RDJHA6q5YWPdSjU9fsM");


export const MARKET = new PublicKey("FrYYFp9d6pGkkavEKTT3YwJnUBX3Qiqjr1iSuHKR6pqe");

export const AMM = new PublicKey("BQoCy88UDqfKaeQo6TzyL5BfePHmqfE51QAQ2dkybFZY");