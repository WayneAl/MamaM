import { PublicKey } from "@solana/web3.js";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import initializeAmm from "../instructions/initializeAmm";

let marketAddress = new PublicKey("G87i1dcw9hnni4RBRJEkTn8pP1xK699tmZqrNUCgWNUe");

let length = 20;
let time_granularity = 30;
let range = 0.001 * (10 ** 6);

initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initializeAmm(context,
        marketAddress,
        length,
        time_granularity,
        range
    ).then((res) => {
        console.log(res);
    });
});