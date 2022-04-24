import { AMM } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import updatePrice from "../instructions/updatePrice";

initializeContext(loadWalletFromEnv()).then((context) => {
    updatePrice(context, AMM).then((res) => {
        console.log(res);
    });
});