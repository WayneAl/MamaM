"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerumMarket = void 0;
var serum_1 = require("@project-serum/serum");
var constants_1 = require("../constants");
function getSerumMarket(context, marketAddress) {
    return serum_1.Market.load(context.connection, marketAddress, {}, constants_1.SERUM_DEX_PROGRAM_ID);
}
exports.getSerumMarket = getSerumMarket;
