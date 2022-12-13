"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.mongodb_cluster_user}:${process.env.mongodb_cluster_password}@cluster0.c5musei.mongodb.net/?retryWrites=true&w=majority`
    : "mongodb://localhost:27017/frontend-portal";
mongoose_1.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
