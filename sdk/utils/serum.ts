import Context from "../types/context";
import { PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";
import { SERUM_DEX_PROGRAM_ID } from "../constants";

export function getSerumMarket(context: Context, marketAddress: PublicKey): Promise<Market> {
    return Market.load(context.connection, marketAddress, {}, SERUM_DEX_PROGRAM_ID)
}