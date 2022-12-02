import mongoose from "mongoose";
import IHomework from "../interfaces/homework";

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
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const Homework = mongoose.model<IHomework>("Homework", homeworkSchema);
