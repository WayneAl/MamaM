import { initializeContext, loadWalletFromEnv } from "..";
import initializeMarket from "../instructions/initializeMarket";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initializeMarket(context).then((res) => {
        console.log(res);
    });
});