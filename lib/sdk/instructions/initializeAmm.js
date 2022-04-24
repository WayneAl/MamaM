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
var anchor = __importStar(require("@project-serum/anchor"));
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("../constants");
var token_instructions_1 = require("@project-serum/serum/lib/token-instructions");
var spl_token_1 = require("@solana/spl-token");
var initializeMarket_1 = require("./initializeMarket");
// Data lengths for different accounts on the market
var ACCOUNT_LAYOUT_DATA_LENGTH = spl_token_1.AccountLayout.span;
function initializeAmm(context, marketAddress, length, time_granularity, range) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _a, exchange, configString, _b, amm, bump, vault1, vault2, minimumRentBalances, vaultSignerNonce;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from("MamaM")], context.program.programId)];
                case 1:
                    _a = __read.apply(void 0, [_c.sent(), 1]), exchange = _a[0];
                    configString = length.toString() + time_granularity.toString() + range.toString();
                    return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([
                            Buffer.from("Amm"),
                            marketAddress.toBuffer(),
                            Buffer.from(configString),
                        ], context.program.programId)];
                case 2:
                    _b = __read.apply(void 0, [_c.sent(), 2]), amm = _b[0], bump = _b[1];
                    vault1 = anchor.web3.Keypair.generate();
                    vault2 = anchor.web3.Keypair.generate();
                    return [4 /*yield*/, (0, initializeMarket_1.getMinimumRentBalances)(context)];
                case 3:
                    minimumRentBalances = _c.sent();
                    return [4 /*yield*/, (0, initializeMarket_1.deriveVaultNonce)(marketAddress, constants_1.SERUM_DEX_PROGRAM_ID)];
                case 4:
                    vaultSignerNonce = _c.sent();
                    return [4 /*yield*/, initializeAccountsWithLayouts(context, minimumRentBalances, vault1, vault2, constants_1.BTC, constants_1.USDC, vaultSignerNonce[0])];
                case 5:
                    _c.sent();
                    // Add your test here.
                    context.program.rpc.initializeAmm(bump, new anchor.BN(length), new anchor.BN(time_granularity), new anchor.BN(range), {
                        accounts: {
                            exchange: exchange,
                            amm: amm,
                            vault1: vault1.publicKey,
                            vault2: vault2.publicKey,
                            market: marketAddress,
                            oracle1: constants_1.BTC_ORACLE,
                            oracle2: constants_1.USDC_ORACLE,
                            payer: context.provider.wallet.publicKey,
                            systemProgram: web3_js_1.SystemProgram.programId,
                            rent: web3_js_1.SYSVAR_RENT_PUBKEY
                        }
                    }).then(function (res) {
                        console.log("amm: ", amm.toString());
                        resolve(res);
                    }).catch(function (err) { return reject(err); });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.default = initializeAmm;
function initializeAccountsWithLayouts(context, rentBalances, vault1, vault2, mint1, mint2, vaultOwner) {
    return new Promise(function (resolve, reject) {
        // Create the market account with the appropriate layouts
        var marketTransaction = new web3_js_1.Transaction();
        marketTransaction.add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: vault1.publicKey,
            lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
            space: ACCOUNT_LAYOUT_DATA_LENGTH,
            programId: token_instructions_1.TOKEN_PROGRAM_ID
        }), web3_js_1.SystemProgram.createAccount({
            fromPubkey: context.provider.wallet.publicKey,
            newAccountPubkey: vault2.publicKey,
            lamports: rentBalances[ACCOUNT_LAYOUT_DATA_LENGTH],
            space: ACCOUNT_LAYOUT_DATA_LENGTH,
            programId: token_instructions_1.TOKEN_PROGRAM_ID
        }), (0, token_instructions_1.initializeAccount)({
            account: vault1.publicKey,
            mint: mint1,
            owner: vaultOwner,
        }), (0, token_instructions_1.initializeAccount)({
            account: vault2.publicKey,
            mint: mint2,
            owner: vaultOwner,
        }));
        context.provider.send(marketTransaction, [
            vault1,
            vault2,
        ]).then(function (res) {
            console.log(res);
            resolve();
        }).catch(function (err) { return reject(err); });
    });
}
