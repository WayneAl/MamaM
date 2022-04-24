"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WalletType;
(function (WalletType) {
    WalletType[WalletType["Phantom"] = 0] = "Phantom";
    WalletType[WalletType["Solong"] = 1] = "Solong";
    WalletType[WalletType["Math"] = 2] = "Math";
    WalletType[WalletType["Slope"] = 3] = "Slope";
    WalletType[WalletType["Solflare"] = 4] = "Solflare";
    WalletType[WalletType["Keypair"] = 5] = "Keypair";
    WalletType[WalletType["Unknown"] = 6] = "Unknown";
})(WalletType || (WalletType = {}));
exports.default = WalletType;
