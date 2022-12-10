"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    homework: {
        type: String,
        required: false,
        trim: true,
    },
    link: {
        type: String,
        required: true,
        trim: true,
    },
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
}, { timestamps: true });
exports.Lesson = mongoose_1.default.model("Lesson", lessonSchema);
