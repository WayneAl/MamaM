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
import { COIN_LOT_SIZE, PC_LOT_SIZE, PC_DUST_THRESHOLD, ProgramID, SERUM_DEX_PROGRAM_ID, USDC, BTC } from "../constants";
import { Symbol } from "../types/mamam-types";
import { AccountLayout, MintLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { MARKET_STATE_LAYOUT_V3 } from "@project-serum/serum";
import { initializeAccount } from "@project-serum/serum/lib/token-instructions";


// Data lengths for different accounts on the market
const REQUEST_QUEUE_DATA_LENGTH = 5132;
const EVENT_QUEUE_DATA_LENGTH = 262156;
const BIDS_DATA_LENGTH = 65548;
const ASKS_DATA_LENGTH = 65548;
const MARKET_DATA_LENGTH = MARKET_STATE_LAYOUT_V3.span;
const ACCOUNT_LAYOUT_DATA_LENGTH = AccountLayout.span;
const MINT_DATA_LENGTH = MintLayout.span;

/**
 * Helper function to do the requests to get the different balance exemptions for the different
 * data length constants at runtime
 */
export function getMinimumRentBalances(context: Context): Promise<{ [size: string]: number }> {
    return new Promise((resolve, reject) => {
        let exemptionBalances: { [size: number]: number } = {};
        Promise.all([
            REQUEST_QUEUE_DATA_LENGTH,
            EVENT_QUEUE_DATA_LENGTH,
            BIDS_DATA_LENGTH,
            ASKS_DATA_LENGTH,
            MARKET_DATA_LENGTH,
            MINT_DATA_LENGTH,
            ACCOUNT_LAYOUT_DATA_LENGTH
        ].map((size) => new Promise((resolve, reject) => {
            try {
                context.connection.getMinimumBalanceForRentExemption(size)
                    .then((res) => {
                        exemptionBalances[size] = res;
                        resolve(res);
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(err);
                    })
            } catch (e) {
                console.error(e);
                reject(e);
            }
        }))).then(() => {
            resolve(exemptionBalances);
        }).catch((err) => reject(err));
    })
}

function initializeAccountsWithLayouts1(context: Context,
    rentBalances: { [space: string]: number },
    marketAccount: Keypair,
    coinVaultAccount: Keypair,
    pcVaultAccount: Keypair,
    pcMintAccount: PublicKey,
    coinMintAccount: PublicKey,
    vaultOwner: PublicKey,
): Promise<void> {
    return new Promise((resolve, reject) => {
        // Create the market account with the appropriate layouts
        let marketTransaction = new Transaction();
        marketTransaction.add(
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: marketAccount.publicKey,
                space: MARKET_DATA_LENGTH,
                lamports: rentBalances[MARKET_DATA_LENGTH],
                programId: SERUM_DEX_PROGRAM_ID
            }),
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: coinVaultAccount.publicKey,
                lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
                space: ACCOUNT_LAYOUT_DATA_LENGTH,
                programId: TOKEN_PROGRAM_ID
            }),
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: pcVaultAccount.publicKey,
                lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
                space: ACCOUNT_LAYOUT_DATA_LENGTH,
                programId: TOKEN_PROGRAM_ID
            }),
            initializeAccount(
                {
                    account: coinVaultAccount.publicKey,
                    mint: coinMintAccount,
                    owner: vaultOwner,
                }
            ),
            initializeAccount(
                {
                    account: pcVaultAccount.publicKey,
                    mint: pcMintAccount,
                    owner: vaultOwner,
                }
            ),
        )
        context.provider.send(marketTransaction,
            [
                coinVaultAccount,
                pcVaultAccount,
                marketAccount,
            ]).then((res) => {
                console.log(res);
                resolve()
            }).catch((err) => reject(err))
    })
}

function initializeAccountsWithLayouts2(context: Context,
    rentBalances: { [space: string]: number },
    requestQueueAccount: Keypair,
    eventQueueAccount: Keypair,
    asksAccount: Keypair,
    bidsAccount: Keypair,
): Promise<void> {
    return new Promise((resolve, reject) => {
        // Create the market account with the appropriate layouts
        let marketTransaction = new Transaction();
        marketTransaction.add(
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: requestQueueAccount.publicKey,
                space: REQUEST_QUEUE_DATA_LENGTH,
                lamports: rentBalances[REQUEST_QUEUE_DATA_LENGTH],
                programId: SERUM_DEX_PROGRAM_ID
            }),
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: eventQueueAccount.publicKey,
                space: EVENT_QUEUE_DATA_LENGTH,
                lamports: rentBalances[EVENT_QUEUE_DATA_LENGTH],
                programId: SERUM_DEX_PROGRAM_ID
            }),
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: bidsAccount.publicKey,
                space: BIDS_DATA_LENGTH,
                lamports: rentBalances[BIDS_DATA_LENGTH],
                programId: SERUM_DEX_PROGRAM_ID,
            }),
            SystemProgram.createAccount({
                fromPubkey: context.provider.wallet.publicKey,
                newAccountPubkey: asksAccount.publicKey,
                space: ASKS_DATA_LENGTH,
                lamports: rentBalances[ASKS_DATA_LENGTH],
                programId: SERUM_DEX_PROGRAM_ID
            })
        )
        context.provider.send(marketTransaction,
            [
                requestQueueAccount,
                eventQueueAccount,
                asksAccount,
                bidsAccount,
            ]).then((res) => {
                console.log(res);
                resolve()
            }).catch((err) => reject(err))
    })
}


export function deriveVaultNonce(
    marketKey: PublicKey,
    dexProgramId: PublicKey,
    nonceS: number = 0
): Promise<[anchor.web3.PublicKey, anchor.BN]> {
    return new Promise((resolve, reject) => {
        const nonce = new anchor.BN(nonceS);
        if (nonceS > 255) {
            reject(new Error("Unable to find nonce"));
        }
        const tryNext = () => {
            deriveVaultNonce(
                marketKey,
                dexProgramId,
                nonceS + 1
            )
                .then((res) => resolve(res))
                .catch((err) => reject(err))
        }
        try {
            PublicKey.createProgramAddress([marketKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 8)],
                dexProgramId).then((vaultOwner) => {
                    // console.log("Returning vault ", vaultOwner, nonce);
                    resolve([vaultOwner, nonce])
                }).catch((err) => {
                    tryNext();
                })
        } catch (e) {
            tryNext();
        }
    })
}



export default function initializeMarket(context: Context): Promise<TransactionSignature> {

    return new Promise(async (resolve, reject) => {
        let [exchange, bump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("MamaM")],
            context.program.programId
        )

        // Create the new accounts necessary for the serum market
        let marketAccount = anchor.web3.Keypair.generate();
        let pcVaultAccount = anchor.web3.Keypair.generate();
        let coinVaultAccount = anchor.web3.Keypair.generate();
        let bidsAccount = anchor.web3.Keypair.generate();
        let asksAccount = anchor.web3.Keypair.generate();
        let requestQueueAccount = anchor.web3.Keypair.generate();
        let eventQueueAccount = anchor.web3.Keypair.generate();

        let vaultSignerNonce = await deriveVaultNonce(marketAccount.publicKey, SERUM_DEX_PROGRAM_ID);
        let minimumRentBalances = await getMinimumRentBalances(context);


        let [authorityAddress,] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("serum_market_auth"), exchange.toBuffer()],
            context.program.programId
        );

        await initializeAccountsWithLayouts1(
            context,
            minimumRentBalances,
            marketAccount,
            coinVaultAccount,
            pcVaultAccount,
            USDC,
            BTC,
            vaultSignerNonce[0],
        );
        await initializeAccountsWithLayouts2(
            context,
            minimumRentBalances,
            requestQueueAccount,
            eventQueueAccount,
            asksAccount,
            bidsAccount,
        );
        // console.log("exchange", exchange.toString());
        // console.log("marketAccount.publicKey", marketAccount.publicKey.toString());
        // console.log("BTC", BTC.toString());
        // console.log("USDC", USDC.toString());
        // console.log("coinVaultAccount.publicKey", coinVaultAccount.publicKey.toString());
        // console.log("pcVaultAccount.publicKey", pcVaultAccount.publicKey.toString());
        // console.log("bidsAccount.publicKey", bidsAccount.publicKey.toString());
        // console.log("asksAccount.publicKey", asksAccount.publicKey.toString());
        // console.log("requestQueueAccount.publicKey", requestQueueAccount.publicKey.toString());
        // console.log("eventQueueAccount.publicKey", eventQueueAccount.publicKey.toString());
        // console.log("authorityAddress", authorityAddress.toString());

        // Add your test here.
        context.program.rpc.initializeMarket(
            vaultSignerNonce[1],
            {
                accounts: {
                    exchange: exchange,
                    market: marketAccount.publicKey,
                    coinMintPk: BTC,
                    pcMintPk: USDC,
                    coinVaultPk: coinVaultAccount.publicKey,
                    pcVaultPk: pcVaultAccount.publicKey,
                    bidsPk: bidsAccount.publicKey,
                    asksPk: asksAccount.publicKey,
                    reqQPk: requestQueueAccount.publicKey,
                    eventQPk: eventQueueAccount.publicKey,
                    serumMarketAuthority: authorityAddress,
                    systemProgram: SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY,
                    serumDexProgram: SERUM_DEX_PROGRAM_ID,
                },
            }).then((res) => {
                console.log("market: ", marketAccount.publicKey.toString());
                resolve(res as TransactionSignature)
            }).catch((err) => reject(err))

    });
}