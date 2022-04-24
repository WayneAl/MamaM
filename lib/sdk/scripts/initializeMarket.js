"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var initializeContext_1 = __importDefault(require("../initializeContext"));
var initializeContext_2 = require("../initializeContext");
var initializeMarket_1 = __importDefault(require("../instructions/initializeMarket"));
(0, initializeContext_1.default)((0, initializeContext_2.loadWalletFromEnv)()).then(function (context) {
    // console.log(context);
    (0, initializeMarket_1.default)(context).then(function (res) {
        console.log(res);
    });
});
