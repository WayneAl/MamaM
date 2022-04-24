import Context from "../types/context";
import { PublicKey, TransactionSignature } from "@solana/web3.js";
export default function updatePrice(context: Context, amm: PublicKey): Promise<TransactionSignature>;
