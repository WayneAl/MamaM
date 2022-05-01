import { AMM } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import depositAmm from "../instructions/depositAmm";


let value1 = 100000 * (10 ** 9);
let value2 = 100000 * (10 ** 9);


initializeContext(loadWalletFromEnv()).then((context) => {
    depositAmm(context, AMM, value1, value2).then((res) => {
        console.log(res);
    });
});