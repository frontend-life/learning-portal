import mongoose from "mongoose";
import ILesson from "../interfaces/lesson";
import { Course } from "./course";

const lessonSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Course,
    },
  },
  { timestamps: true }
);

export const Lesson = mongoose.model<ILesson>("Lesson", lessonSchema);
