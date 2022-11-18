import mongoose, { Document } from "mongoose";

export default interface ILesson extends Document {
  id: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  homework: string;
  link: string;
}
