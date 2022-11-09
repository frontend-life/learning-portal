import mongoose, { Document } from 'mongoose';

export default interface IUser extends Document {
    id: mongoose.Schema.Types.ObjectId,
    name: string;
    email: string;
    password: string;
}