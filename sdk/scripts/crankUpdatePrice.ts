import { AMM } from "../constants";
import initializeContext from "../initializeContext";
import { loadWalletFromEnv } from "../initializeContext";
import updatePrice from "../instructions/updatePrice";
import Context from "../types/context";
import { sleep } from "../utils/generic";

initializeContext(loadWalletFromEnv()).then((context) => {
    updatePriceLoop(context)
});

const updatePriceLoop = async (context: Context) => {
    try {
        updatePrice(context, AMM).then((res) => {
            console.log(res);
        });
    } catch (e) {
        await sleep(60000);
    }
    await sleep(10000);

    await updatePriceLoop(context);
}
