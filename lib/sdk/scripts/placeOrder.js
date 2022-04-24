"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var initializeContext_1 = __importDefault(require("../initializeContext"));
var initializeContext_2 = require("../initializeContext");
var placeOrder_1 = __importDefault(require("../instructions/placeOrder"));
var marketAddress = new web3_js_1.PublicKey("G87i1dcw9hnni4RBRJEkTn8pP1xK699tmZqrNUCgWNUe");
var side = 0; // Bid = 0, Ask = 1,
var price = 1000;
var size = 1;
(0, initializeContext_1.default)((0, initializeContext_2.loadWalletFromEnv)()).then(function (context) {
    // console.log(context);
    (0, placeOrder_1.default)(context, marketAddress, side, price, size).then(function (res) {
        console.log(res);
    });
});
