import { PublicKey } from "@solana/web3.js";
import { initializeContext, loadWalletFromEnv } from "..";
import placeOrder from "../instructions/placeOrder";


let marketAddress = new PublicKey("G87i1dcw9hnni4RBRJEkTn8pP1xK699tmZqrNUCgWNUe");

let side = 0; // Bid = 0, Ask = 1,
let price = 1000;
let size = 1;

initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    placeOrder(context, marketAddress, side, price, size).then((res) => {
        console.log(res);
    });
});