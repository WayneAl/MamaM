import { PublicKey } from "@solana/web3.js";
import { MARKET } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import placeOrder from "../instructions/placeOrder";


let side = 0; // Bid = 0, Ask = 1,
let price = 1000;
let size = 1;

initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    placeOrder(context, MARKET, side, price, size).then((res) => {
        console.log(res);
    });
});