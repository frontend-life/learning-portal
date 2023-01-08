import { CourseCommon } from "@commonTypes";
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
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
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model<CourseCommon>("Course", courseSchema);
