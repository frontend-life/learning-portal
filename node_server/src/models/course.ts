import { Lesson } from "./lesson";
import { CourseCommon } from "../../../shared/commonParts";
import mongoose from "mongoose";

export interface ICourse extends CourseCommon {}

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    lessonsOrder: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: () => Lesson,
        },
      ],
      require: false,
      default: [],
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);
