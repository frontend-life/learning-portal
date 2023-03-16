import mongoose from "mongoose";

export interface TUser {
    id: number;
    first_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
}

const telegramUserSchema = new mongoose.Schema(
    {
        id: {
            type: Number
        },
        first_name: {
            type: String
        },
        username: {
            type: String
        },
        photo_url: {
            type: String
        },
        auth_date: {
            type: Number
        },
        hash: {
            type: String
        }
    }
)

telegramUserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    return userObject;
}

export const telegramUser = mongoose.model<TUser>("TelegramUser", telegramUserSchema);