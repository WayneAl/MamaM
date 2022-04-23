import { PublicKey } from "@solana/web3.js";

export enum SolanaEndpoint {
    Mainnet = "https://api.mainnet-beta.solana.com",
    Devnet = "https://api.devnet.solana.com",
    Testnet = "https://api.testnet.solana.com"
}


export const ProgramID = new PublicKey("9458qWTEKJxEWTCaFTCrz4w3HdgT8LxRpHieGRLXSnwQ");