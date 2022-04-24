import { MARKET } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import loadOrderbook from "../utils/loadOrderbook";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    loadOrderbook(context, MARKET).then((res) => {
        console.log(res);
    });
});