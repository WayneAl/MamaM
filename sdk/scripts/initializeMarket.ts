import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import initializeMarket from "../instructions/initializeMarket";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initializeMarket(context).then((res) => {
        console.log(res);
    });
});