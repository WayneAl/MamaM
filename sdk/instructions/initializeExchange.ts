import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";

export default function initializeExchange(context: Context): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {
        let [exchange, bump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        // Add your test here.
        context.program.rpc.initializeExchange(
            bump,
            {
                accounts: {
                    exchange: exchange,
                    payer: context.provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}