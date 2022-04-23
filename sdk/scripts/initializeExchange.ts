import { initializeContext, loadWalletFromEnv } from "..";
import initializeExchange from "../instructions/initializeExchange";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initializeExchange(context).then((res) => {
        console.log(res);
    });
});