"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attachmentSchema = new mongoose_1.default.Schema({
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    path: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Attachment = mongoose_1.default.model("Attachment", attachmentSchema);
