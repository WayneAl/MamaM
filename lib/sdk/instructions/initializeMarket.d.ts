import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import { PublicKey, TransactionSignature } from "@solana/web3.js";
/**
 * Helper function to do the requests to get the different balance exemptions for the different
 * data length constants at runtime
 */
export declare function getMinimumRentBalances(context: Context): Promise<{
    [size: string]: number;
}>;
export declare function deriveVaultNonce(marketKey: PublicKey, dexProgramId: PublicKey, nonceS?: number): Promise<[anchor.web3.PublicKey, anchor.BN]>;
export default function initializeMarket(context: Context): Promise<TransactionSignature>;
