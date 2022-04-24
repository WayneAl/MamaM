import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";
import { BTC_ORACLE, USDC_ORACLE } from "../constants";

export default function updatePrice(context: Context, amm: PublicKey): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {

        let [exchange,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        context.program.rpc.updatePrice(
            {
                accounts: {
                    exchange: exchange,
                    amm: amm,
                    oracle1: BTC_ORACLE,
                    oracle2: USDC_ORACLE
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}