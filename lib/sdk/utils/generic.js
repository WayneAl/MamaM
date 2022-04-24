"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.isWalletProvider = exports.readJsonFile = void 0;
var fs_1 = __importDefault(require("fs"));
/**
 * Small helper function to read a JSON file as a type from a filepath
 *
 * @param filePath The path to read the data from
 */
function readJsonFile(filePath) {
    var strData = fs_1.default.readFileSync(filePath);
    return JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
}
exports.readJsonFile = readJsonFile;
function isWalletProvider(object) {
    return Object.prototype.hasOwnProperty.call(object, "name")
        && Object.prototype.hasOwnProperty.call(object, "url");
}
exports.isWalletProvider = isWalletProvider;
/**
 * Small helper function to wait for `time` milliseconds - useful because often the on chain data needs to be validated before it's available
 *
 * @param time Amount of time to sleep for, in milliseconds
 */
function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
exports.sleep = sleep;
