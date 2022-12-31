import mongoose from "mongoose";
import { Attachment } from "./attachment";

export interface IMessage {
  chatId: string;
  senderId: string;
  text: string;
  attachments: Array<string>;
  createdAt: string;
}

const messageSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    chatId: {
      type: String,
      required: true,
      trim: true,
    },
    senderId: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: Attachment,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
