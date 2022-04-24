import { MARKET } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import initUserOnMarket from "../instructions/initUserOnMarket";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initUserOnMarket(context, MARKET).then((res) => {
        console.log(res);
    });
});