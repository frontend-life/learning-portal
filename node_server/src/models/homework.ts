import mongoose, { Document } from "mongoose";
import { Chat } from "./chat";
import { Lesson } from "./lesson";
import { User } from "./user";

export default interface IHomework {
  _id: mongoose.Schema.Types.ObjectId;
  studentId: string;
  lessonId: string;
  teacherId?: string;
  chatId?: string;
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
  },
  { timestamps: true }
);

export const Homework = mongoose.model<IHomework>("Homework", homeworkSchema);
