import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";
import { BTC_ORACLE, USDC_ORACLE } from "../constants";

export default function initializeAmm(
    context: Context,
    marketAddress: PublicKey,
    length: number,
    time_granularity: number,
    range: number

): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {
        let [exchange,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        let configString = length.toString() + time_granularity.toString() + range.toString();

        let [amm, bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("Amm"),
                marketAddress.toBuffer(),
                Buffer.from(configString),
            ],
            context.program.programId
        )

        let vault1 = anchor.web3.Keypair.generate();
        let vault2 = anchor.web3.Keypair.generate();

        // Add your test here.
        context.program.rpc.initializeAmm(
            bump,
            {
                accounts: {
                    exchange: exchange,
                    amm: amm,
                    vault1: vault1,
                    vault2: vault2,
                    market: marketAddress,
                    oracle1: BTC_ORACLE,
                    oracle2: USDC_ORACLE,
                    payer: context.provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}