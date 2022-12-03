import { Roles } from "./../service/roles";
import mongoose, { Document } from "mongoose";

export default interface IUser extends Document {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  salary: number;
  lessonsDone: string[];
  lessonsOpen: string[];
  roles: Roles[];
}
