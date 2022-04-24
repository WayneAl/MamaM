"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var initializeContext_1 = __importDefault(require("../initializeContext"));
var initializeContext_2 = require("../initializeContext");
var placeOrder_1 = __importDefault(require("../instructions/placeOrder"));
var side = 0; // Bid = 0, Ask = 1,
var price = 1000;
var size = 1;
(0, initializeContext_1.default)((0, initializeContext_2.loadWalletFromEnv)()).then(function (context) {
    // console.log(context);
    (0, placeOrder_1.default)(context, constants_1.MARKET, side, price, size).then(function (res) {
        console.log(res);
    });
});
