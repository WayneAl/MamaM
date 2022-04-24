import * as anchor from "@project-serum/anchor";
import { Connection, Keypair } from "@solana/web3.js";
import { SolanaEndpoint } from "../constants";
import { MamamIDL } from "./mamam-types";
export default interface Context {
    program: anchor.Program<MamamIDL>;
    endpoint: SolanaEndpoint;
    connection: Connection;
    provider: anchor.Provider;
    walletKeypair?: Keypair;
}
