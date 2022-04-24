import Context from "../types/context";
import { PublicKey, TransactionSignature } from "@solana/web3.js";
export default function placeOrder(context: Context, marketAddress: PublicKey, side: number, price: number, size: number): Promise<TransactionSignature>;
export declare function getTokenMint(side: number): Promise<PublicKey>;
