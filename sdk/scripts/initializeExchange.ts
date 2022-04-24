import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import initializeExchange from "../instructions/initializeExchange";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initializeExchange(context).then((res) => {
        console.log(res);
    });
});