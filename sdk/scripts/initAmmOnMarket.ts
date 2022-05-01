import { AMM, MARKET } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import initAmmOnMarket from "../instructions/initAmmOnMarket";


initializeContext(loadWalletFromEnv()).then((context) => {
    // console.log(context);
    initAmmOnMarket(context, AMM, MARKET).then((res) => {
        console.log(res);
    });
});