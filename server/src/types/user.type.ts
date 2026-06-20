import { Document, Model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    fullName?: string;

    avatar?: {
        secure_url?: string;
        public_id?: string;
    };

    bio?: string;
    isVerified: boolean;
    lastActive?: Date;

    refreshToken?: string;
    verificationToken?: string;
    verificationOTP?: string;
    OTPGeneratedAt?: Date;
}


export interface IUserMethods {

    isCorrectPassword(
        password: string
    ): Promise<boolean>;

    generateAccessToken(): string;

    generateRefreshToken(): string;

    toSafeObject(): object;

    updateLastActive(): Promise<void>;
}


export interface UserModel
    extends Model<IUser, {}, IUserMethods> { }



type RegisterUserType = {
    username: string
    email: string
    password: string
    fullName: string
    avatar?: string
}

type LoginUserType = {
    email: string
    password: string
}

export {
    RegisterUserType,
    LoginUserType
}