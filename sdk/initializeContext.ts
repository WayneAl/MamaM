import * as anchor from "@project-serum/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import Context from "./types/context";
import { ProgramID, SolanaEndpoint } from "./constants";
import { readJsonFile } from './utils/generic';
import { MamamIDL } from './types/mamam-types';
import Mamam from '../target/idl/mamam.json';
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";

require('dotenv').config();

export function loadWalletFromEnv(): anchor.Wallet {
    let wallet = process.env["WALLET"] as string;
    let keypair = Keypair.fromSecretKey(new Uint8Array(readJsonFile<any>(wallet)));
    return new anchor.Wallet(keypair);
}

export default function initializeContext(
    wallet: Wallet,
    endpoint: SolanaEndpoint = SolanaEndpoint.Devnet
): Promise<Context> {
    return new Promise((resolve, reject) => {
        const connection = new Connection(endpoint);
        const provider = new anchor.Provider(connection,
            wallet,
            anchor.Provider.defaultOptions());

        const program = new anchor.Program(Mamam as unknown as MamamIDL,
            ProgramID,
            provider);


        resolve({
            program: program,
            provider: provider,
            endpoint: endpoint,
            connection: connection,
        })

    })
}