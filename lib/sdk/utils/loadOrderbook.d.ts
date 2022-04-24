import { PublicKey } from "@solana/web3.js";
import Context from "../types/context";
export default function loadOrderbook(context: Context, marketAddress: PublicKey): Promise<number[][][]>;
