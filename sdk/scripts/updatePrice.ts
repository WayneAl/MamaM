import { PublicKey } from "@solana/web3.js";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import updatePrice from "../instructions/updatePrice";

let amm = new PublicKey("2QKLsMS6JGJ4CqP4SrrcugmvX52sV9ZvrdRBjpKPgvpm");

initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    updatePrice(context, amm).then((res) => {
        console.log(res);
    });
});