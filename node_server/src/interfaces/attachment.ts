import mongoose, { Document } from "mongoose";

export default interface IAttachment extends Document {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
  path: string;
}
