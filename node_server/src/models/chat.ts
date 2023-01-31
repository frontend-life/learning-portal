import { ChatCommon } from "@commonTypes";
import { User } from "./user";
import mongoose from "mongoose";
import { Message } from "./message";

export interface IChat extends ChatCommon {
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
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: () => Message }],
      required: false,
      default: [],
    },
    participants: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: () => User }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
