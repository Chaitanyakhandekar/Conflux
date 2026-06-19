import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({

    name: {
        type: String,
        required: true
    },

    position: {
        type: Number,
        default: 0
    },

    serverId: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })


categorySchema.methods.updatePosition =
    async function (position: number) {

        this.position = position

        await this.save({
            validateBeforeSave: false
        })

    }


export const Category =
    mongoose.model("Category", categorySchema)