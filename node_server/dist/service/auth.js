"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAuthToken = exports.generateAuthToken = exports.comparePasswords = exports.generatePassword = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
function generatePassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const hash = (yield scrypt(password, salt, 32));
        const mixedPassword = salt + '.' + hash.toString('hex');
        return mixedPassword;
    });
}
exports.generatePassword = generatePassword;
function comparePasswords(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const [salt, storedHash] = hashedPassword.split('.');
        const hash = (yield scrypt(password, salt, 32));
        return storedHash === hash.toString('hex');
    });
}
exports.comparePasswords = comparePasswords;
function generateAuthToken(userId) {
    const token = jsonwebtoken_1.default.sign({ _id: userId }, 'thisIsSecretForToken');
    return token;
}
exports.generateAuthToken = generateAuthToken;
function decodeAuthToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, 'thisIsSecretForToken');
    return decoded._id;
}
exports.decodeAuthToken = decodeAuthToken;
