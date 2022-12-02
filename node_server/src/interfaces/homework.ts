import mongoose, { Document } from "mongoose";

export default interface IHomework extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  content: {
    text: string;
    attachments?: mongoose.Schema.Types.ObjectId[];
  };
  studentId: mongoose.Schema.Types.ObjectId;
  lessonId: mongoose.Schema.Types.ObjectId;
}
