import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";
import { BTC_ORACLE, USDC_ORACLE } from "../constants";

export default function updatePrice(context: Context): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {

        // Add your test here.
        context.program.rpc.updatePrice(
            {
                accounts: {
                    oracle1: BTC_ORACLE,
                    oracle2: USDC_ORACLE
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}