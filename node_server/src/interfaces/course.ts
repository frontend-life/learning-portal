import mongoose, { Document } from "mongoose";

export default interface ICourse extends Document {
  id: mongoose.Schema.Types.ObjectId;
  title: string;
  creator: mongoose.Schema.Types.ObjectId;
}
