"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var initializeContext_1 = __importDefault(require("../initializeContext"));
var initializeContext_2 = require("../initializeContext");
var initializeAmm_1 = __importDefault(require("../instructions/initializeAmm"));
var length = 21;
var time_granularity = 30;
var range = 0.001 * (Math.pow(10, 6));
(0, initializeContext_1.default)((0, initializeContext_2.loadWalletFromEnv)()).then(function (context) {
    // console.log(context);
    (0, initializeAmm_1.default)(context, constants_1.MARKET, length, time_granularity, range).then(function (res) {
        console.log(res);
    });
});
