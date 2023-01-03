import mongoose from "mongoose";
import { Message } from "./message";

export interface IChat {
  _id: string;
  messages: Array<string>;
  createdAt: string;
}

const chatSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    messages: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: Message }],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
