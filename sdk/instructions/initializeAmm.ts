import Context from "../types/context";
import * as anchor from "@project-serum/anchor";
import {
    Keypair,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    TransactionSignature
} from "@solana/web3.js";
import { BTC, BTC_ORACLE, SERUM_DEX_PROGRAM_ID, USDC, USDC_ORACLE } from "../constants";
import { initializeAccount, TOKEN_PROGRAM_ID } from "@project-serum/serum/lib/token-instructions";
import { MARKET_STATE_LAYOUT_V3 } from "@project-serum/serum";
import { AccountLayout, MintLayout } from "@solana/spl-token";
import { deriveVaultNonce, getMinimumRentBalances } from "./initializeMarket";

// Data lengths for different accounts on the market
const ACCOUNT_LAYOUT_DATA_LENGTH = AccountLayout.span;

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

        let minimumRentBalances = await getMinimumRentBalances(context);

        let vaultSignerNonce = await deriveVaultNonce(marketAddress, SERUM_DEX_PROGRAM_ID);

        await initializeAccountsWithLayouts(
            context,
            minimumRentBalances,
            vault1,
            vault2,
            BTC,
            USDC,
            vaultSignerNonce[0],
        );


        // Add your test here.
        context.program.rpc.initializeAmm(
            bump,
            new anchor.BN(length),
            new anchor.BN(time_granularity),
            new anchor.BN(range),
            {
                accounts: {
                    exchange: exchange,
                    amm: amm,
                    vault1: vault1.publicKey,
                    vault2: vault2.publicKey,
                    market: marketAddress,
                    oracle1: BTC_ORACLE,
                    oracle2: USDC_ORACLE,
                    payer: context.provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY
                }
            }).then((res) => {
                console.log("amm: ", amm.toString());
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}


function initializeAccountsWithLayouts(context: Context,
    rentBalances: { [space: string]: number },
    vault1: Keypair,
    vault2: Keypair,
    mint1: PublicKey,
    mint2: PublicKey,
    vaultOwner: PublicKey,
): Promise<void> {
    return new Promise((resolve, reject) => {
        // Create the market account with the appropriate layouts
        let marketTransaction = new Transaction();
        marketTransaction.add(
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: vault1.publicKey,
                lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
                space: ACCOUNT_LAYOUT_DATA_LENGTH,
                programId: TOKEN_PROGRAM_ID
            }),
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: vault2.publicKey,
                lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
                space: ACCOUNT_LAYOUT_DATA_LENGTH,
                programId: TOKEN_PROGRAM_ID
            }),
            initializeAccount(
                {
                    account: vault1.publicKey,
                    mint: mint1,
                    owner: vaultOwner,
                }
            ),
            initializeAccount(
                {
                    account: vault2.publicKey,
                    mint: mint2,
                    owner: vaultOwner,
                }
            ),
        )
        context.provider.send(marketTransaction,
            [
                vault1,
                vault2,
            ]).then((res) => {
                console.log(res);
                resolve()
            }).catch((err) => reject(err))
    })
}