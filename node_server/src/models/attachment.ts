import mongoose from "mongoose";
import IAttachment from "../interfaces/attachment";

const attachmentSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Attachment = mongoose.model<IAttachment>(
  "Attachment",
  attachmentSchema
);
