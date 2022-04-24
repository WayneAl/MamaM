import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";
import { BTC, BTC_ORACLE, USDC, USDC_ORACLE } from "../constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { findAssociatedTokenAccount } from "../utils/pda";

export default function depositAmm(
    context: Context,
    amm: PublicKey,
    value1: number,
    value2: number,
): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {

        let [exchange,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        let ammAccount = await context.program.account.amm.fetch(amm);

        let [userToken1,] = await findAssociatedTokenAccount(
            context, BTC
        );

        let [userToken2,] = await findAssociatedTokenAccount(
            context, USDC
        );

        context.program.rpc.depositAmm(
            new anchor.BN(value1),
            new anchor.BN(value2),
            {
                accounts: {
                    exchange: exchange,
                    amm: amm,
                    vault1: ammAccount.vault1,
                    vault2: ammAccount.vault2,
                    userToken1: userToken1,
                    userToken2: userToken2,
                    user: context.provider.wallet.publicKey,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}