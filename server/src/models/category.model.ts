import mongoose, { Schema } from "mongoose";
import {
    ICategory,
    ICategoryMethods,
    CategoryModel
} from "../types/category.type.ts";

const categorySchema = new Schema<ICategory, CategoryModel, ICategoryMethods>({

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


/**
 * @description Schema method to update the position of the category.
 * @param position
 */
categorySchema.methods.updatePosition =
    async function (position: number) {

        this.position = position

        await this.save({
            validateBeforeSave: false
        })

    }


export const Category =
    mongoose.model<ICategory, CategoryModel>("Category", categorySchema)