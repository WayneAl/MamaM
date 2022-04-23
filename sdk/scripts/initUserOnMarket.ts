import { PublicKey } from "@solana/web3.js";
import { initializeContext, loadWalletFromEnv } from "..";
import initUserOnMarket from "../instructions/initUserOnMarket";


let marketAddress = new PublicKey("G87i1dcw9hnni4RBRJEkTn8pP1xK699tmZqrNUCgWNUe");

initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initUserOnMarket(context, marketAddress).then((res) => {
        console.log(res);
    });
});