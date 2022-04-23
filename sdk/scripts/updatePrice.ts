import { initializeContext, loadWalletFromEnv } from "..";
import updatePrice from "../instructions/updatePrice";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    updatePrice(context).then((res) => {
        console.log(res);
    });
});