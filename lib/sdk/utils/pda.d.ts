import { PublicKey } from "@solana/web3.js";
import Context from "../types/context";
export declare function findAssociatedTokenAccount(context: Context, tokenMintAddress: PublicKey, owner?: PublicKey): Promise<[PublicKey, number]>;
