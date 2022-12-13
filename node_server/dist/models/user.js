"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password should not be password");
            }
        },
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: Number,
        default: 0,
    },
    lessonsDone: { type: [mongoose_1.default.Schema.Types.ObjectId] },
    lessonsOpen: { type: [mongoose_1.default.Schema.Types.ObjectId] },
    roles: {
        type: [Number],
    },
}, { timestamps: true });
// userSchema.virtual("lessons", {
//   ref: "Lesson",
//   localField: "_id",
//   foreignField: "owner",
// });
// It will run even we don't call this
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};
exports.User = mongoose_1.default.model("User", userSchema);
