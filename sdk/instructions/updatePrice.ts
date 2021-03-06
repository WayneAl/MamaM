import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";
import { BTC_ORACLE, SERUM_DEX_PROGRAM_ID, USDC_ORACLE } from "../constants";
import { getSerumMarket } from "../utils/serum";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export default function updatePrice(context: Context, amm: PublicKey): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {

        let [exchange,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        let ammAccount = await context.program.account.amm.fetch(amm);

        let marketAddress = ammAccount.marketAddress;

        let serumMarket = await getSerumMarket(context, marketAddress);


        let [serumOpenOrders,] = await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("serum_open_orders"),
                exchange.toBuffer(),
                marketAddress.toBuffer(),
                amm.toBuffer()
            ],
            context.program.programId
        );

        let [authorityAddress,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("serum_market_auth"), exchange.toBuffer()],
            context.program.programId
        );

        // console.log("serumOpenOrders", serumOpenOrders.toString());
        // console.log("ammAccount.vault1", ammAccount.vault1.toString());
        // console.log("ammAccount.vault2", ammAccount.vault2.toString());

        context.program.rpc.updatePrice(
            {
                accounts: {
                    exchange: exchange,
                    amm: amm,
                    oracle1: BTC_ORACLE,
                    oracle2: USDC_ORACLE,
                    vault1: ammAccount.vault1,
                    vault2: ammAccount.vault2,
                    market:
                        marketAddress,
                    openOrders:
                        serumOpenOrders,
                    requestQueue:
                        serumMarket.decoded
                            .requestQueue,
                    eventQueue:
                        serumMarket.decoded
                            .eventQueue,
                    bids: serumMarket.bidsAddress,
                    asks: serumMarket.asksAddress,
                    coinVault:
                        serumMarket.decoded
                            .baseVault,
                    pcVault:
                        serumMarket.decoded
                            .quoteVault,
                    pruneAuthority: authorityAddress,
                    serumDexProgramId: SERUM_DEX_PROGRAM_ID,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    rent: SYSVAR_RENT_PUBKEY
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}