import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/user';

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value: string){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value: string){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password should not be password');
            }
        }
    }
}, {timestamps: true});

userSchema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'owner'
});

// It will run even we don't call this
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

export const User = mongoose.model<IUser>('User', userSchema);