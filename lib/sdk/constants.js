"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMM = exports.MARKET = exports.USDC = exports.BTC = exports.USDC_ORACLE = exports.BTC_ORACLE = exports.SERUM_DEX_PROGRAM_ID = exports.ProgramID = exports.PC_DUST_THRESHOLD = exports.PC_LOT_SIZE = exports.COIN_LOT_SIZE = exports.SolanaEndpoint = void 0;
var web3_js_1 = require("@solana/web3.js");
var SolanaEndpoint;
(function (SolanaEndpoint) {
    SolanaEndpoint["Mainnet"] = "https://api.mainnet-beta.solana.com";
    SolanaEndpoint["Devnet"] = "https://api.devnet.solana.com";
    SolanaEndpoint["Testnet"] = "https://api.testnet.solana.com";
})(SolanaEndpoint = exports.SolanaEndpoint || (exports.SolanaEndpoint = {}));
// Serum market constants
exports.COIN_LOT_SIZE = 1;
exports.PC_LOT_SIZE = 1;
exports.PC_DUST_THRESHOLD = 2;
exports.ProgramID = new web3_js_1.PublicKey("3HGwuAEzU8vtqZasvKsYWF34cdw7j4y3AbtWJo1BrN19");
exports.SERUM_DEX_PROGRAM_ID = new web3_js_1.PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY");
exports.BTC_ORACLE = new web3_js_1.PublicKey("HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J");
exports.USDC_ORACLE = new web3_js_1.PublicKey("5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7");
// Temp Path
// Decimals 9
exports.BTC = new web3_js_1.PublicKey("8Kq8uW5HQ7Ge2zhyYns9k1yMNaHy6tfWfFJPjhqxgTVE");
exports.USDC = new web3_js_1.PublicKey("GTc2YHEFLW7ZgGxBtSCMMGXK9RDJHA6q5YWPdSjU9fsM");
exports.MARKET = new web3_js_1.PublicKey("qpWyTi2Z8nNA2gDuowYYVKprEqhvT5P9fe9o6mmgHwB");
exports.AMM = new web3_js_1.PublicKey("2JF2aU8qjebLCYU4cANewdNffGKctmyygFa7fMQnbBaH");
