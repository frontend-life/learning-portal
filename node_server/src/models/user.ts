import { Lesson } from "./lesson";
import mongoose from "mongoose";
import validator from "validator";
import IUser from "../interfaces/user";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value: string) {
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
    lessonsDone: { type: [mongoose.Schema.Types.ObjectId], ref: Lesson },
    lessonsOpen: { type: [mongoose.Schema.Types.ObjectId], ref: Lesson },
    roles: {
      type: [Number],
    },
    telegramChatId: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

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

export const User = mongoose.model<IUser>("User", userSchema);
