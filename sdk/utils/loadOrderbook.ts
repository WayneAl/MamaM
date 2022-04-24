import { PublicKey } from "@solana/web3.js";
import Context from "../types/context";
import { getSerumMarket } from "./serum";


export default function loadOrderbook(
    context: Context,
    marketAddress: PublicKey
): Promise<number[][][]> {
    return new Promise(async (resolve, reject) => {

        getSerumMarket(context, marketAddress).then(async (serumMarket) => {
            console.log("Got serum market ", marketAddress);

            let bids = await serumMarket.loadBids(context.connection);
            let bidsList: number[][] = bids.getL2(10).map((bid) =>
                [bid[0], bid[1]]
            );
            console.log("bids: ", bidsList);

            let asks = await serumMarket.loadAsks(context.connection);
            let asksList: number[][] = asks.getL2(10).map((bid) =>
                [bid[0], bid[1]]
            );
            console.log("asks: ", asksList);

            resolve([bidsList, asksList])
        })
    })
}