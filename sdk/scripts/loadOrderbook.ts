import { PublicKey } from "@solana/web3.js";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import loadOrderbook from "../utils/loadOrderbook";


let marketAddress = new PublicKey("G87i1dcw9hnni4RBRJEkTn8pP1xK699tmZqrNUCgWNUe");

initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    loadOrderbook(context, marketAddress).then((res) => {
        console.log(res);
    });
});