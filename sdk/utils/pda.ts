import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import Context from "../types/context";
import * as anchor from "@project-serum/anchor";

export function findAssociatedTokenAccount(context: Context,
    tokenMintAddress: PublicKey,
    owner?: PublicKey): Promise<[PublicKey, number]> {
    let accountOwner = owner || context.provider.wallet.publicKey;
    return anchor.web3.PublicKey.findProgramAddress(
        [
            accountOwner.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMintAddress.toBuffer(),
        ],
        new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
    )
}