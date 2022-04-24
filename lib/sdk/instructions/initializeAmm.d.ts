import Context from "../types/context";
import { PublicKey, TransactionSignature } from "@solana/web3.js";
export default function initializeAmm(context: Context, marketAddress: PublicKey, length: number, time_granularity: number, range: number): Promise<TransactionSignature>;
