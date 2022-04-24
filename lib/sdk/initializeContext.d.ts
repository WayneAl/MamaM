import * as anchor from "@project-serum/anchor";
import Context from "./types/context";
import { SolanaEndpoint } from "./constants";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
export declare function loadWalletFromEnv(): anchor.Wallet;
export default function initializeContext(wallet: Wallet, endpoint?: SolanaEndpoint): Promise<Context>;
