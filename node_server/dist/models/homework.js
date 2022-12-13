"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homework = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//  The same as homeworkSchema
const answerSchema = new mongoose_1.default.Schema({
    content: {
        text: {
            type: String,
        },
        attachments: [
            { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Attachment" },
        ],
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    },
    lessonId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    },
    answer: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: false,
    },
}, { timestamps: true });
const homeworkSchema = new mongoose_1.default.Schema({
    content: {
        text: {
            type: String,
        },
        attachments: [
            { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Attachment" },
        ],
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    },
    lessonId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    },
    answer: {
        type: answerSchema,
        required: false,
    },
}, { timestamps: true });
exports.Homework = mongoose_1.default.model("Homework", homeworkSchema);
