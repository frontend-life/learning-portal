"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.T_METHODS = exports.telegram = void 0;
const axios_1 = __importDefault(require("axios"));
exports.telegram = axios_1.default.create({
    baseURL: "https://api.telegram.org/bot5965431146:AAGXWWL1YH48beGVX28fcL-OXEUFLv_qgfQ/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
exports.T_METHODS = {
    SEND_MESSAGE: "sendMessage",
};
