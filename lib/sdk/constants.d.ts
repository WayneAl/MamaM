import { PublicKey } from "@solana/web3.js";
export declare enum SolanaEndpoint {
    Mainnet = "https://api.mainnet-beta.solana.com",
    Devnet = "https://api.devnet.solana.com",
    Testnet = "https://api.testnet.solana.com"
}
export declare const COIN_LOT_SIZE: number;
export declare const PC_LOT_SIZE: number;
export declare const PC_DUST_THRESHOLD: number;
export declare const ProgramID: PublicKey;
export declare const SERUM_DEX_PROGRAM_ID: PublicKey;
export declare const BTC: PublicKey;
export declare const USDC: PublicKey;
export declare const BTC_ORACLE: PublicKey;
export declare const USDC_ORACLE: PublicKey;
