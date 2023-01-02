import mongoose, { Document } from "mongoose";
import { HomeworkCommon } from "../../../shared/commonParts";
import { Chat } from "./chat";
import { Lesson } from "./lesson";
import { User } from "./user";

export default interface IHomework extends HomeworkCommon {
  teacherId?: string;
}

const homeworkSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Lesson,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: User,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: Chat,
    },
    approved: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Homework = mongoose.model<IHomework>("Homework", homeworkSchema);
