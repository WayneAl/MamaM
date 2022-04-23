import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";
import { SERUM_DEX_PROGRAM_ID } from "../constants";

export default function initUserOnMarket(
    context: Context,
    marketAddress: PublicKey
): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {
        let [exchange,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        let [authorityAddress,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("serum_market_auth"), exchange.toBuffer()],
            context.program.programId
        );

        let [serumOpenOrders, bump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("serum_open_orders"),
                exchange.toBuffer(),
                marketAddress.toBuffer(),
                context.provider.wallet.publicKey.toBuffer()
            ],
            context.program.programId
        );

        context.program.rpc.initUserOnMarket(
            bump,
            {
                accounts: {
                    exchange: exchange,
                    serumOpenOrders: serumOpenOrders,
                    serumMarket: marketAddress,
                    serumMarketAuthority: authorityAddress,
                    serumDexProgramId: SERUM_DEX_PROGRAM_ID,
                    user: context.provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}