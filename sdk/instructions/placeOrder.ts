import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    PublicKey,
    SYSVAR_RENT_PUBKEY,
    TransactionSignature
} from "@solana/web3.js";
import { BTC, SERUM_DEX_PROGRAM_ID, USDC } from "../constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getSerumMarket } from "../utils/serum";
import { findAssociatedTokenAccount } from "../utils/pda";

export default function placeOrder(context: Context,
    marketAddress: PublicKey,
    side: number,
    price: number,
    size: number
): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {
        let [exchange, bump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        let limit = price;

        let maxCoinQty = size * (10 ** 9);

        let maxPcQty = limit * maxCoinQty;

        let serumMarket = await getSerumMarket(context, marketAddress);

        let [serumOpenOrders,] = await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("serum_open_orders"),
                exchange.toBuffer(),
                marketAddress.toBuffer(),
                context.provider.wallet.publicKey.toBuffer()
            ],
            context.program.programId
        );

        let token = await getTokenMint(side);

        let [orderPayer,] = await findAssociatedTokenAccount(
            context, token
        );

        // Add your test here.
        context.program.rpc.placeOrder(
            new anchor.BN(side),
            new anchor.BN(limit),
            new anchor.BN(maxCoinQty),
            new anchor.BN(maxPcQty),
            {
                accounts: {
                    exchange: exchange,
                    user: context.provider.wallet.publicKey,
                    orderPayer: orderPayer,
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
                    serumDexProgramId: SERUM_DEX_PROGRAM_ID,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    rent: SYSVAR_RENT_PUBKEY
                }
            }).then((res) => {
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}

export function getTokenMint(
    side: number,
): Promise<PublicKey> {
    return new Promise(async (resolve, reject) => {
        if (side == 0) {
            resolve(USDC)
        }
        else if (side == 1) {
            resolve(BTC)
        };
    })
}