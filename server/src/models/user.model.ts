import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../config/env.config.ts"

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        trim: true
    },
    avatar: {
        secure_url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    bio: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastActive: {
        type: Date
    },
    refreshToken: {
        type: String
    },
    verificationToken: {
        type: String
    },
    verificationOTP: {
        type: String
    }


}, { timestamps: true })


/**
 * @description Hashes Password before save (if password modified)
 */

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)

})


/**
 * @description Schema method for checking if password is correct or not.
 * @param password 
 * @returns 
 */
userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}


/**
 * @description Schema method for generating access token.
 * @returns token
 */
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        env.JWT_ACCESS_SECRET,
        { expiresIn: env.EXPIRES_IN_ACCESS_TOKEN as any }
    )
}

/**
 * @description Schema method for generating refresh token.
 * @returns token
 */
userSchema.methods.generateRefreshToken = function (): any {
    return jwt.sign(
        {
            _id: this._id,

        },
        env.JWT_REFRESH_SECRET,
        { expiresIn: env.EXPIRES_IN_REFRESH_TOKEN as any }
    )
}

/**
 * @description Schema method to c.
 * @returns object
 */
userSchema.methods.toSafeObject = function (): any {
    const user = this.toObject()

    delete user.password
    delete user.refreshToken
    delete user.verificationToken
    delete user.verificationOTP

    return user;
}

/**
 * @description Schema method to update last active time to current time
 */
userSchema.methods.updateLastActive = async function () {
    this.lastActive = new Date()
    await this.save({
        validateBeforeSave: false
    })
}

export const User = mongoose.model("User", userSchema);