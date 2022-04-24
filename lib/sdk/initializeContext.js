"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWalletFromEnv = void 0;
var anchor = __importStar(require("@project-serum/anchor"));
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("./constants");
var generic_1 = require("./utils/generic");
var mamam_json_1 = __importDefault(require("../target/idl/mamam.json"));
function loadWalletFromEnv() {
    var wallet = process.env["WALLET"];
    var keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array((0, generic_1.readJsonFile)(wallet)));
    return new anchor.Wallet(keypair);
}
exports.loadWalletFromEnv = loadWalletFromEnv;
function initializeContext(wallet, endpoint) {
    if (endpoint === void 0) { endpoint = constants_1.SolanaEndpoint.Devnet; }
    return new Promise(function (resolve, reject) {
        var connection = new web3_js_1.Connection(endpoint);
        var provider = new anchor.Provider(connection, wallet, anchor.Provider.defaultOptions());
        var program = new anchor.Program(mamam_json_1.default, constants_1.ProgramID, provider);
        resolve({
            program: program,
            provider: provider,
            endpoint: endpoint,
            connection: connection,
        });
    });
}
exports.default = initializeContext;
