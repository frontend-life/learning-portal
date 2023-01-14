import { AttachmentCommon } from "@commonTypes";
import { User } from "./user";
import mongoose from "mongoose";

interface IAttachment extends AttachmentCommon {}

const attachmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: () => User,
      require: false,
    },
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
