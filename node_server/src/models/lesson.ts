import { LessonCommon } from "@commonTypes";
import { Attachment } from "./attachment";
import mongoose from "mongoose";
import { Course } from "./course";

interface ILesson extends LessonCommon {}

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
      required: false,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Course,
    },
    homeworkAttachments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: Attachment,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Lesson = mongoose.model<ILesson>("Lesson", lessonSchema);
