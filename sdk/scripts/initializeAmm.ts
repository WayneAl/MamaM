import { MARKET } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import initializeAmm from "../instructions/initializeAmm";

let length = 21;
let time_granularity = 30;
let range = 0.001 * (10 ** 6);

initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initializeAmm(context,
        MARKET,
        length,
        time_granularity,
        range
    ).then((res) => {
        console.log(res);
    });
});