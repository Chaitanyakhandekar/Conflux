import mongoose, { Schema } from "mongoose";

const serverSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true })


serverSchema.methods.isOwner = function (userId: string): boolean {
    return this.ownerId.toString() === userId
}


export const Server =
    mongoose.model("Server", serverSchema)