import Context from "../types/context";
import { PublicKey, TransactionSignature } from "@solana/web3.js";
export default function initUserOnMarket(context: Context, marketAddress: PublicKey): Promise<TransactionSignature>;
