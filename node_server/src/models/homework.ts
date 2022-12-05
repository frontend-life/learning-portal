import mongoose from "mongoose";
import IHomework from "../interfaces/homework";

//  The same as homeworkSchema
const answerSchema = new mongoose.Schema(
  {
    content: {
      text: {
        type: String,
      },
      attachments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Attachment" },
      ],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    answer: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true }
);

const homeworkSchema = new mongoose.Schema(
  {
    content: {
      text: {
        type: String,
      },
      attachments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Attachment" },
      ],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    answer: {
      type: answerSchema,
      required: false,
    },
  },
  { timestamps: true }
);

export const Homework = mongoose.model<IHomework>("Homework", homeworkSchema);
