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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveVaultNonce = exports.getMinimumRentBalances = void 0;
var anchor = __importStar(require("@project-serum/anchor"));
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("../constants");
var spl_token_1 = require("@solana/spl-token");
var serum_1 = require("@project-serum/serum");
var token_instructions_1 = require("@project-serum/serum/lib/token-instructions");
// Data lengths for different accounts on the market
var REQUEST_QUEUE_DATA_LENGTH = 5132;
var EVENT_QUEUE_DATA_LENGTH = 262156;
var BIDS_DATA_LENGTH = 65548;
var ASKS_DATA_LENGTH = 65548;
var MARKET_DATA_LENGTH = serum_1.MARKET_STATE_LAYOUT_V3.span;
var ACCOUNT_LAYOUT_DATA_LENGTH = spl_token_1.AccountLayout.span;
var MINT_DATA_LENGTH = spl_token_1.MintLayout.span;
/**
 * Helper function to do the requests to get the different balance exemptions for the different
 * data length constants at runtime
 */
function getMinimumRentBalances(context) {
    return new Promise(function (resolve, reject) {
        var exemptionBalances = {};
        Promise.all([
            REQUEST_QUEUE_DATA_LENGTH,
            EVENT_QUEUE_DATA_LENGTH,
            BIDS_DATA_LENGTH,
            ASKS_DATA_LENGTH,
            MARKET_DATA_LENGTH,
            MINT_DATA_LENGTH,
            ACCOUNT_LAYOUT_DATA_LENGTH
        ].map(function (size) { return new Promise(function (resolve, reject) {
            try {
                context.connection.getMinimumBalanceForRentExemption(size)
                    .then(function (res) {
                    exemptionBalances[size] = res;
                    resolve(res);
                })
                    .catch(function (err) {
                    console.error(err);
                    reject(err);
                });
            }
            catch (e) {
                console.error(e);
                reject(e);
            }
        }); })).then(function () {
            resolve(exemptionBalances);
        }).catch(function (err) { return reject(err); });
    });
}
exports.getMinimumRentBalances = getMinimumRentBalances;
function initializeAccountsWithLayouts1(context, rentBalances, marketAccount, coinVaultAccount, pcVaultAccount, pcMintAccount, coinMintAccount, vaultOwner) {
    return new Promise(function (resolve, reject) {
        // Create the market account with the appropriate layouts
        var marketTransaction = new web3_js_1.Transaction();
        marketTransaction.add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: marketAccount.publicKey,
            space: MARKET_DATA_LENGTH,
            lamports: rentBalances[MARKET_DATA_LENGTH],
            programId: constants_1.SERUM_DEX_PROGRAM_ID
        }), web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: coinVaultAccount.publicKey,
            lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
            space: ACCOUNT_LAYOUT_DATA_LENGTH,
            programId: spl_token_1.TOKEN_PROGRAM_ID
        }), web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: pcVaultAccount.publicKey,
            lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
            space: ACCOUNT_LAYOUT_DATA_LENGTH,
            programId: spl_token_1.TOKEN_PROGRAM_ID
        }), (0, token_instructions_1.initializeAccount)({
            account: coinVaultAccount.publicKey,
            mint: coinMintAccount,
            owner: vaultOwner,
        }), (0, token_instructions_1.initializeAccount)({
            account: pcVaultAccount.publicKey,
            mint: pcMintAccount,
            owner: vaultOwner,
        }));
        context.provider.send(marketTransaction, [
            coinVaultAccount,
            pcVaultAccount,
            marketAccount,
        ]).then(function (res) {
            console.log(res);
            resolve();
        }).catch(function (err) { return reject(err); });
    });
}
function initializeAccountsWithLayouts2(context, rentBalances, requestQueueAccount, eventQueueAccount, asksAccount, bidsAccount) {
    return new Promise(function (resolve, reject) {
        // Create the market account with the appropriate layouts
        var marketTransaction = new web3_js_1.Transaction();
        marketTransaction.add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: requestQueueAccount.publicKey,
            space: REQUEST_QUEUE_DATA_LENGTH,
            lamports: rentBalances[REQUEST_QUEUE_DATA_LENGTH],
            programId: constants_1.SERUM_DEX_PROGRAM_ID
        }), web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: eventQueueAccount.publicKey,
            space: EVENT_QUEUE_DATA_LENGTH,
            lamports: rentBalances[EVENT_QUEUE_DATA_LENGTH],
            programId: constants_1.SERUM_DEX_PROGRAM_ID
        }), web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: bidsAccount.publicKey,
            space: BIDS_DATA_LENGTH,
            lamports: rentBalances[BIDS_DATA_LENGTH],
            programId: constants_1.SERUM_DEX_PROGRAM_ID,
        }), web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: asksAccount.publicKey,
            space: ASKS_DATA_LENGTH,
            lamports: rentBalances[ASKS_DATA_LENGTH],
            programId: constants_1.SERUM_DEX_PROGRAM_ID
        }));
        context.provider.send(marketTransaction, [
            requestQueueAccount,
            eventQueueAccount,
            asksAccount,
            bidsAccount,
        ]).then(function (res) {
            console.log(res);
            resolve();
        }).catch(function (err) { return reject(err); });
    });
}
function deriveVaultNonce(marketKey, dexProgramId, nonceS) {
    if (nonceS === void 0) { nonceS = 0; }
    return new Promise(function (resolve, reject) {
        var nonce = new anchor.BN(nonceS);
        if (nonceS > 255) {
            reject(new Error("Unable to find nonce"));
        }
        var tryNext = function () {
            deriveVaultNonce(marketKey, dexProgramId, nonceS + 1)
                .then(function (res) { return resolve(res); })
                .catch(function (err) { return reject(err); });
        };
        try {
            web3_js_1.PublicKey.createProgramAddress([marketKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 8)], dexProgramId).then(function (vaultOwner) {
                // console.log("Returning vault ", vaultOwner, nonce);
                resolve([vaultOwner, nonce]);
            }).catch(function (err) {
                tryNext();
            });
        }
        catch (e) {
            tryNext();
        }
    });
}
exports.deriveVaultNonce = deriveVaultNonce;
function initializeMarket(context) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _a, exchange, bump, marketAccount, pcVaultAccount, coinVaultAccount, bidsAccount, asksAccount, requestQueueAccount, eventQueueAccount, vaultSignerNonce, minimumRentBalances, _b, authorityAddress;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from("MamaM")], context.program.programId)
                    // Create the new accounts necessary for the serum market
                ];
                case 1:
                    _a = __read.apply(void 0, [_c.sent()
                        // Create the new accounts necessary for the serum market
                        , 2]), exchange = _a[0], bump = _a[1];
                    marketAccount = anchor.web3.Keypair.generate();
                    pcVaultAccount = anchor.web3.Keypair.generate();
                    coinVaultAccount = anchor.web3.Keypair.generate();
                    bidsAccount = anchor.web3.Keypair.generate();
                    asksAccount = anchor.web3.Keypair.generate();
                    requestQueueAccount = anchor.web3.Keypair.generate();
                    eventQueueAccount = anchor.web3.Keypair.generate();
                    return [4 /*yield*/, deriveVaultNonce(marketAccount.publicKey, constants_1.SERUM_DEX_PROGRAM_ID)];
                case 2:
                    vaultSignerNonce = _c.sent();
                    return [4 /*yield*/, getMinimumRentBalances(context)];
                case 3:
                    minimumRentBalances = _c.sent();
                    return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from("serum_market_auth"), exchange.toBuffer()], context.program.programId)];
                case 4:
                    _b = __read.apply(void 0, [_c.sent(), 1]), authorityAddress = _b[0];
                    return [4 /*yield*/, initializeAccountsWithLayouts1(context, minimumRentBalances, marketAccount, coinVaultAccount, pcVaultAccount, constants_1.USDC, constants_1.BTC, vaultSignerNonce[0])];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, initializeAccountsWithLayouts2(context, minimumRentBalances, requestQueueAccount, eventQueueAccount, asksAccount, bidsAccount)];
                case 6:
                    _c.sent();
                    // console.log("exchange", exchange.toString());
                    // console.log("marketAccount.publicKey", marketAccount.publicKey.toString());
                    // console.log("BTC", BTC.toString());
                    // console.log("USDC", USDC.toString());
                    // console.log("coinVaultAccount.publicKey", coinVaultAccount.publicKey.toString());
                    // console.log("pcVaultAccount.publicKey", pcVaultAccount.publicKey.toString());
                    // console.log("bidsAccount.publicKey", bidsAccount.publicKey.toString());
                    // console.log("asksAccount.publicKey", asksAccount.publicKey.toString());
                    // console.log("requestQueueAccount.publicKey", requestQueueAccount.publicKey.toString());
                    // console.log("eventQueueAccount.publicKey", eventQueueAccount.publicKey.toString());
                    // console.log("authorityAddress", authorityAddress.toString());
                    // Add your test here.
                    context.program.rpc.initializeMarket(vaultSignerNonce[1], {
                        accounts: {
                            exchange: exchange,
                            market: marketAccount.publicKey,
                            coinMintPk: constants_1.BTC,
                            pcMintPk: constants_1.USDC,
                            coinVaultPk: coinVaultAccount.publicKey,
                            pcVaultPk: pcVaultAccount.publicKey,
                            bidsPk: bidsAccount.publicKey,
                            asksPk: asksAccount.publicKey,
                            reqQPk: requestQueueAccount.publicKey,
                            eventQPk: eventQueueAccount.publicKey,
                            serumMarketAuthority: authorityAddress,
                            systemProgram: web3_js_1.SystemProgram.programId,
                            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
                            serumDexProgram: constants_1.SERUM_DEX_PROGRAM_ID,
                        },
                    }).then(function (res) {
                        console.log("market: ", marketAccount.publicKey.toString());
                        resolve(res);
                    }).catch(function (err) { return reject(err); });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.default = initializeMarket;
