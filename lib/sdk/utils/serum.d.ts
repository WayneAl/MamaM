import Context from "../types/context";
import { PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";
export declare function getSerumMarket(context: Context, marketAddress: PublicKey): Promise<Market>;
